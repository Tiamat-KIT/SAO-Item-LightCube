import {OrbitControls,Plane,Stats, useCubeTexture} from "@react-three/drei"
import {Canvas, useFrame, useThree} from "@react-three/fiber"
import { Suspense, useRef,useState } from "react"
import * as three from "three"


function CubeObj1(){
  const boxRef = useRef<three.Mesh>(null!)
  const loader = new three.TextureLoader()

  const [active, setActive] = useState(false)

  const materials = [
    new three.MeshStandardMaterial({map:loader.load("./normal_top.png")}),
    new three.MeshStandardMaterial({map:loader.load("./normal_bottom.png")}),
    new three.MeshStandardMaterial({map:loader.load("./normal_front.png")}),
    new three.MeshStandardMaterial({map:loader.load("./plane.png")}),
    new three.MeshStandardMaterial({map:loader.load("./normal_left.png")}),
    new three.MeshStandardMaterial({map:loader.load("./plane.png")}),
  ]

  const metalness = 2.0
  const light_materials = [
    new three.MeshStandardMaterial({map:loader.load("./light_top.png"),transparent: true,metalness: metalness,}),
    new three.MeshStandardMaterial({map:loader.load("./light_bottom.png"),transparent: true,metalness: metalness,}),
    new three.MeshStandardMaterial({map:loader.load("./light_front.png"),transparent: true,metalness: metalness,}),
    new three.MeshStandardMaterial({map:loader.load("./plane.png"),transparent: true,metalness: metalness,}),
    new three.MeshStandardMaterial({map:loader.load("./light_left.png"),transparent: true,metalness: metalness,}),
    new three.MeshStandardMaterial({map:loader.load("./plane.png"),transparent: true,metalness: metalness,}),
  ]

  useFrame(() => {
    boxRef.current!.rotation.y += 0.01

  })

  const {scene}  = useThree()
  scene.background=new three.Color("#222222")

  return (
    <>
      <mesh ref={boxRef} position={[0,1,0]} castShadow receiveShadow
        onClick={(event) => setActive(!active)}>
        <boxGeometry args={[1,1,1]}/>
        <meshStandardMaterial
          material={active ? light_materials : materials}/>
      </mesh>
    </>
  )
}

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
          <Plane rotation={[-Math.PI / 2, 0, 0]} args={[5, 5]} receiveShadow>
              <meshStandardMaterial color="#fff" side={three.DoubleSide} />
          </Plane>
          <CubeObj1 />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
