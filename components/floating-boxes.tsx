"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function FloatingBoxes() {
  const boxesRef = useRef<THREE.Group>(null)
  const boxCount = 20
  const boxes = Array.from({ length: boxCount }, (_, i) => ({
    position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [
      number,
      number,
      number,
    ],
    rotation: [Math.random(), Math.random(), Math.random()],
    scale: Math.random() * 0.3 + 0.1,
    speed: Math.random() * 0.01 + 0.005,
  }))

  useFrame(({ clock }) => {
    if (!boxesRef.current) return

    const time = clock.getElapsedTime()

    boxesRef.current.children.forEach((box, i) => {
      const { position, rotation, scale, speed } = boxes[i]

      // Gentle floating motion
      box.position.y = position[1] + Math.sin(time * speed * 5) * 0.5
      box.position.x = position[0] + Math.cos(time * speed * 3) * 0.3
      box.position.z = position[2] + Math.sin(time * speed * 4) * 0.4

      // Slow rotation
      box.rotation.x += speed * 0.5
      box.rotation.y += speed * 0.3
    })
  })

  return (
    <group ref={boxesRef}>
      {boxes.map((box, i) => (
        <mesh key={i} position={box.position} rotation={box.rotation as any} scale={box.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5)}
            transparent
            opacity={0.7}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}
