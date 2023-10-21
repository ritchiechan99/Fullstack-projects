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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-4.95, -0.34, 2.07);


let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;


let object;
let controls;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



let objName = 'room';
let objToRender = objName;
//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();




const zoomInTimeline = (duration, x, y, z, zoomOutFactor = 0) => {
  // Cancel the current animation (if any)
  gsap.killTweensOf(camera.position);
  
  // Calculate the current position as the starting point
  const currentPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
  
  gsap.to(currentPosition, {
    duration,
    x,
    y,
    z: z + zoomOutFactor,
    ease: "Power2.easeOut",
    onUpdate: () => {
      // Update camera position during the animation
      camera.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
      controls.target.lerp(targetPosition, lerpFactor);
    },
  });
};


// const zoomInTimeline = (duration, x, y, z, zoomOutFactor = 0) => {
// 	let tl = gsap
// 		.timeline({ defaults: { duration:duration,ease: "Power2.easeOut"} })
// 		.to(camera.position, { x, y, z: z + zoomOutFactor }, 0)
// };

 // Adjust the lerp factor as needed
 const lerpFactor = 0.009;
 var targetPosition;

 let lerpAnimationId = null;

 function lerpTarget() {
   // Linearly interpolate the target position towards the new targetPosition
   controls.target.lerp(targetPosition, lerpFactor);
 
   // Check if the target position has been reached
   if (controls.target.distanceTo(targetPosition) > 0.001) {
     // Continue the lerp if the target hasn't reached the destination
     lerpAnimationId = requestAnimationFrame(lerpTarget);
   } else {
     // Stop the lerp animation when the target is reached
     cancelAnimationFrame(lerpAnimationId);
     lerpAnimationId = null;
   }
 }
 
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


const ZoomBtn = document.querySelector(".btn");
const ZoomHome = document.querySelector(".btn-home");
const ZoomVideo = document.querySelector(".btn-video");

var clicks;






ZoomBtn.addEventListener("click", () => {

  if (lerpAnimationId !== null) {
    cancelAnimationFrame(lerpAnimationId);
  }
  targetPosition = new THREE.Vector3(-20, -2, -15);
  zoomInTimeline(8, 3, 2, 22, 0);
  lerpTarget();
  
  
  setTimeout(() => {
    var header = document.getElementById("nav-header");
    header.style.opacity = 1;
  }, 2000);
  // Hide the element with class "title-header" by adding a CSS class
  const titleHeader = document.querySelector(".title-header");
  if (titleHeader) {
    titleHeader.classList.add("fade-out");
  }
});


ZoomHome.addEventListener("click", () => {

  if (lerpAnimationId !== null) {
    cancelAnimationFrame(lerpAnimationId);
  }
  targetPosition = new THREE.Vector3(-20, -2, -15);
  zoomInTimeline(1.5, 3, 2, 22, 0);
  lerpTarget();
});


ZoomVideo.addEventListener("click", () => {

  if (lerpAnimationId !== null) {
    cancelAnimationFrame(lerpAnimationId);
  }

  targetPosition = new THREE.Vector3(-360, -10, 0);
  zoomInTimeline(1.5, -12, -3, -17, 0.5);
  lerpTarget();
});




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
  // controls.enabled = false;
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

  debugPositionRotation(controls);
}



//Render the scene

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