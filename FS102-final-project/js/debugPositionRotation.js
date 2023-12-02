
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";


export function debugPositionRotation(controls) {
  // console.log('Updating display...');
  
  const $positionElement = $('#position');
  const $rotationElement = $('#rotation');
  const $zoomElement = $('#zoom');

  // Get the camera's target position (the "look-at" point)
  const targetPosition = controls.target;
  $positionElement.text(`(${targetPosition.x.toFixed(2)}, ${targetPosition.y.toFixed(2)}, ${targetPosition.z.toFixed(2)})`);

  // Get the azimuthal (horizontal) and polar (vertical) angles
  const azimuthalAngle = controls.getAzimuthalAngle();
  const polarAngle = controls.getPolarAngle();
  $rotationElement.text(`Azimuthal: ${(azimuthalAngle * THREE.MathUtils.RAD2DEG).toFixed(2)}°, Polar: ${(polarAngle * THREE.MathUtils.RAD2DEG).toFixed(2)}°`);

  $zoomElement.text(controls.object.zoom.toFixed(2));
}
