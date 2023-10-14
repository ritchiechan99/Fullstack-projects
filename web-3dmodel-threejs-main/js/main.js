//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

import {applyCustomMaterials} from './applyCustomMaterials.js';
import {debugPositionRotation} from './debugPositionRotation.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-4.95, -0.34, 2.07);


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;


let object;
let controls;
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);




let objName = 'room';
let objToRender = objName;
//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();




loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    applyCustomMaterials(object);
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);





//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === objName ? 25 : 500;
const topLight = new THREE.DirectionalLight(0xF4EAD5, 1); 
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xF4EAD5, objToRender === objName ? 0.5 : 2);
scene.add(ambientLight);

// Function to update the displayed position and rotation

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === objName) {
  controls = new OrbitControls(camera, renderer.domElement);

  // // Limit polar angles (up and down rotation)
  controls.minPolarAngle = Math.PI / 6;     // Minimum rotation up
  controls.maxPolarAngle = (3.5 * Math.PI) / 6; // Maximum rotation down

  // Enable damping for smoother movement after mouse release
  controls.enableDamping = true;
  controls.dampingFactor = 0.05; // Adjust the damping factor as needed
  controls.enabled = false;
  const targetPosition = new THREE.Vector3(-4.41, 0.72, 7.02);
  controls.target.copy(targetPosition);

  // Set the polar and azimuthal angles in degrees
  const polarAngleDegrees = 87.02;
  const azimuthalAngleDegrees = 40.68;

  // Convert degrees to radians
  const polarAngleRadians = THREE.MathUtils.degToRad(polarAngleDegrees);
  const azimuthalAngleRadians = THREE.MathUtils.degToRad(azimuthalAngleDegrees);


  const distance = 15.0; // Set the desired distance from the target
  const spherical = new THREE.Spherical(distance, polarAngleRadians, azimuthalAngleRadians);
  const offset = new THREE.Vector3().setFromSpherical(spherical);
  const newPosition = new THREE.Vector3().addVectors(targetPosition, offset);



  // Set the camera's new position
  camera.position.copy(newPosition);

  debugPositionRotation(controls);
}


//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  controls.update();



  debugPositionRotation(controls);
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


animate();