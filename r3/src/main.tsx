import React, { Suspense, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { CubeTextureLoader, CubeRefractionMapping } from 'three';
import { Box } from './three/train.tsx';
import { Plane,OrbitControls } from '@react-three/drei';
import * as THREE from "three"




createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Suspense fallback={null}>
      <Canvas>
      <color attach="background" args={['#1e1e1e']} />
        <ambientLight intensity={0.1} />
        <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              castShadow
          />
          <OrbitControls />
          <pointLight position={[10, 10, 10]} />
          <Box position={[1, 0, 0]} />
          <Plane rotation={[-Math.PI / 2, 0, 0]} args={[10, 10]} receiveShadow>
            <meshStandardMaterial color="#fff" side={THREE.DoubleSide} />
          </Plane>
      </Canvas>
    </Suspense> 
  </>
)