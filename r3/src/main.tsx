import { Canvas } from '@react-three/fiber';
import { createRoot } from 'react-dom/client';
import { Box } from './three/train';

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