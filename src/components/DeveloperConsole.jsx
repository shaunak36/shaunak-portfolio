import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  RoundedBox,
  Text,
  ContactShadows,
  Line,
  Environment,
  Lightformer,
} from '@react-three/drei'
import * as THREE from 'three'
import Keycap from './Keycap'
import useSceneVisibility from './useSceneVisibility'
import './DeveloperConsole.css'


/* RESPONSIVE CAMERA */

function CameraSetup() {
  const lastAspect = useRef('')
  useFrame(({ camera, size }) => {
    const aspect = size.width / size.height

    const compact = size.width <= 600
    const key = `${size.width}:${size.height}`
    if (lastAspect.current === key) return
    lastAspect.current = key
    camera.position.set(0, compact ? 14 : 12.6, compact ? 7.5 : 9.2)
    camera.zoom = compact ? Math.min(1.25, aspect * 0.86) : Math.min(1.67, aspect / 1.26)
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0.2, 0)
  })

  return null
}


/* RETRO CRT MONITOR */

function CRTMonitor({ powered }) {
  const scanRef = useRef()
  const signalRef = useRef()

  useFrame(({ clock }) => {
    if (scanRef.current) {
      scanRef.current.position.z =
        Math.sin(clock.elapsedTime * 0.8) * 0.8
    }

    if (signalRef.current) {
      signalRef.current.material.opacity =
        0.8 + Math.sin(clock.elapsedTime * 3) * 0.15
    }
  })

  return (
    <group position={[4.35, 0.45, 0]}>

      {/* Monitor mounting plate */}

      <RoundedBox
        args={[3.4, 0.38, 3.85]}
        radius={0.2}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#17181b"
          metalness={0.18}
          roughness={0.55}
          envMapIntensity={0.4}
        />
      </RoundedBox>

      {/* Thick circular bezel */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.28, 0]}
        castShadow
      >
        <torusGeometry args={[1.43, 0.19, 16, 64]} />

        <meshPhysicalMaterial
          color="#050506"
          metalness={0.2}
          roughness={0.32}
          envMapIntensity={0.45}
        />
      </mesh>

      {/* Inner screen */}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.29, 0]}
      >
        <circleGeometry args={[1.29, 100]} />

        <meshStandardMaterial
          color={powered ? '#102719' : '#050806'}
          emissive={powered ? '#174b25' : '#000000'}
          emissiveIntensity={powered ? 0.35 : 0}
          roughness={0.8}
        />
      </mesh>

      {powered && (
        <group position={[0, 0.305, 0]}>

          {/* CRT grid */}

          {Array.from({ length: 15 }, (_, i) => {
            const offset = -1.12 + i * 0.16

            const length = Math.sqrt(
              Math.max(0, 1.24 ** 2 - offset ** 2)
            )

            return (
              <group key={i}>

                <Line
                  points={[
                    [-length, 0, offset],
                    [length, 0, offset],
                  ]}
                  color="#345d35"
                  lineWidth={0.7}
                  transparent
                  opacity={0.45}
                />

                <Line
                  points={[
                    [offset, 0, -length],
                    [offset, 0, length],
                  ]}
                  color="#345d35"
                  lineWidth={0.7}
                  transparent
                  opacity={0.45}
                />

              </group>
            )
          })}

          {/* SP Monogram */}

          <Text
            position={[0, 0.015, -0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.95}
            color="#a5ff72"
            letterSpacing={-0.08}
          >
            SP
          </Text>

          <Text
            position={[0, 0.015, -0.85]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.115}
            color="#7fdc63"
          >
            NEURAL INTERFACE
          </Text>

          <Text
            position={[0, 0.015, 0.85]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.12}
            color="#a5ff72"
          >
            SYSTEM ONLINE
          </Text>

          {/* Animated scanning line */}

          <group ref={scanRef}>

            <mesh
              ref={signalRef}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.025, 0]}
            >
              <planeGeometry args={[1.8, 0.025]} />

              <meshBasicMaterial
                color="#b0ff78"
                transparent
                opacity={0.8}
                depthWrite={false}
              />
            </mesh>

          </group>

        </group>
      )}

      {/* Curved protective glass */}

      <mesh
        position={[0, 0.31, 0]}
        scale={[1, 0.1, 1]}
      >
        <sphereGeometry args={[1.28, 32, 16]} />

        <meshPhysicalMaterial
          color="#9cc9a2"
          transparent
          opacity={0.09}
          roughness={0.18}
          metalness={0.05}
          clearcoat={0.7}
          envMapIntensity={0.25}
          depthWrite={false}
        />
      </mesh>

      {/* Mounting screws */}

      {[
        [-1.43, -1.62],
        [1.43, -1.62],
        [-1.43, 1.62],
        [1.43, 1.62],
      ].map(([x, z], i) => (

        <group key={i} position={[x, 0.24, z]}>

          <mesh>
            <cylinderGeometry args={[0.11, 0.13, 0.09, 32]} />

            <meshStandardMaterial
              color="#777980"
              metalness={0.7}
              roughness={0.45}
            />
          </mesh>

          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.13, 0.012, 0.025]} />
            <meshStandardMaterial color="#111111" />
          </mesh>

        </group>

      ))}

    </group>
  )
}


