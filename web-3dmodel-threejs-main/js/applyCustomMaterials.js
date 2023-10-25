// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { CopyShader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/shaders/CopyShader.js";
import { FXAAShader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/shaders/FXAAShader.js";
import { RGBELoader } from "https://raw.githack.com/mrdoob/three.js/r129/examples/jsm/loaders/RGBELoader.js";


const videoElement = document.getElementById("video");

const texture = new THREE.TextureLoader().load('./models/room/textures/wp9450529.png');
const texture2 = new THREE.TextureLoader().load('./models/room/textures/grey-felt-texture.jpg');
const texture3 = new THREE.TextureLoader().load('./models/room/textures/white-fabric-texture.jpg');


const portrait = new THREE.TextureLoader().load('./models/room/textures/portrait.png');
const fallenangel2_5 = new THREE.TextureLoader().load('./models/room/textures/fallenangel2_5.png');
const eula_finish = new THREE.TextureLoader().load('./models/room/textures/eula-finish.png');
const sleep1crop = new THREE.TextureLoader().load('./models/room/textures/sleep1crop.png');

const videoTexture = new THREE.VideoTexture(videoElement);


// Get a reference to the HTML element you want to use as a texture
const htmlElement = document.getElementById("test-onscreen");

// Create a texture from the HTML element
const textureHtml = new THREE.CanvasTexture(htmlElement);
texture.needsUpdate = true; // Ensure the texture is updated





videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;


videoTexture.flipY = false;







function applyMaterialToObject(child, texture, emissive, emissiveIntensityValue, metalValue) {
  const materials = Array.isArray(child.material) ? child.material : [child.material];
  for (const material of materials) {
    if (material) {
      const newMaterial = new THREE.MeshStandardMaterial({
        emissive: emissive,
        emissiveIntensity: emissiveIntensityValue,
        metalness: metalValue,
        map: texture,
      });
      material.dispose();
      child.material = newMaterial;
    }
  }
}
function applyMaterialWithoutTexture(child, opacity, emissiveColor, emissiveIntensityValue, metalValue, baseColor) {
  const materials = Array.isArray(child.material) ? child.material : [child.material];
  for (const material of materials) {
    if (material) {
      const newMaterial = new THREE.MeshStandardMaterial({
        emissive: emissiveColor,
        emissiveIntensity: emissiveIntensityValue,
        metalness: metalValue,
        color: baseColor, 
        transparent: true,
        opacity: opacity
      });
      material.dispose();
      child.material = newMaterial;
    }
  }
}


const hdrEquirect = new RGBELoader().load(
  "./models/room/shader/empty_warehouse_01_2k.hdr",  
  () => { 
    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
  }
);


function applyMaterialWithoutTexturePBR(child, roughness, transmission, thickness, ior) {
  const materials = Array.isArray(child.material) ? child.material : [child.material];
  for (const material of materials) {
    if (material) {
      const newMaterial = new THREE.MeshPhysicalMaterial({
        roughness: roughness,  
        transmission: transmission, 
        thickness: thickness,
        ior: ior,

      });
      envMap: hdrEquirect
      material.dispose();
      child.material = newMaterial;
    }
  }
}

function applyMaterialWithBlur(child, opacity, emissiveColor, emissiveIntensityValue, metalValue, baseColor, blurIntensity) {
  const materials = Array.isArray(child.material) ? child.material : [child.material];
  for (const material of materials) {
    if (material) {
      // Create a new material with blur effect
      const blurMaterial = new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { value: null }, // The texture to apply blur
          u_intensity: { value: blurIntensity }, // Adjust blur intensity
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform float u_intensity;
          varying vec2 vUv;
          void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            // Apply blur effect here using convolution or other methods
            // Example: color = blur(color, u_intensity);
            gl_FragColor = color;
          }
        `,
        transparent: true,
        opacity: opacity,
      });

      // Dispose of the old material and set the object's material to the blurMaterial
      material.dispose();
      child.material = blurMaterial;
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

function applyRainDropletsMaterialWithReflection(child, emissiveIntensityValue) {
  const materials = Array.isArray(child.material) ? child.material : [child.material];
  for (const material of materials) {
    if (material) {
      const rainDropletsTexture = new THREE.TextureLoader().load('./models/room/textures/raindroplets.png'); // Replace with the path to your rain droplets texture

      // Adjust these parameters to control the appearance of the rain droplets
      const emissiveColor = new THREE.Color(0x0F2C59); // Set the desired emissive color
      const emissiveIntensity = emissiveIntensityValue; // Adjust the emissive intensity as needed
      const transparent = true; // Enable transparency
      const opacity = 0.5; // Adjust the opacity as needed
      const rainDropletsScale = new THREE.Vector2(0.02, 0.02); // Adjust the scale of rain droplets

      rainDropletsTexture.wrapS = THREE.RepeatWrapping;
      rainDropletsTexture.wrapT = THREE.RepeatWrapping;
      rainDropletsTexture.repeat.set(2, 2); // Adjust the repeat factors to control the density of rain droplets

      // Create a reflection effect by using the emissive color and intensity
      const newMaterial = new THREE.MeshStandardMaterial({
        map: rainDropletsTexture, // Set the rain droplets texture
        emissive: emissiveColor,
        emissiveIntensity: emissiveIntensity,
        transparent: transparent,
        opacity: opacity,
      });

      newMaterial.map.repeat.copy(rainDropletsScale);

      material.dispose();
      child.material = newMaterial;
    }
  }
}


function applyIridescentMaterialToObject(child, emissiveIntensityValue) {
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (material) {
        // Define the initial emissive color and intensity
        const initialEmissiveColor = new THREE.Color(0x0F2C59); // Initial emissive color
        const initialEmissiveIntensity = emissiveIntensityValue; // Initial emissive intensity
  
        // Define the colors for the iridescent effect
        const iridescentColors = [0xFF0000, 0x00FF00, 0x0000FF]; // Replace with your desired colors
        const iridescentSpeed = 0.002; // Adjust the speed of color change
  
        let currentColorIndex = 0;
        let time = 0;
  
        function updateMaterialColor() {
          // Use Math.sin to create a smooth oscillation between colors
          const colorIndex = Math.floor(currentColorIndex) % iridescentColors.length;
          const nextColorIndex = (colorIndex + 1) % iridescentColors.length;
          const mixFactor = currentColorIndex - colorIndex;
          const currentColor = new THREE.Color(iridescentColors[colorIndex]);
          const nextColor = new THREE.Color(iridescentColors[nextColorIndex]);
          const blendedColor = new THREE.Color().copy(currentColor).lerp(nextColor, mixFactor);
  
          material.emissive.copy(blendedColor);
          currentColorIndex += iridescentSpeed;
  
          if (currentColorIndex >= iridescentColors.length) {
            currentColorIndex = 0;
          }
  
          // Update time for animation
          time += 0.1; // Adjust the time factor
          requestAnimationFrame(updateMaterialColor);
        }
  
        // Start the color change animation
        updateMaterialColor();
  
        // Set the initial emissive color and intensity
        material.emissive = initialEmissiveColor;
        material.emissiveIntensity = initialEmissiveIntensity;
  
        // Enable transparency
        material.transparent = true;
        material.opacity = 0.1; // Adjust the opacity as needed
      }
    }
  }

  function BloomMaterial(child, emissive, emissiveIntensity) {
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (material) {
        const newMaterial = new THREE.MeshPhysicalMaterial({
          emissive: emissive,
          emissiveIntensity: emissiveIntensity, 
          emissiveMap: null, 
          color: 0x020412,
          metalness: 1, 
          roughness: 0, 
  
        });
        envMap: hdrEquirect
        material.dispose();
        child.material = newMaterial;
      }
    }
  }
  
  const bloomMaterialForObject = new THREE.MeshStandardMaterial({
    emissive: 0x97FEED, // Adjust emissive color as needed
    emissiveIntensity: 1, // Adjust emissive intensity as needed
    emissiveMap: null, // You can add an emissive texture if required
    color: 0x020412, // Adjust the base color as needed
    metalness: 1, // Adjust the metalness (0 to 1)
    roughness: 0, // Adjust the roughness (0 to 1)
  });

  
function applyCustomMaterials(object) {
  object.traverse(function (child) {
    if (child.isMesh) {
      const meshName = child.name;
      const materialName = child.material.name;
        // console.log(`Mesh Name: ${meshName}, Material Name: ${materialName}`);
      if (child.name === "Cube021_1") { // TV
        applyMaterialToObject(child, videoTexture,0x020412, 2.5, 0);
      } else if (child.name === "rich_mattress_a_duvet_c") {
        applyMaterialToObject(child, texture2,0x020412, 0.5, 0.5);
      } else if (child.name === "rich_mattress_a") {
        applyMaterialToObject(child, texture3,0x020412, 0.5, 0.7);
      } else if (child.name === "bed_pillow_c") {
        applyMaterialToObject(child, texture3,0x020412, 0.5, 0.5);
      } else if (child.name === "bed_pillow_c001") {
        applyMaterialToObject(child, texture3,0x020412, 0.5, 0.5);
      } else if (child.name === "television_a_21x9") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "Window001") {
        applyMaterialWithoutTexturePBR(child, 0.2, 1,1,0);
      } else if (child.name == "poster_a") {
        applyMaterialToObject(child, fallenangel2_5,0x020412, 0.5, 0.6);
      } else if (child.name == "poster_a001") {
        applyMaterialToObject(child, portrait,0x020412, 0.5, 0.6);
      } else if (child.name == "poster_a002") {
        applyMaterialToObject(child, eula_finish,0x020412, 0.5, 0.6);
      } else if (child.name == "poster_a003") {
        applyMaterialToObject(child, sleep1crop,0x020412, 0.5, 0.6);
      } else if (child.name == "door_sliding_g") {
        applyMaterialWithoutTexturePBR(child, 0.3, 1,1,5);
      } else if (child.name == "door_sliding_g_nonsolo_blend") {
        child.material.visible = false;
      } else if (child.name == "door_sliding_glass") {
        applyMaterialWithoutTexturePBR(child, 0.3, 1,1,5);
      } else if (child.name == "door_sliding_g001") {
        child.material.visible = false;
      } else if (child.name == "ash_tray_a") {
        applyMaterialWithoutTexturePBR(child, 0, 1,1,1);
      } else if (child.name == "tablet_b_kitsch") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "tablet_b_kitsch002") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "magazine_d") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "magazine_n_open") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0xF1EFEF);
      } else if (child.name == "int_kts_apartment_a_wardrobe_a_right") {
        applyMaterialWithoutTexture(child, 1, 0x419197, 0.1, 1,0x419197);
      } else if (child.name == "Wall1") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "Wall2") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "Wall3") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "soda_can_b_trash") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "soda_can_f") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "s1_002_ma_shoe__converse_high_simple_left001") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0x303030);
      } else if (child.name == "s1_002_ma_shoe__converse_high_simple_left") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0x303030);
      } else if (child.name == "poor_trash_can_small_e") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0x303030);
      } else if (child.name == "generic_book_d_set_a001") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.98,0xD80032);
      } else if (child.name == "generic_book_d_set_a002") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0xD80032);
      } else if (child.name == "generic_book_e_set_b002") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0xD80032);
      } else if (child.name == "generic_book_d_set_a") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.8,0xD80032);
      } else if (child.name == "generic_book_f_set_c003") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1,0xD80032);
      } else if (child.name == "generic_book_f_set_c004") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.8,0xD80032);
      } else if (child.name == "generic_book_e_set_b001") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0xD80032);
      } else if (child.name == "generic_book_f_set_c002") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.8,0xD80032);
      } else if (child.name == "generic_book_f_set_c") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0xD80032);
      } else if (child.name == "cuerpo_rifle_low_Cube001") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 0.9,0xB4B4B3);
      } else if (child.name == "~") {
        applyMaterialWithoutTexture(child, 1, 5, 1, 0.5,0x97FEED);
      } else if (child.name == "kitsch_lamp_01_hanging_c008") {
        child.material = bloomMaterialForObject;
      } else if (child.name == "kitsch_lamp_01_hanging_c002") {
        child.material = bloomMaterialForObject;
      } else if (child.name == "kitsch_lamp_01_hanging_c004") {
        child.material = bloomMaterialForObject;
      } else if (child.name == "kitsch_lamp_01_hanging_c001") {
        child.material = bloomMaterialForObject;
      } else if (child.name == "kitsch_lamp_01_hanging_c006") {
        child.material = bloomMaterialForObject;
      } else if (child.name == "wall_lamp_a") {
        applyMaterialWithoutTexture(child, 1, 1, 0.5, 1.6,0x303030);
      } else if (child.name == "vs_apartment_tech_det_b") {
        BloomMaterial(child,0x97FEED,0.7);
      } else if (child.name == "submesh_02_LOD_1008") {
        BloomMaterial(child,0xD80032,0.9);
      } else if (child.name == "submesh_02_LOD_1025") {
        BloomMaterial(child,0xD80032,0.9);
      } else if (child.name == "submesh_01_LOD_1032") {
        BloomMaterial(child,0x97FEED,0.9);
      } else if (child.name == "submesh_03_LOD_1003") {
        BloomMaterial(child,0x97FEED,0.9);
      } else if (child.name == "vs_apartment_tech_det_c001") {
        BloomMaterial(child,0x97FEED,0.4);
      } else if (child.name == "submesh_02_LOD_1022") {
        BloomMaterial(child,0x45FFCA,2);
      } else if (child.name == "submesh_02_LOD_1019") {
        BloomMaterial(child,0x45FFCA,2);
      } else if (child.name == "submesh_02_LOD_1018") {
        BloomMaterial(child,0x45FFCA,2);
      } else if (child.name == "submesh_02_LOD_1021") {
        BloomMaterial(child,0x45FFCA,2);
      } else if (child.name == "submesh_02_LOD_1020") {
        BloomMaterial(child,0x45FFCA,2);
      } else if (child.name == "citybackground") {
        applyMaterialToObject(child, texture,0x020412, 1.6, 0);
      }  else if (child.name !== "citybackground") {
        applyMaterialToObject(child, texture,0x020412, 0.5, 0);
      } 
      
    }
  });
}

export { applyCustomMaterials };
