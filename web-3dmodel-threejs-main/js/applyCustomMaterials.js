// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";


const videoElement = document.getElementById("video");

const texture = new THREE.TextureLoader().load('./models/room/textures/wp9450529.png');
const texture2 = new THREE.TextureLoader().load('./models/room/textures/grey-felt-texture.jpg');
const texture3 = new THREE.TextureLoader().load('./models/room/textures/white-fabric-texture.jpg');


const portrait = new THREE.TextureLoader().load('./models/room/textures/portrait.png');
const fallenangel2_5 = new THREE.TextureLoader().load('./models/room/textures/fallenangel2_5.png');
const eula_finish = new THREE.TextureLoader().load('./models/room/textures/eula-finish.png');
const sleep1crop = new THREE.TextureLoader().load('./models/room/textures/sleep1crop.png');

const videoTexture = new THREE.VideoTexture(videoElement);


videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;


videoTexture.flipY = false;

function applyMaterialToObject(child, texture, emissiveIntensityValue, metalValue) {
  const materials = Array.isArray(child.material) ? child.material : [child.material];
  for (const material of materials) {
    if (material) {
      const newMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x020412,
        emissiveIntensity: emissiveIntensityValue,
        metalness: metalValue,
        map: texture,
      });
      material.dispose();
      child.material = newMaterial;
    }
  }
}

function applyMaterialToObject2(child, texture, emissiveIntensityValue, metalValue) {
  const materials = Array.isArray(child.material) ? child.material : [child.material];
  for (const material of materials) {
    if (material) {
      const aspect = texture.image.width / texture.image.height;

      const newMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x020412,
        emissiveIntensity: emissiveIntensityValue,
        metalness: metalValue,
        map: texture,
      });

      // Set texture repeat values based on the aspect ratio
      if (aspect > 1) {
        newMaterial.map.repeat.set(1, 1 / aspect);
      } else {
        newMaterial.map.repeat.set(aspect, 1);
      }

      // Set texture offset to center the texture
      newMaterial.map.offset.set(0.5 - newMaterial.map.repeat.x / 2, 0.5 - newMaterial.map.repeat.y / 2);

      material.dispose();
      child.material = newMaterial;
    }
  }
}

function applyTransparentMaterialToObject(child, emissiveIntensityValue) {
  const materials = Array.isArray(child.material) ? child.material : [child.material];
  for (const material of materials) {
    if (material) {
      const newMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x0F2C59, // Set the desired emissive color
        emissiveIntensity: emissiveIntensityValue, // Adjust the emissive intensity as needed
        transparent: true, // Enable transparency
        opacity: 0.1,
        // You can set other material properties here as needed
      });
      material.dispose();
      child.material = newMaterial;
    }
  }
}


function applyCustomMaterials(object) {
  object.traverse(function (child) {
    if (child.isMesh) {
      const meshName = child.name;
      const materialName = child.material.name; 
      console.log(`Mesh Name: ${meshName}, Material Name: ${materialName}`);
      if (child.name === "Cube021_1") { // TV
        applyMaterialToObject(child, videoTexture, 2.5, 0);
      } else if (child.name === "rich_mattress_a_duvet_c") {
        applyMaterialToObject(child, texture2, 0.5, 0);
      } else if (child.name === "rich_mattress_a") {
        applyMaterialToObject(child, texture3, 0.5, 0.5);
      } else if (child.name === "bed_pillow_c") {
        applyMaterialToObject(child, texture3, 0.5, 0);
      } else if (child.name === "bed_pillow_c001") {
        applyMaterialToObject(child, texture3, 0.5, 0);
      } else if (child.name === "television_a_21x9") {
        applyMaterialToObject(child, texture3, 0.5, 0);
      } else if (child.name == "Window001") {
        applyTransparentMaterialToObject(child, 1.0);
      } else if (child.name == "poster_a") {
        applyMaterialToObject(child, fallenangel2_5, 0.5, 0.6);
      } else if (child.name == "poster_a001") {
        applyMaterialToObject(child, portrait, 0.5, 0.6);
      } else if (child.name == "poster_a002") {
        applyMaterialToObject(child, eula_finish, 0.5, 0.6);
      } else if (child.name == "poster_a003") {
        applyMaterialToObject(child, sleep1crop, 0.5, 0.6);
      } else if (child.name !== "citybackground") {
        applyMaterialToObject(child, texture, 0.5, 0);
      } 
      
    }
  });
}

export { applyCustomMaterials };
