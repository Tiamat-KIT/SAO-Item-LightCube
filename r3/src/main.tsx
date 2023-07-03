import React, { Suspense, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { CubeTextureLoader, CubeRefractionMapping } from 'three';
import { Box } from './three/train.tsx';


createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Canvas style={{backgroundColor: "black"}}>
      <Suspense fallback={null}>
      <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[1, 0, 0]} />
      </Suspense> 
    </Canvas>
  </>
)