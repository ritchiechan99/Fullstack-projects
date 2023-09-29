//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

let objName = 'room';
//Set which object to render
let objToRender = objName;

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();


const texture = new THREE.TextureLoader().load('./models/room/textures/wp9450529.png')

// const cubeloader = new THREE.CubeTextureLoader();
// const texture = cubeloader.load([
//     'right.png', 'left.png',
//     'top.png', 'bottom.png',
//     'front.png', 'back.png'
// ]);

// const skyboxMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//       tCube: { value: texture }
//   },
//   vertexShader: `
//       varying vec3 vWorldPosition;
//       void main() {
//           vec4 worldPosition = modelMatrix * vec4(position, 1.0);
//           vWorldPosition = worldPosition.xyz;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//   `,
//   fragmentShader: `
//       uniform samplerCube tCube;
//       varying vec3 vWorldPosition;
//       void main() {
//           gl_FragColor = textureCube(tCube, vWorldPosition);
//       }
//   `
// });
// Invert the skybox to ensure it's inside out
//skyboxMaterial.side = THREE.BackSide;

// Create a box geometry for the skybox
//const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000); // Adjust the size as needed

// Create a mesh using the geometry and skybox material
//const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

// Add the skybox to the scene
//scene.add(skybox);
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    
    // object.traverse(function (child) {
    //   if (child.isMesh && child.name === "citybackground") { // Target only the "citybackground" object
    //     const materials = Array.isArray(child.material) ? child.material : [child.material];
    //     for (const material of materials) {
    //       if (material) {
    //         material.metalness = 0; // Set metalness to 0
    //         material.emissiveIntensity = 1; 
    //       }
    //     }
    //   }
    // });

    object.traverse(function (child) 
    {
      if (child.isMesh)
      {
        if (child.name !== "citybackground")
        {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          for (const material of materials) {
            if (material) {
              const newMaterial = new THREE.MeshStandardMaterial({
                emissive: 0x020412, // Set the desired emissive color
                emissiveIntensity: 0.0, // Adjust the emissive intensity as needed
                metalness: 0, // Set metalness to 0
                map: texture,
              });
              material.dispose(); // Dispose of the old material
              child.material = newMaterial; // Apply the new material to the mesh
            }
          }
        }
        
      }
    });


    scene.add(object);
    // Find the object by name
    const window = gltf.scene.getObjectByName("Window001"); //get individual material in tiny_isometric_room
    if (window) {
      // The object with the name "ray_lowpoly" was found
      console.log("Found object with name 'window':", window);

      // Replace the existing material with a new material
      const newMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x0F2C59, // Set the desired emissive color
        emissiveIntensity: 1.0, // Adjust the emissive intensity as needed
        transparent: true, // Enable transparency
        opacity: 0.1,
        // You can set other material properties here as needed
      });
      

      window.material = newMaterial;


      window.castShadow = true;
      window.receiveShadow = true;
    } else {
      // Object with the name "ray_lowpoly" was not found
      console.log("Object with name 'window' not found. 1");
    }
    gltf.scene.traverse(function(window){
      console.log(window.name);
  });
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



function updateDisplay() {
  console.log('Updating display...');
  const positionElement = document.getElementById('position');
  const rotationElement = document.getElementById('rotation');

  // console.log('Position:', controls.target);
  // console.log('Azimuthal:', controls.getAzimuthalAngle());
  // console.log('Polar:', controls.getPolarAngle());

  // Get the camera's target position (the "look-at" point)
  const targetPosition = controls.target;
  positionElement.textContent = `(${targetPosition.x.toFixed(2)}, ${targetPosition.y.toFixed(2)}, ${targetPosition.z.toFixed(2)})`;

  // Get the azimuthal (horizontal) and polar (vertical) angles
  const azimuthalAngle = controls.getAzimuthalAngle();
  const polarAngle = controls.getPolarAngle();
  rotationElement.textContent = `Azimuthal: ${(azimuthalAngle * THREE.MathUtils.RAD2DEG).toFixed(2)}°, Polar: ${(polarAngle * THREE.MathUtils.RAD2DEG).toFixed(2)}°`;

  // You can also access the camera's position if needed
  // const cameraPosition = controls.object.position;
  // console.log(`Camera Position: (${cameraPosition.x.toFixed(2)}, ${cameraPosition.y.toFixed(2)}, ${cameraPosition.z.toFixed(2)})`);
}


//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === objName ? 25 : 500;
//camera.position.z = 0;
//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xF4EAD5, 1); // (color, intensity)
// topLight.position.set(500, 500, 500) //top-left-ish
// topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xF4EAD5, objToRender === objName ? 0.5 : 2);
scene.add(ambientLight);

// Function to update the displayed position and rotation

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === objName) {
  controls = new OrbitControls(camera, renderer.domElement);

  // Limit polar angles (up and down rotation)
  controls.minPolarAngle = Math.PI / 6;     // Minimum rotation up
  controls.maxPolarAngle = (3.5 * Math.PI) / 6; // Maximum rotation down

  // Enable damping for smoother movement after mouse release
  controls.enableDamping = true;
  controls.dampingFactor = 0.05; // Adjust the damping factor as needed

  // Function to update and display position and rotation
  

  // Call the updateDisplay function to initially populate the values
  updateDisplay();

  // Add an event listener for mouseup to trigger the display update
  controls.addEventListener('mouseup', updateDisplay);
}
//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  controls.update();
  
  //Make the eye move
  if (object && objToRender === "eye") {
    //I've played with the constants here until it looked good 
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }


  updateDisplay();
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D rendering
animate();