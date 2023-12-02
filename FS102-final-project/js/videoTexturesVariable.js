import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

const videoElement = document.getElementById("video");

const videoSrc1 = "./src/videos/sdv.mp4";
const videoSrc2 = "./src/videos/Gl.mp4";
const videoBUG = "./src/videos/BUG.mp4";
const videoRPGproj = "./src/videos/RPGproj.mp4";
const videoShader = "./src/videos/shaderProject.mp4";
const video3DRPG = "./src/videos/3DRPG.mp4";

function changeVideoSource(src) {
    videoElement.src = src; 
    videoElement.load(); 
    videoElement.play();
    videoElement.muted = true;
    videoElement.loop = true;
}
  

export { changeVideoSource, videoSrc1, videoSrc2, videoBUG, videoRPGproj, videoShader, video3DRPG};