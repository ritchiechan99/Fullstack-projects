//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

import { changeVideoSource, videoSrc1, videoSrc2, videoBUG, videoRPGproj, videoShader, video3DRPG} from './videoTexturesVariable.js'

import {imageGallery,toHomeUrls,shader,shadow,bug} from './imageSwipe.js'


const ZoomBtn = document.querySelector(".btn");
const ZoomHome = document.querySelector(".btn-home");
const ZoomVideo = document.querySelector(".btn-video");
const ZoomHobbies = document.querySelector(".btn-hobbies");
const ZoomAbout = document.querySelector(".btn-about");

const hobbiesContent = document.querySelector('.hobbies-container');
const wrappersContent = document.querySelector('.wrapper-content');

const hobbiesPrevbtn = document.querySelector('.hobbies-button-prev');
const hobbiesNextbtn = document.querySelector('.hobbies-button-next');

const aboutContent = document.querySelector('.about-container');

const wrappers = document.querySelectorAll('.wrapper');
const check = document.querySelectorAll('.check');
export var selfIntro = false;

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
   var cycleArtNum = 0;

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
  function createMenus(content) 
  {
    selfIntro= false;
    hobbiesContent.style.opacity = 0;
    hobbiesContent.style.pointerEvents = 'none';
    aboutContent.style.opacity = 0;
    aboutContent.style.opacity = 'opacity 0.5s';
    aboutContent.style.pointerEvents = 'none';
    wrappersContent.style.opacity = 0;
    wrappers.forEach(wrapper => {
      wrapper.style.opacity = 0;
      wrapper.style.transition = 'opacity 0.01s';
    });
    check.forEach(check => {
      check.style.pointerEvents = 'none';
    });
    if(content === 'home')
    {

    }
    else if(content === 'video')
    {
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
    }
    else if(content === 'hobbies')
    {
      hobbiesContent.style.opacity = 1;
      hobbiesContent.style.pointerEvents = 'auto';
    }
    else if(content === 'about')
    {
      selfIntro = true;
      aboutContent.style.opacity = 1;
    aboutContent.style.opacity = 'opacity 0.5s';
    }
  }

  function cycleArt(artNum) {
    
  
    if (artNum === 0) {
      console.debug("1");
      handleButtonClick([-360, -10, -10], 1.5, [-15, 1, -4, 0.5], () => {}); // pic1
    } else if (artNum === 1) { // Corrected artNum values
      console.debug("2");
      handleButtonClick([-360, -10, -10], 1.5, [-18, 7.5, -1.5, 0.5], () => {}); //pic2
    } else if (artNum === 2) { // Corrected artNum values
      console.debug("3");
      handleButtonClick([-360, -10, -10], 1.5, [-18, 7, 5, 0.5], () => {}); // pic3
    } else if (artNum === 3) { // Corrected artNum values
      console.debug("4");
      handleButtonClick([-360, -10, -10], 1.5, [-19, 0, 4, 0.5], () => {}); // pic4
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
    createMenus("home"); 
    handleButtonClick([-20, -2, -15], 1.5, [3, 2, 22, 0]);
  });
  
  ZoomVideo.addEventListener("click", () => {
    handleButtonClick([-360, -10, -10], 1.5, [-12, -3, -17, 0.5], () => {
    changeVideoSource(video3DRPG);
    createMenus("video");
    });
  });

  ZoomHobbies.addEventListener("click", () => {
    changeVideoSource(videoSrc1);
    createMenus("hobbies"); 

    handleButtonClick([-360, -10, -10], 1.5, [-15, 1, -4, 0.5], () => {});//pic1
    

  });
  hobbiesNextbtn.addEventListener("click", () => {
    cycleArtNum++;
    // alert("tes");
    if (cycleArtNum > 3) {
      cycleArtNum = 0;
    }
    cycleArt(cycleArtNum);
  });
  
  hobbiesPrevbtn.addEventListener("click", () => {
    cycleArtNum--;
    if (cycleArtNum < 0) {
      cycleArtNum = 3;
    }
    cycleArt(cycleArtNum);
  });

  ZoomAbout.addEventListener("click", () => {
    handleButtonClick([-360, -10, -250], 1.5, [-13, -7, -1, 0.5], () => {});
    createMenus("about"); 

  });

}



  $(document).ready(function () {
    const checkboxes = $(".check"); 
    const nav = $("#nav-header"); 
    const video = $(".video video");
    const checkbox1 = $(".check.portfolio-1");
    const checkbox2 = $(".check.portfolio-2");
    const checkbox3 = $(".check.portfolio-3");
    const checkbox4 = $(".check.portfolio-4");
    const summary = $(".wrapper-summary");
    const content = $(".wrapper-content");
    const title = $(".wrapper-title");
    const description = $(".wrapper-description");


    function createIcon(iconClass, text) {
      const iconContainer = $('<div class="icon"></div>');
      const icon = $('<i class="' + iconClass + '" style="color: #ffffff;"></i>');
      const heading = $('<h3>' + text + '</h3>');
      iconContainer.append(icon, heading);
      return iconContainer;
    }
  
    checkbox1.mouseover(function () {
      changeVideoSource(video3DRPG);
      title.text("To Home");
      description.text("This is my first official game project that I did for school submission when I'm touching the tips of C#\n\nThis is a simple 3D physics platformer\n\nThis was done with the idea of balancing 2D and 3D objects to make something aesthetically pleasing for the eyes");
    });
    checkbox1.click(function() {
      const newIcon = createIcon('fa-solid fa-computer fa-lg', 'PC');
      const hacknSlash = createIcon('fa-solid fa-slash fa-lg', 'Hack n Slash');
      const adventure = createIcon('fa-solid fa-paper-plane fa-lg', 'Adventure');
      const puzzle = createIcon('fa-solid fa-puzzle-piece fa-lg', 'Puzzle');
      $('.icon-container').append(newIcon);
      $('.icon-container').append(hacknSlash);
      $('.icon-container').append(adventure);
      $('.icon-container').append(puzzle);
      summary.text('A game about a boy trying to get home after finding himself in another world, he has to pass through different biomes in order to reach home');
      imageGallery(toHomeUrls);
  });


    checkbox2.mouseover(function () {
      changeVideoSource(videoShader);
      title.text("CG Shaders");
      description.text("This was the part where I'm mostly focusing learning how to code shaders and also how to use post processing to enhance gameplay");
    });
    checkbox2.click(function() {
      const newIcon = createIcon('fa-solid fa-computer fa-lg', 'PC');
      $('.icon-container').append(newIcon);
      
      summary.text("A shader museum to showcase all the shaders I've created");

      imageGallery(shader);
  });

    checkbox3.mouseover(function () {
      imageGallery(shadow);
      changeVideoSource(videoRPGproj);
      title.text("The Shadow Monarch");
      description.text("The Shadow Monarch\nThis is the 2nd game I've made after learning CG shaders and intermediate programming. It is a top-down Souls-like game that uses a summoning system. The story is heavily inspired by a manhwa I've read called 'Solo Leveling'.");
    });
    checkbox3.click(function() {
      const pc = createIcon('fa-solid fa-computer fa-lg', 'PC');
      const hacknSlash = createIcon('fa-solid fa-slash fa-lg', 'Hack n Slash');
      const adventure = createIcon('fa-solid fa-paper-plane fa-lg', 'Adventure');
      const puzzle = createIcon('fa-solid fa-puzzle-piece fa-lg', 'Puzzle');
      $('.icon-container').append(pc);
      $('.icon-container').append(hacknSlash);
      $('.icon-container').append(adventure);
      $('.icon-container').append(puzzle);
      summary.text("Players must battle through waves of monsters to confront the final boss. Progressing through levels, you'll encounter mini-bosses and earn the ability to summon defeated bosses, provided you stay within the boss slot limit. The video below showcases prototype features, card system mechanics, and summoning mechanics.");

      imageGallery(shadow);
  });

    checkbox4.mouseover(function () {
      changeVideoSource(videoBUG);
      title.text("B.U.G Wars");
      description.text("This is the final project I did while I was in MAGES, it is a school project. I was in charge of the cinematic and the aesthetics of the game. I also did some scripting for the UI's.");
    });
    checkbox4.click(function() {
      const pcIcon = createIcon('fa-solid fa-computer fa-lg', 'PC');
      const rtsIcon = createIcon('fa-solid fa-chess fa-lg', 'RTS');
      $('.icon-container').append(pcIcon);
      $('.icon-container').append(rtsIcon);
      summary.text("This game is about real time strategy of wars between different species of bugs.");
      imageGallery(bug);
      
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
        $('.icon-container').empty();
        $("html").css("overflow-y", "hidden");
        $("html").scrollTop(0);
      }
    });
  });


export { cameraMove };
