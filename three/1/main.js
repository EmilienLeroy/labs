import './style.css'
import { FontLoader,Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, CircleBufferGeometry, CircleGeometry, TextGeometry } from 'three';

const font = await new FontLoader().loadAsync('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/gentilis_regular.typeface.json');
const body = document.body;
const width = window.innerWidth;
const height = window.innerHeight;
const ratio =  width / height;
const scene = new Scene();
const scene2 = new Scene();
const camera = new PerspectiveCamera(75, ratio, 0.1, 1000);
const renderer = new WebGLRenderer();
const material = new MeshBasicMaterial({ color: 'red' }) 
const cube = new Mesh(new BoxGeometry(25, 25, 25), material);
const circle = new Mesh(new CircleGeometry(1, 100), material);
const text = new TextGeometry('Hello le world', { font, size: 15, height: 7 });


cube.name = 'main';
circle.name = 'main';

cube.position.set(-20, 0, 0)
camera.position.set(50, 10, 100)

scene.add(cube);
scene.add(new Mesh(text, new MeshBasicMaterial({ color: 'blue' })));
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