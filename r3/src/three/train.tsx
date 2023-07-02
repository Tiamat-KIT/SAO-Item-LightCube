import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, ThreeElements, useLoader } from '@react-three/fiber'
import { useCubeTexture } from '@react-three/drei';

export function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta 
  })

  const envMap = useCubeTexture([
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '5.png'
  ],{path: "./cube"})


  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={hovered ? "blue" : 'silver'}
        map={envMap}
      />
    </mesh>
  )
}