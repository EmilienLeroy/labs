import './style.css'
import { Scene, PerspectiveCamera, WebGLRenderer, LineBasicMaterial, BufferGeometry, Vector3, Vector4, Line, CylinderGeometry, MeshBasicMaterial, Mesh, PointLight, MeshDepthMaterial, MeshNormalMaterial, MeshLambertMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const body = document.body;
const width = window.innerWidth;
const height = window.innerHeight;
const ratio =  width / height;
const light = new PointLight(0xffffff, 1, 100);
const redLight = new PointLight(0xff00000, 1, 100);
const scene = new Scene();
const camera = new PerspectiveCamera(75, ratio, 0.1, 1000);
const renderer = new WebGLRenderer();
const loader = new OBJLoader();
const obj = await loader.loadAsync('male02.obj')

light.position.set(50, 50, 50);
redLight.position.set(-50, -50, 50);
obj.position.y = -300;

obj.traverse((child) => {
  if(child instanceof Mesh) {
    child.material = new MeshLambertMaterial({ color: 'white', reflectivity: 1 });
  }
})

scene.add(light);
scene.add(redLight);
scene.add(obj);

camera.position.set(0, 0, 100);
renderer.setSize(width, height);
body.append(renderer.domElement);

main(renderer, scene, camera);


function main(renderer, scene, camera) {
  requestAnimationFrame(() => main(renderer, scene, camera));
  obj.position.add(new Vector3(0, 0.5, 0));
  obj.rotateY(0.01);

  if (obj.position.y > 100) {
    obj.position.y = -300;
  }
  renderer.render(scene, camera);
}