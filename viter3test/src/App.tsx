import {OrbitControls,Plane} from "@react-three/drei"
import {Canvas, useFrame, useThree} from "@react-three/fiber"
import { Suspense, useRef,useState } from "react"
import * as three from "three"
// 使ってないのを消した

function App() {
  function CubeObj1({bool,setbool,speed} : {bool: boolean,setbool:React.Dispatch<React.SetStateAction<boolean>>,speed:number}){
    const boxRef = useRef<three.Mesh>(null!)
    const loader = new three.TextureLoader()
    const metalness = 2.0
    
  
    const materials = [
      new three.MeshStandardMaterial({map:loader.load("./normal/normal_top.png"),bumpMap: loader.load("./normal/normal_top.png"),bumpScale: 0.05,metalness: metalness}),
      new three.MeshStandardMaterial({map:loader.load("./normal/normal_bottom.png"),bumpMap: loader.load("./normal/normal_bottom.png"),bumpScale: 0.05,metalness: metalness}),
      new three.MeshStandardMaterial({map:loader.load("./normal/normal_front.png"),bumpMap: loader.load("./normal/normal_front.png"),bumpScale: 0.05,metalness: metalness}),
      new three.MeshStandardMaterial({map:loader.load("./normal/plane.png"),bumpScale: 0.05,metalness: metalness}),
      new three.MeshStandardMaterial({map:loader.load("./normal/normal_left.png"),bumpScale: 0.05,metalness: metalness}),
      new three.MeshStandardMaterial({map:loader.load("./normal/plane.png"),bumpScale: 0.05,metalness: metalness}),
    ]
  
    
    const light_materials = [
      new three.MeshStandardMaterial({map:loader.load("./light/light_top.png"),bumpMap: loader.load("./normal/normal_top.png"),bumpScale: 0.05,metalness: metalness,}),
      new three.MeshStandardMaterial({map:loader.load("./light/light_bottom.png"),bumpMap: loader.load("./normal/normal_bottom.png"),bumpScale: 0.05,metalness: metalness,}),
      new three.MeshStandardMaterial({map:loader.load("./light/light_front.png"),bumpMap: loader.load("./normal/normal_front.png"),bumpScale: 0.05,metalness: metalness,}),
      new three.MeshStandardMaterial({map:loader.load("./light/plane.png"),bumpScale: 0.05,metalness: metalness,}),
      new three.MeshStandardMaterial({map:loader.load("./light/light_left.png"),bumpScale: 0.05,metalness: metalness,}),
      new three.MeshStandardMaterial({map:loader.load("./light/plane.png"),bumpScale: 0.05,metalness: metalness,}),
    ]
  
    useFrame(() => {
      boxRef.current!.rotation.y += speed
      boxRef.current.rotation.x += speed
      boxRef.current.material = materials
      if(bool){
        boxRef.current.material = light_materials
      }
    })
  
    const {scene}  = useThree()
    scene.background=new three.Color("#222222")
  
    return (
      <>
        <mesh ref={boxRef} position={[0,1,0]} castShadow receiveShadow
          onClick={() => {setbool(!bool)}}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial/>
        </mesh>
      </>
    )
  }

  const [active, setActive] = useState(false)
  const [speed,setSpeed] = useState(0.01)
  return (
    <>
      <Canvas
        camera={
          {
            position: [0,3,2],
            fov: 50,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 2000
          }}
          dpr={window.devicePixelRatio}
          shadows>
          <color attach="background" args={["#1e1e1e"]} />
          <OrbitControls />
          <ambientLight intensity={0.2} />
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
          <CubeObj1 bool={active} setbool={setActive} speed={speed}/>
        </Suspense>
      </Canvas>
      <button onClick={() => setActive(!active)}>状態変化</button>
      <div>
        <p>回転速度変化</p>
        <button onClick={() => setSpeed(speed - 0.01)}>
          減速
        </button>
        <button onClick={() => setSpeed(speed + 0.01)}>
          加速
        </button>
      </div>
    </>
  )
}

export default App
