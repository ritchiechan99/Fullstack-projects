import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

const videoElement = document.getElementById("video");

const videoSrc1 = "./src/videos/Gl.mp4";
const videoSrc2 = "./src/videos/sdv.mp4";

function changeVideoSource(src) {
    videoElement.src = src; 
    videoElement.load(); 
    videoElement.play();
}
  

export { changeVideoSource, videoSrc1, videoSrc2};