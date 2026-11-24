
import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function Keycap({
  label,
  position = [0, 0, 0],
  width = 1.25,
  depth = 1.15,
  color = '#222328',
  textColor = '#ffffff',
  onHover,
  onClick,
}) {
  const keyRef = useRef()
  const press = useRef(0)
  const hoverRef = useRef(false)
  const [hovered, setHovered] = useState(false)

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()

    const w = width / 2
    const d = depth / 2
    const r = 0.18

    shape.moveTo(-w + r, -d)
    shape.lineTo(w - r, -d)
    shape.quadraticCurveTo(w, -d, w, -d + r)
    shape.lineTo(w, d - r)
    shape.quadraticCurveTo(w, d, w - r, d)
    shape.lineTo(-w + r, d)
    shape.quadraticCurveTo(-w, d, -w, d - r)
    shape.lineTo(-w, -d + r)
    shape.quadraticCurveTo(-w, -d, -w + r, -d)

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.065,
      bevelSegments: 8,
      steps: 8,
      curveSegments: 20,
    })

    const vertices = geo.attributes.position

    for (let i = 0; i < vertices.count; i++) {
      const z = vertices.getZ(i)
      const taper = 1 - Math.max(0, z) * 0.38

      vertices.setX(i, vertices.getX(i) * taper)
      vertices.setY(i, vertices.getY(i) * taper)
    }

    geo.computeVertexNormals()

    return geo
  }, [width, depth])

  useEffect(() => {
    return () => geometry.dispose()
  }, [geometry])

  useEffect(() => {
    return () => {
      if (hoverRef.current) {
        document.body.style.cursor = ''
      }
    }
  }, [])

  useFrame((_, delta) => {
    if (!keyRef.current) return

    press.current = Math.max(
      0,
      press.current - delta * 3.5
    )

    const target = press.current > 0
      ? -0.22
      : hovered
        ? -0.12
        : 0

    keyRef.current.position.y = THREE.MathUtils.damp(
      keyRef.current.position.y,
      target,
      22,
      delta
    )
  })

  return (
    <group position={position}>

      {/* Recessed switch housing */}

      <RoundedBox
        args={[width + 0.15, 0.2, depth + 0.15]}
        radius={0.08}
        smoothness={5}
        position={[0, -0.08, 0]}
      >
        <meshStandardMaterial
          color="#030304"
          roughness={0.95}
        />
      </RoundedBox>

      {/* Mechanical switch stem */}

      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color="#101010" />
      </mesh>

      {/* Moving keycap */}

      <group
        ref={keyRef}
        onPointerOver={(event) => {
          event.stopPropagation()

          if (!hoverRef.current) {
            hoverRef.current = true
            setHovered(true)
            document.body.style.cursor = 'pointer'

            // Play mechanical sound once on hover
            onHover?.()
          }
        }}
        onPointerOut={(event) => {
          // Ignore transitions between parts of this key
          const stillOverKey = event.intersections.some(
            ({ object }) => {
              let current = object

              while (current) {
                if (current === keyRef.current) return true
                current = current.parent
              }

              return false
            }
          )

          if (stillOverKey) return

          hoverRef.current = false
          setHovered(false)
          document.body.style.cursor = ''
        }}
        onPointerDown={(event) => {
          event.stopPropagation()
          press.current = 1
        }}
        onClick={(event) => {
          event.stopPropagation()
          onClick?.()
        }}
      >

        <mesh
          geometry={geometry}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.08, 0]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color={color}
            metalness={0.02}
            roughness={hovered ? 0.3 : 0.42}
            clearcoat={0.35}
            clearcoatRoughness={0.35}
            envMapIntensity={0.3}
          />
        </mesh>

        <Text
          position={[0, 0.635, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={width > 2 ? 0.23 : 0.18}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={width * 0.75}
        >
          {label}
        </Text>

      </group>

    </group>
  )
}
