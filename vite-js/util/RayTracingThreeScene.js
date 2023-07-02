import { RayTracingRenderer,RayTracingMaterial } from "ray-tracing-renderer";
import * as Three from "three"

export function RTThree(width = 800,height = 600) {
    const renderer = new RayTracingRenderer();

    // ... create scene and camera
    const scene = new Three.Scene();

    const camera = new Three.PerspectiveCamera(45,width / height,1,10000)
    camera.position.set(0,0,1000)
    
    const dirLight = new Three.SoftDirectionalLight(0xffffff, 0.5, 0.3); // color, intensity, softness
    dirLight.softness = 0.6; // change softness to 0.6 for a softer shadow

    scene.add(dirLight);

    const material = new RayTracingMaterial();
    material.shadowCatcher = true; // material will catch shadows and blend with the environment map;

    const geometry = new Three.PlaneBufferGeometry(1000, 1000); // create ground plane
    const mesh = new Three.Mesh(geometry, material);
    mesh.rotateX(Math.PI / 2); // rotate plane so it rests on the ground, pointing upward

    // Place box on top of ground plane
    // The box will now appear to naturally sit on the environment light's floor
    const boxGeometry = new Three.BoxBufferGeometry(10, 10, 10);
    const boxMaterial = new Three.MeshStandardMaterial();
    const boxMesh = new Three.Mesh(boxGeometry, boxMaterial);
    mesh.position.set(0, 5, 0);

    function tick() {
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    tick();

    return renderer.domElement
}