/* MAIN CONSOLE */

function ConsoleModel() {
  const consoleRef = useRef()
  const [powered, setPowered] = useState(true)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const keys = [
    {
      label: 'HOME',
      position: [-4.9, 0.52, -1.05],
      color: '#17181c',
      action: () => window.scrollTo({
        top: 0,
        behavior: 'smooth',
      }),
    },
    {
      label: 'WORK',
      position: [-3.45, 0.52, -1.05],
      color: '#9bcf31',
      textColor: '#152009',
      action: () => scrollTo('work'),
    },
    {
      label: 'ABOUT',
      position: [-2, 0.52, -1.05],
      color: '#5598cf',
      textColor: '#102338',
      action: () => scrollTo('about'),
    },
    {
      label: 'GITHUB',
      position: [-4.9, 0.52, 0.35],
      color: '#292a30',
      action: () => window.open(
        'https://github.com/shaunak36',
        '_blank',
        'noopener,noreferrer'
      ),
    },
    {
      label: 'HIRE ME',
      position: [-3.45, 0.52, 0.35],
      color: '#c6a77b',
      textColor: '#342719',
      action: () => scrollTo('contact'),
    },
    {
      label: 'POWER',
      position: [-2, 0.52, 0.35],
      color: '#b72d58',
      action: () => setPowered(value => !value),
    },
    {
      label: 'CONTACT',
      position: [-4.18, 0.52, 1.75],
      width: 2.7,
      color: '#202126',
      action: () => scrollTo('contact'),
    },
    {
      label: 'EMAIL',
      position: [-2, 0.52, 1.75],
      color: '#4938b5',
      action: () => window.open(
        'https://mail.google.com/mail/?view=cm&fs=1&to=paulshaunak5%40gmail.com',
        '_blank',
        'noopener,noreferrer'
      ),
    },
  ]

  useFrame(({ pointer }, delta) => {
    if (!consoleRef.current) return

    consoleRef.current.rotation.x = THREE.MathUtils.damp(
      consoleRef.current.rotation.x,
      -pointer.y * 0.055,
      4,
      delta
    )

    consoleRef.current.rotation.z = THREE.MathUtils.damp(
      consoleRef.current.rotation.z,
      -pointer.x * 0.045,
      4,
      delta
    )
  })

  return (
    <group ref={consoleRef}>

      {/* Lower chassis */}

      <RoundedBox
        args={[12.9, 0.5, 5.3]}
        radius={0.23}
        smoothness={4}
        position={[0, -0.15, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#1c1e22"
          metalness={0.12}
          roughness={0.6}
          envMapIntensity={0.3}
        />
      </RoundedBox>

      {/* Main graphite body */}

      <RoundedBox
        args={[12.8, 0.65, 5.2]}
        radius={0.3}
        smoothness={4}
        position={[0, 0.1, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#34363c"
          metalness={0.12}
          roughness={0.48}
          clearcoat={0.15}
          envMapIntensity={0.35}
        />
      </RoundedBox>

      {/* Keyboard recess */}

      <RoundedBox
        args={[4.55, 0.15, 4.45]}
        radius={0.18}
        smoothness={4}
        position={[-3.45, 0.46, 0.2]}
      >
        <meshStandardMaterial
          color="#030304"
          roughness={0.95}
        />
      </RoundedBox>

      {/* Status indicator enclosure */}

      <RoundedBox
        args={[4.15, 0.15, 0.36]}
        radius={0.12}
        smoothness={3}
        position={[-3.45, 0.49, -2.13]}
      >
        <meshPhysicalMaterial
          color="#060906"
          roughness={0.4}
          clearcoat={0.3}
          envMapIntensity={0.2}
        />
      </RoundedBox>

      <Text
        position={[-3.55, 0.575, -2.13]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.14}
        color="#92de57"
      >
        AVAILABLE FOR WORK
      </Text>

      {/* Green LED */}

      <mesh position={[-1.65, 0.59, -2.13]}>
        <sphereGeometry args={[0.055, 16, 16]} />

        <meshStandardMaterial
          color="#a5ff72"
          emissive="#7aff35"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Mechanical keys */}

      {keys.map(key => (
        <Keycap
          key={key.label}
          label={key.label}
          position={key.position}
          width={key.width}
          color={key.color}
          textColor={key.textColor}
          onClick={key.action}
        />
      ))}

      {/* Ventilation grille backing */}

      <RoundedBox
        args={[4.25, 0.12, 3.95]}
        radius={0.12}
        smoothness={3}
        position={[0.85, 0.47, 0]}
      >
        <meshStandardMaterial
          color="#080809"
          roughness={0.9}
        />
      </RoundedBox>

      {/* Raised grille slats */}

      {Array.from({ length: 14 }, (_, i) => (

        <RoundedBox
          key={i}
          args={[4.1, 0.14, 0.11]}
          radius={0.04}
          smoothness={3}
          position={[0.85, 0.59, -1.8 + i * 0.275]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color="#3b3e43"
            roughness={0.45}
            metalness={0.15}
            envMapIntensity={0.35}
          />
        </RoundedBox>

      ))}

      {/* CRT display */}

      <CRTMonitor powered={powered} />

      {/* Hardware branding */}

      <Text
        position={[0.85, 0.46, 2.25]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.12}
        color="#777980"
      >
        SP SYSTEMS / MODEL 02
      </Text>

    </group>
  )
}


/* MAIN COMPONENT */

export default function DeveloperConsole() {
  const [stageRef, visible] = useSceneVisibility()
  return (
    <section className="developer-console">

      <div className="console-heading">

        <p className="eyebrow">
          INTERACTIVE EXPERIENCE / 2026
        </p>

        <h2>
          System online<span>.</span>
        </h2>

        <p className="console-description">
          A digital interface with a physical feel.
          Press any key to explore.
        </p>

      </div>

      <div className="console-stage" ref={stageRef}>

        <Canvas
          shadows
          dpr={1}
          frameloop={visible ? 'always' : 'never'}
          camera={{
            position: [0, 12.6, 9.2],
            fov: 43,
            near: 0.1,
            far: 100,
          }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.12,
          }}
        >

          <CameraSetup />

          {/* Controlled studio lighting */}

          <ambientLight intensity={0.65} />

          <directionalLight
            position={[-5, 8, 5]}
            intensity={2.3}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-left={-9}
            shadow-camera-right={9}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-normalBias={0.02}
          />

          <directionalLight
            position={[6, 4, -3]}
            intensity={1.0}
            color="#b3c8e5"
          />

          <pointLight
            position={[0, 2, -4]}
            color="#71ff76"
            intensity={8}
          />

          {/* Custom reflection environment */}

          <Environment resolution={128}>

            <Lightformer
              intensity={1.6}
              position={[0, 6, 3]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[8, 3, 1]}
            />

            <Lightformer
              intensity={1.0}
              color="#d2ddff"
              position={[-7, 3, 0]}
              rotation={[0, Math.PI / 2, 0]}
              scale={[3, 6, 1]}
            />

          </Environment>

          <ConsoleModel />

          <ContactShadows
            position={[0, -0.45, 0]}
            opacity={0.6}
            scale={18}
            blur={2}
            far={4}
            resolution={256}
            frames={1}
          />

        </Canvas>

      </div>

      <nav className="console-shortcuts" aria-label="Console navigation alternatives">
        <a href="#">HOME</a><a href="#work">WORK</a><a href="#about">ABOUT</a>
        <a href="https://github.com/shaunak36" target="_blank" rel="noopener noreferrer">GITHUB</a>
        <a href="#contact">CONTACT</a><a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=paulshaunak5%40gmail.com" target="_blank" rel="noopener noreferrer">EMAIL</a>
      </nav>
      <div className="console-bottom">

        <span>SP SYSTEMS — MK.02</span>

        <span className="console-online">
          <i /> INTERFACE READY
        </span>

      </div>

    </section>
  )
}