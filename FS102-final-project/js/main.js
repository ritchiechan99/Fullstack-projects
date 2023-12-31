//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { CopyShader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/shaders/CopyShader.js";
import { FXAAShader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/shaders/FXAAShader.js";

import {applyCustomMaterials} from './applyCustomMaterials.js';
import {debugPositionRotation} from './debugPositionRotation.js';
import {cameraMove,selfIntro} from './buttonClick.js';
import {changeVideoSource, videoSrc1, videoSrc2} from './videoTexturesVariable.js'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-4.95, -0.34, 2.07);


let object;
let controls;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



let objName = 'room';
let objToRender = objName;
const loader = new GLTFLoader();




const objectsToToggle = [];
 
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    console.log("Model loaded.");
    object = gltf.scene;
    changeVideoSource(videoSrc1);
    applyCustomMaterials(object);
    object.traverse(function (child) {
      if (child.isMesh) {
        
        if (child.name === "Cube004_1" ||
            child.name === "wire1") { 
          objectsToToggle.push(child);
        }
      }
    });
    scene.add(object);
    
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }

  
);


export var materialActive = false;

function toggleMaterialVisibility() {
  objectsToToggle.forEach(object => {
    console.log("Object Name:", selfIntro);
    object.material.visible = selfIntro;
  });
}


document.getElementById("container3D").appendChild(renderer.domElement);


camera.position.z = objToRender === objName ? 25 : 500;
const topLight = new THREE.DirectionalLight(0xF4EAD5, 1); 
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xF4EAD5, objToRender === objName ? 0.5 : 2);
scene.add(ambientLight);


if (objToRender === objName) {
  controls = new OrbitControls(camera, renderer.domElement);

  // // Limit polar angles (up and down rotation)
  controls.minPolarAngle = Math.PI / 6;     // Minimum rotation up
  controls.maxPolarAngle = (3.5 * Math.PI) / 6; // Maximum rotation down

  // Enable damping for smoother movement after mouse release
  controls.enableDamping = true;
  controls.dampingFactor = 0.05; // Adjust the damping factor as needed
  controls.enabled = false;
  const targetPosition = new THREE.Vector3(-8, 0.72, 45);
  controls.target.copy(targetPosition);

  // Set the polar and azimuthal angles in degrees
  const polarAngleDegrees = 90;
  const azimuthalAngleDegrees = 0;

  // Convert degrees to radians
  const polarAngleRadians = THREE.MathUtils.degToRad(polarAngleDegrees);
  const azimuthalAngleRadians = THREE.MathUtils.degToRad(azimuthalAngleDegrees);


  const distance = 15.0; // Set the desired distance from the target
  const spherical = new THREE.Spherical(distance, polarAngleRadians, azimuthalAngleRadians);
  const offset = new THREE.Vector3().setFromSpherical(spherical);
  const newPosition = new THREE.Vector3().addVectors(targetPosition, offset);



  // Set the camera's new position
  camera.position.copy(newPosition);
  cameraMove(camera,controls);
  debugPositionRotation(controls);
}




function addBloomEffect(scene, camera, renderer) {
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    2.5, // Strength of the bloom effect
    1.4, // The radius
    0.75 // The threshold
  );
  const composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
 
  function animate() {
    toggleMaterialVisibility();
    requestAnimationFrame(animate);
    composer.render();
    controls.update();
    debugPositionRotation(controls);
  }

  return animate;
}

const animate = addBloomEffect(scene, camera, renderer);


window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


animate();