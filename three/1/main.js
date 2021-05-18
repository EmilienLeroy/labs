import './style.css'
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, CircleBufferGeometry, CircleGeometry } from 'three';

const body = document.body;
const width = window.innerWidth;
const height = window.innerHeight;
const ratio =  width / height;
const scene = new Scene();
const scene2 = new Scene();
const camera = new PerspectiveCamera(75, ratio, 0.1, 1000);
const renderer = new WebGLRenderer();
const material = new MeshBasicMaterial({ color: 'red' }) 
const cube = new Mesh(new BoxGeometry(), material);
const circle = new Mesh(new CircleGeometry(1, 100), material);

cube.name = 'main';
circle.name = 'main';

camera.position.z = 5;

scene.add(cube);
scene2.add(circle);

renderer.setSize(width, height);
body.append(renderer.domElement);

main(renderer, scene, camera);

function rotate(mesh, raduis = 1) {
  mesh.rotateX(raduis);
  mesh.rotateY(raduis);
}

function main(renderer, scene, camera) {
  requestAnimationFrame(() => main(renderer, scene, camera));

  rotate(scene.getObjectByName('main'), 0.01);

  renderer.render(scene, camera);
}