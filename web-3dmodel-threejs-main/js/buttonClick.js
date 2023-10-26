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





const ZoomBtn = document.querySelector(".btn");
const ZoomHome = document.querySelector(".btn-home");
const ZoomVideo = document.querySelector(".btn-video");

const wrappers = document.querySelectorAll('.wrapper');
const check = document.querySelectorAll('.check');

function cameraMove(camera,controls)
{
  const zoomInTimeline = (duration, x, y, z, zoomOutFactor = 0) => {
    console.log(camera.position);
    gsap.to(camera.position, {
      x,
      y,
      z: z + zoomOutFactor,
      duration,
      ease: "ease-in-out",
    });
  };
  
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

   function changeTarget(newTargetPosition) {
    // Set the new target position
    targetPosition = newTargetPosition;
  
    // If there's an ongoing lerp animation, cancel it
    if (lerpAnimationId) {
      cancelAnimationFrame(lerpAnimationId);
      lerpAnimationId = null;
    }
  
    // Start a new lerp animation to the new target position
    lerpTarget();
  }
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
      header.style.pointerEvents = 'auto';
    }, 5000);
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
    wrappers.forEach(wrapper => {
      wrapper.style.opacity = 0;
      wrapper.style.transition = 'opacity 0.01s'; 
    });
    check.forEach(check => {
      check.style.pointerEvents = 'none';
    });
    targetPosition = new THREE.Vector3(-20, -2, -15);
    changeTarget(targetPosition);
    zoomInTimeline(1.5, 3, 2, 22, 0);
    // lerpTarget();
  });
  
  
  ZoomVideo.addEventListener("click", () => {
  
    cancelAnimationFrame(lerpAnimationId);
    
    targetPosition = new THREE.Vector3(-360, -10, -10);
    changeTarget(targetPosition);
    zoomInTimeline(1.5, -12, -3, -17, 0.5);
    setTimeout(() => {
      wrappers.forEach(wrapper => {
        wrapper.style.opacity = 1;
        wrapper.style.transition = 'opacity 0.5s'; 
      });
      
      check.forEach(check => {
        check.style.pointerEvents = 'auto';
      });
    }, 1500);
 
    // lerpTarget();
  });

  }

  
  export { cameraMove };
