import { AmbientLight, BoxGeometry, Color, DoubleSide, Fog, GridHelper, HemisphereLight, HemisphereLightHelper, Material, Mesh, MeshBasicMaterial, MeshLambertMaterial, ObjectLoader, PerspectiveCamera, PlaneGeometry, PointLight, Scene, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import './style.css'


const light = new HemisphereLight(0xFFFFFF, 0x000000, 1);
const littleLight = new PointLight('red', 1);
const planeGeometry = new PlaneGeometry(1000, 1000, 20, 20); 
const material =  new MeshLambertMaterial({ color: 'grey', side: DoubleSide, opacity: 0.5, transparent: true });
const plane =  new Mesh(planeGeometry, material);
const box = new Mesh(new BoxGeometry(50, 50, 50), new MeshLambertMaterial({ color: 'white' }));
const camera = new PerspectiveCamera(60 , window.innerWidth / window.innerHeight, 10, 3000);
const grid = new GridHelper(1000, 20, 'white', 'white');
const scene = new Scene();
const render = new WebGLRenderer();
const control = new OrbitControls(camera, render.domElement);
const obj = await new OBJLoader().loadAsync('male02.obj');

obj.traverse((child) => {
  if(child instanceof Mesh) {
    child.material = new MeshLambertMaterial({ color: 'white', reflectivity: 1 });
  }
})

camera.position.set(300, 500, 500);
camera.lookAt(0, 1, 0);
littleLight.position.y = 200;
littleLight.position.x = 200;

box.position.y = 26;
grid.position.set(0, 1, 0);
plane.rotateX(degToRad(90));

scene.background = new Color(0xFFFFFF);
scene.fog = new Fog(0xFFFFFF, 10, 3000);

scene.add(grid);
scene.add(plane);
scene.add(obj);
scene.add(light);
scene.add(box);
scene.add(littleLight);

document.body.append(render.domElement);

render.setSize(window.innerWidth, window.innerHeight);
render.setPixelRatio(window.devicePixelRatio);

main(render, scene, camera);

document.addEventListener('keypress', (e) => {
  switch (e.key) {
    case 'z':
      obj.position.add(new Vector3(0, 0, 10));
      break;

    case 'q':
      obj.position.add(new Vector3(10, 0, 0));
      break;

    case 'd':
      obj.position.add(new Vector3(-10, 0, 0));
      break;
    
    case 's':
      obj.position.add(new Vector3(0, 0, -10));
      break;
  
    default:
      break;
  }
})

function degToRad(deg) {
  return (deg * Math.PI / 180); 
}

function main(renderer, scene, camera) {
  requestAnimationFrame(() => main(renderer, scene, camera));
  renderer.render(scene, camera);
}