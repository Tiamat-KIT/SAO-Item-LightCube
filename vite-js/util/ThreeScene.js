import * as Three from "three"
import {RayTracingRenderer,RayTracingMaterial} from "ray-tracing-renderer"

export const ThreeScene = (width = 800,height = 600) => {
    const renderer = new RayTracingRenderer()
    // const renderer = new Three.WebGLRenderer()
    renderer.setSize(width,height)
    const scene = new Three.Scene()

    const camera = new Three.PerspectiveCamera(45,width / height,1,10000)
    camera.position.set(0,0,1000)

    const light = new Three.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1)
    scene.add(light)
    
    const geometry = new Three.BoxGeometry(250,250,250)
    const material = new RayTracingMaterial({color: 0xff0000})
    material.transparent = true
    const box = new Three.Mesh(geometry,material)

    box.position.z = -5
    scene.add(box)

    const tick = () => {
        requestAnimationFrame(tick)
        box.rotation.x += 0.05
        box.rotation.y += 0.05

        renderer.render(scene,camera)
    }
    tick()

    return renderer.domElement
}

