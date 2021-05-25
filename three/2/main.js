import './style.css'
import { Scene, PerspectiveCamera, WebGLRenderer, LineBasicMaterial, BufferGeometry, Vector3, Vector4, Line, CylinderGeometry, MeshBasicMaterial, Mesh, PointLight, MeshDepthMaterial, MeshNormalMaterial, MeshLambertMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const body = document.body;
const width = window.innerWidth;
const height = window.innerHeight;
const ratio =  width / height;
const light = new PointLight(0xffffff, 1, 100);
const redLight = new PointLight(0xff00000, 1, 100);
const material = new LineBasicMaterial({ color: 'red', linewidth: 100 });
const mesh = new MeshLambertMaterial({ color: 'white' });
const scene = new Scene();
const camera = new PerspectiveCamera(75, ratio, 0.1, 1000);
const renderer = new WebGLRenderer();
const geoCylinder = new CylinderGeometry(60, 60, 1, 65);
const cylinder = new Mesh(geoCylinder, mesh);
const geometry = new BufferGeometry().setFromPoints([
  new Vector3(0, 0, 0),
  new Vector3(50, 0, 0),
  new Vector3(0, 0, 0),
]);

const line = new Line(geometry, material);
const control = new OrbitControls(camera, renderer.domElement);

line.position.set(0, 0, 1);
light.position.set(50, 50, 50);
redLight.position.set(-50, -50, 50);
cylinder.rotateX(1.57);

scene.add(line);
scene.add(cylinder);
scene.add(light);
scene.add(redLight);

camera.position.set(0, 0, 100);
renderer.setSize(width, height);
body.append(renderer.domElement);

main(renderer, scene, camera, line);

setInterval(() => {
  line.rotateZ(-0.1);
}, 1000)

function main(renderer, scene, camera) {
  requestAnimationFrame(() => main(renderer, scene, camera));
  renderer.render(scene, camera);
}