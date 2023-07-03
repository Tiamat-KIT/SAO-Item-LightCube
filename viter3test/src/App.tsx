import {OrbitControls,Plane,Stats} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import { Suspense } from "react"
import * as three from "three"


/* function CubeObj */

function App() {
  
  return (
    <>
      <Canvas
        camera={
          {
            position: [0,5,8],
            fov: 50,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 2000
          }}
          dpr={window.devicePixelRatio}
          shadows>
          <color attach="background" args={["#1e1e1e"]} />
          <OrbitControls />
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[5,5,5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
        <Suspense fallback={null}>
          <Plane rotation={[-Math.PI / 2, 0, 0]} args={[10, 10]} receiveShadow>
              <meshStandardMaterial color="#fff" side={three.DoubleSide} />
          </Plane>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
