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

import { changeVideoSource, videoSrc1, videoSrc2, videoBUG, videoRPGproj, videoShader, video3DRPG} from './videoTexturesVariable.js'



const ZoomBtn = document.querySelector(".btn");
const ZoomHome = document.querySelector(".btn-home");
const ZoomVideo = document.querySelector(".btn-video");

const wrappersContent = document.querySelector('.wrapper-content');

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
  
   const lerpFactor = 0.109;
   var targetPosition;
  
   let lerpAnimationId = null;

  function lerpTarget() {
  controls.target.lerp(targetPosition, lerpFactor);

  if (controls.target.distanceTo(targetPosition) > 0.001) {
    lerpAnimationId = requestAnimationFrame(lerpTarget);
  } else {
    cancelAnimationFrame(lerpAnimationId);
    lerpAnimationId = null;
  }
  }
  
  function changeTarget(newTargetPosition) {
    targetPosition = newTargetPosition;

    if (lerpAnimationId) {
      cancelAnimationFrame(lerpAnimationId);
      lerpAnimationId = null;
    }

    lerpTarget();
  }
  
  function handleButtonClick(targetPosition, animationDuration, zoomParams, callback) {
    if (lerpAnimationId !== null) {
      cancelAnimationFrame(lerpAnimationId);
    }
    targetPosition = new THREE.Vector3(...targetPosition);
    zoomInTimeline(animationDuration, ...zoomParams);
    changeTarget(targetPosition);
    if (callback) {
      callback();
    }
  }
  

  ZoomBtn.addEventListener("click", () => {
    handleButtonClick(
      [-20, -2, -15],
      8,
      [3, 2, 22, 0],
      () => {
        setTimeout(() => {
          var header = document.getElementById("nav-header");
          header.style.opacity = 1;
          header.style.pointerEvents = 'auto';
        }, 6500);
        const titleHeader = document.querySelector(".title-header");
        if (titleHeader) {
          titleHeader.classList.add("fade-out");
        }
      }
    );
  });
  
  ZoomHome.addEventListener("click", () => {
    changeVideoSource(videoSrc1);
    wrappersContent.style.opacity = 0;
    wrappers.forEach(wrapper => {
      wrapper.style.opacity = 0;
      wrapper.style.transition = 'opacity 0.01s';
    });
    check.forEach(check => {
      check.style.pointerEvents = 'none';
    });
    handleButtonClick([-20, -2, -15], 1.5, [3, 2, 22, 0]);
  });
  
  ZoomVideo.addEventListener("click", () => {
    handleButtonClick([-360, -10, -10], 1.5, [-12, -3, -17, 0.5], () => {
      changeVideoSource(video3DRPG);
      setTimeout(() => {
        wrappersContent.style.opacity = 1;
        wrappersContent.style.transition = 'opacity 0.5s';
        wrappers.forEach(wrapper => {
          wrapper.style.opacity = 1;
          wrapper.style.transition = 'opacity 0.5s';
        });
  
        check.forEach(check => {
          check.style.pointerEvents = 'auto';
        });
      }, 1500);
    });
  });

  const carousel = document.querySelector(".carousel-container");
  const slide = document.querySelector(".carousel-slide");

  const prev = document.querySelector('.carousel-arrow--prev');
  const next = document.querySelector('.carousel-arrow--next');

  function handleCarouselMove(positive = true) {
    const slideWidth = slide.clientWidth;
    carousel.scrollLeft = positive ? carousel.scrollLeft + slideWidth : carousel.scrollLeft - slideWidth;
  }
  prev.addEventListener("click", () => {

    handleCarouselMove(false);
  });
  next.addEventListener("click", () => {

    handleCarouselMove();
  });


}



  $(document).ready(function () {
    const checkboxes = $(".check"); 
    const nav = $("#nav-header"); 
    const video = $(".video video");
    const checkbox1 = $(".check.portfolio-1");
    const checkbox2 = $(".check.portfolio-2");
    const checkbox3 = $(".check.portfolio-3");
    const content = $(".wrapper-content");
    const title = $(".wrapper-title");
    const description = $(".wrapper-description");

  
    checkbox1.mouseover(function () {
      changeVideoSource(video3DRPG);
      title.text("To Home");
      description.text("This is my first official game project that I did for school submission when I'm touching the tips of C#\n\nThis is a simple 3D physics platformer\n\nThis was done with the idea of balancing 2D and 3D objects to make something aesthetically pleasing for the eyes");
    });
  
    checkbox2.mouseover(function () {
      changeVideoSource(videoShader);
      title.text("CG Shaders");
      description.text("This was the part where I'm mostly focusing learning how to code shaders and also how to use post processing to enhance gameplay");
    });

    checkbox3.mouseover(function () {
      changeVideoSource(videoRPGproj);
      title.text("The Shadow Monarch");
      description.text("The Shadow Monarch\nThis is the 2nd game I've made after learning CG shaders and intermediate programming. It is a top-down Souls-like game that uses a summoning system. The story is heavily inspired by a manhwa I've read called 'Solo Leveling'.");
    });
  
    checkboxes.on("change", function () {
      if ($(this).is(":checked")) {
        checkboxes.not(this).css("pointer-events", "none");
        $("html").css("overflow-y", "auto");

        $(window).scroll(function () {
          if ($(this).scrollTop() === 0) {
            video.css("transition", "filter 0.5s");
            video.css("filter", "brightness(100%)");
            nav.css("opacity", "1");
            nav.css("transition", "opacity 0.5s");
          }
          else
          {
            video.css("transition", "filter 0.5s");
            video.css("filter", "brightness(40%)");
            nav.css("opacity", "0");
            nav.css("transition", "opacity 0.5s");
          }
        });
      } else {
        checkboxes.css("pointer-events", "auto");
        
        $("html").css("overflow-y", "hidden");
        $("html").scrollTop(0);
      }
    });
  });


export { cameraMove };
