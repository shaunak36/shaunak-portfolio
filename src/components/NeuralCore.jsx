import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './NeuralCore.css'
import useSceneVisibility from './useSceneVisibility'

function NeuralNetwork() {
  const groupRef = useRef()
  const coreRef = useRef()
  const particlesRef = useRef()
  const ringsRef = useRef()

  // Generate interconnected neural nodes

  const { brightNodes, dimNodes, connections } = useMemo(() => {
    const nodes = []
    const connections = []
    const count = 100
    const radius = 2.1
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i

      nodes.push(
        new THREE.Vector3(
          Math.cos(theta) * r * radius,
          y * radius,
          Math.sin(theta) * r * radius
        )
      )
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 0.95) {
          connections.push(
            ...nodes[i].toArray(),
            ...nodes[j].toArray()
          )
        }
      }
    }

    return {
      brightNodes: new Float32Array(nodes.filter((_, i) => i % 7 === 0).flatMap(n => n.toArray())),
      dimNodes: new Float32Array(nodes.filter((_, i) => i % 7 !== 0).flatMap(n => n.toArray())),
      connections: new Float32Array(connections),
    }
  }, [])

  const outerParticles = useMemo(() => new Float32Array(
    Array.from({ length: 35 }, (_, i) => [Math.cos(i * 2.399963) * 2.8, Math.sin(i * 1.7) * 2.5, Math.sin(i * 2.399963) * 2.8]).flat()
  ), [])

  // Continuous rotation and mouse interaction

  useFrame(({ clock, pointer }, delta) => {
    const time = clock.elapsedTime
    delta = Math.min(delta, 0.05)

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        pointer.y * 0.4,
        3,
        delta
      )

      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        pointer.x * 0.25,
        3,
        delta
      )
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.08
      coreRef.current.scale.setScalar(pulse)
      coreRef.current.rotation.y += delta * 0.4
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.x = time * 0.15
      ringsRef.current.rotation.z = time * 0.1
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.08
    }
  })

  return (
    <group>

      {/* Outer neural network */}

      <group ref={groupRef}>

        {[false, true].map(bright => (
          <points key={String(bright)}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[bright ? brightNodes : dimNodes, 3]} />
            </bufferGeometry>
            <pointsMaterial color={bright ? '#efffc9' : '#c7ff54'} size={bright ? 0.13 : 0.056} sizeAttenuation />
          </points>
        ))}

        {/* Neural connections */}

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[connections, 3]}
            />
          </bufferGeometry>

          <lineBasicMaterial
            color="#a4df42"
            transparent
            opacity={0.32}
          />
        </lineSegments>

      </group>


      {/* Central energy core */}

      <group ref={coreRef}>

        <mesh>
          <icosahedronGeometry args={[0.75, 2]} />

          <meshBasicMaterial
            color="#c7ff54"
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>

        <mesh>
          <icosahedronGeometry args={[0.48, 1]} />

          <meshStandardMaterial
            color="#293c10"
            emissive="#8bdc20"
            emissiveIntensity={1.4}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>

      </group>


      {/* Rotating orbital rings */}

      <group ref={ringsRef}>

        {[0, 1, 2].map(index => (
          <mesh
            key={index}
            rotation={[
              index * Math.PI / 3,
              index * Math.PI / 4,
              0
            ]}
          >
            <torusGeometry args={[2.45, 0.008, 8, 128]} />

            <meshBasicMaterial
              color="#c7ff54"
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}

      </group>


      {/* Floating outer particles */}

      <group ref={particlesRef}>

        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[outerParticles, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#c7ff54" size={0.036} transparent opacity={0.5} />
        </points>

      </group>

    </group>
  )
}


export default function NeuralCore() {
  const [stageRef, visible] = useSceneVisibility()
  return (
    <div className="neural-core">

      <div className="neural-top-label">
        <span className="neural-status-dot" />
        NEURAL SYSTEM ACTIVE
      </div>

      <div className="neural-canvas" ref={stageRef}>

        <Canvas
          dpr={[1, 1.5]}
          frameloop={visible ? 'always' : 'never'}
          camera={{
            position: [0, 0, 9],
            fov: 45,
          }}
          gl={{
            antialias: true,
            alpha: true,
          }}
        >

          <ambientLight intensity={0.6} />

          <pointLight
            position={[3, 3, 4]}
            color="#c7ff54"
            intensity={12}
          />

          <NeuralNetwork />

        </Canvas>

      </div>

      <div className="neural-bottom-label">
        <span>NEURAL CORE / 01</span>
        <span>INTERACTIVE SYSTEM</span>
      </div>

    </div>
  )
}
