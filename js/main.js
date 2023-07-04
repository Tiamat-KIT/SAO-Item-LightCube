import * as three from "three"

const scene = new three.Scene()
const camera = new three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const renderer = new three.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

document.body.appendChild(renderer.domElement)
