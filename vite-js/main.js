import './style.css'
import { ThreeScene } from './util/ThreeScene'
import {RTThree} from "./util/RayTracingThreeScene"

const app = document.querySelector('#app')
// const threeCanvas = ThreeScene(app.clientWidth,app.clientHeight)
const threeCanvas = RTThree(app.clientWidth,app.clientHeight)
app.appendChild(threeCanvas)
