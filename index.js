import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const width = window.innerWidth;
const height = window.innerHeight;

//renderer
const renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

//camera
const fov =75;
const aspect = width/height;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z =2;

//scene
const scene = new THREE.Scene();

//control
const control = new OrbitControls(camera,renderer.domElement);
control.enableDamping = true;
control.dampingFactor = 0.03

//geometry
const geometry = new THREE.IcosahedronGeometry(1,2.0);
// const material = new THREE.MeshBasicMaterial({color: 0xccff});
//Note Basic Material Does not interact with light
const material = new THREE.MeshStandardMaterial({color : 0xccff,flatShading : true})
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//light
const hemiLight = new THREE.HemisphereLight(0xffffff,0x000000)
scene.add(hemiLight)

//animation 
function animate (t=0) {
    requestAnimationFrame(animate)
    mesh.rotation.y = t *0.0001
    // mesh.scale.setScalar(Math.cos(t *0.001)+1.0)
    control.update();
    renderer.render(scene,camera);
}
animate()