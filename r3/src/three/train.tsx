import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, ThreeElements, useLoader, useThree } from '@react-three/fiber'
import { useCubeTexture } from '@react-three/drei';
import { CubeRefractionMapping } from 'three';

export function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const {scene} = useThree()

  const texturemap = useLoader(THREE.TextureLoader,"./normal_1.png")
  const lighttexture = useLoader(THREE.TextureLoader,"./light_1.png")
  
  const cubetexturemap = useCubeTexture([
    "normal_1.png",
    "normal_2.png",
    "normal_3.png",
    "normal_4.png",
  ],{path: "./"})
  cubetexturemap.mapping = CubeRefractionMapping; // CubeRefractionMappingを設定


  const lighttexturemap = useCubeTexture([
    "light_1.png",
    "light_2.png",
    "light_3.png",
    "light_4.png",
  ],{path: "./"})
 

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta  
  })


  return (
    <mesh
      /* {...props} */
      ref={meshRef}
      position={[-1,1,0]}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      castShadow
      receiveShadow
      >
      <boxGeometry args={[1, 1, 1]}  />
      <meshStandardMaterial 
        metalness={1}
        envMap={/* hovered ? lighttexturemap : */ cubetexturemap}
      />
    </mesh>
  )
}

// https://qiita.com/nemutas/items/f890bcc3caf0f5cbc46f