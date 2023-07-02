import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
/* import {useTexture} from "@react-three/drei" */
import { Canvas, useFrame, ThreeElements, useLoader } from '@react-three/fiber'
import { useTexture } from '@react-three/drei';
import { BufferGeometry, BufferAttribute, Mesh, MeshBasicMaterial } from 'three';

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)


  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta 
  })
  const frtTexture = useTexture(["1.png","2.png"])
  /* const bkTexture = useTexture("2.png")
  const topTexture = useTexture("3.png")
  const btmTexture = useTexture("4.png")
  const lTexture = useTexture("5.png")
  const rTexture = useTexture("5.png") */

  const frontTexture = useTexture('/path/to/frontTexture.png');
  const backTexture = useTexture('/path/to/backTexture.png');
  const topTexture = useTexture('/path/to/topTexture.png');
  const bottomTexture = useTexture('/path/to/bottomTexture.png');
  const leftTexture = useTexture('/path/to/leftTexture.png');
  const rightTexture = useTexture('/path/to/rightTexture.png');

  const positions = new Float32Array([
    -0.5, 0.5, 0.5, // 前面の頂点1
    0.5, 0.5, 0.5, // 前面の頂点2
    0.5, -0.5, 0.5, // 前面の頂点3
    -0.5, -0.5, 0.5, // 前面の頂点4
    // 他の面の頂点も同様に追加します
  ]);

  const uvs = new Float32Array([
    0, 1, // 前面のテクスチャ座標1
    1, 1, // 前面のテクスチャ座標2
    1, 0, // 前面のテクスチャ座標3
    0, 0, // 前面のテクスチャ座標4
    // 他の面のテクスチャ座標も同様に追加します
  ]);

  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3, // 前面の頂点インデックス
    // 他の面の頂点インデックスも同様に追加します
  ]);

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new BufferAttribute(uvs, 2));
  geometry.setIndex(new BufferAttribute(indices, 1));

  return (
    /* <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={hovered ? "blue" : 'silver'}
        
      />
      <meshBasicMaterial map={frtTexture} />
      <meshBasicMaterial map={bkTexture} />
      <meshBasicMaterial map={topTexture} />
      <meshBasicMaterial map={btmTexture} />
      <meshBasicMaterial map={lTexture} />
      <meshBasicMaterial map={rTexture} />
    </mesh> */
    <mesh geometry={geometry}>
      <meshBasicMaterial map={frontTexture} />
      <meshBasicMaterial map={backTexture} />
      <meshBasicMaterial map={topTexture} />
      <meshBasicMaterial map={bottomTexture} />
      <meshBasicMaterial map={leftTexture} />
      <meshBasicMaterial map={rightTexture} />
    </mesh>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Box position={[-1.2, 0, 0]} /> */}
      <Box position={[1, 0, 0]} />
    </Canvas>
  </>
)