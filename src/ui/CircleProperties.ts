import * as THREE from "three";

import { hideShape } from "../interactions/HideShape";
import { deleteShape } from "../interactions/DeleteShape";
import { getScene } from "../engine/Renderer";

let currentCircle: THREE.Mesh | null = null;


const ui = document.getElementById("circle-ui")!;
const xInput = document.getElementById("circleX") as HTMLInputElement;
const yInput = document.getElementById("circleY") as HTMLInputElement;
const radiusInputX = document.getElementById("radiusX") as HTMLInputElement;
const radiusInputY = document.getElementById("radiusY") as HTMLInputElement;

const colorInput = document.getElementById("circleColor") as HTMLInputElement;
const updateBtn = document.getElementById("updateCircle") as HTMLButtonElement;
const hideBtn = document.getElementById("hideCircle") as HTMLButtonElement; 
const deleteBtn = document.getElementById("deleteCircle") as HTMLButtonElement;



export function openCircleUI(object: THREE.Object3D) {
  if (!(object instanceof THREE.Mesh)) return;
  if (!(object.geometry instanceof THREE.CircleGeometry)) return;

  currentCircle = object;
  ui.style.display = "block";

  xInput.value = object.position.x.toFixed(2);
  yInput.value = object.position.y.toFixed(2);


  radiusInputX.value = object.geometry.parameters.radius.toFixed(2);
  radiusInputY.value = radiusInputX.value;
  console.log(radiusInputX.value);

  const material = object.material as THREE.MeshBasicMaterial;
  colorInput.value = `#${material.color.getHexString()}`;

  updateBtn.onclick = () => {
    if (!currentCircle) return;

    /* position */
    currentCircle.position.set(
      parseFloat(xInput.value),
      parseFloat(yInput.value),
      0
    );

    const radiusX = parseFloat(radiusInputX.value);
    if (radiusX > 0) {
      const segments = (currentCircle.geometry as THREE.CircleGeometry).parameters.segments || 64;
      currentCircle.geometry.dispose();
      currentCircle.geometry = new THREE.CircleGeometry(radiusX, segments);
      currentCircle.userData.radius = radiusX;
    }

    // const radiusY = parseFloat(radiusInputY.value);
    material.color.set(colorInput.value);


  };
  hideBtn.textContent = currentCircle.visible ? "Hide" : "Show";

hideBtn.onclick = () => {
  if(!currentCircle) return;
  hideShape(currentCircle);
};


deleteBtn.onclick = () => {
  if (!currentCircle) return;
  deleteShape(currentCircle, getScene());
  currentCircle = null;
};

}

export function closeCircleUI() {
  ui.style.display = "none";
  currentCircle = null;
}