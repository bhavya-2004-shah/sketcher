import * as THREE from "three";
import { hideShape } from "../interactions/HideShape";
import { deleteShape } from "../interactions/DeleteShape";
import { getScene } from "../engine/Renderer";


let currentEllipse: THREE.LineLoop | null = null;

/* DOM */
const ui = document.getElementById("circle-ui")!;

const xInput = document.getElementById("circleX") as HTMLInputElement;
const yInput = document.getElementById("circleY") as HTMLInputElement;


const rxInput = document.getElementById("radiusX") as HTMLInputElement;
const ryInput = document.getElementById("radiusY") as HTMLInputElement;

const colorInput = document.getElementById("circleColor") as HTMLInputElement;
const updateBtn = document.getElementById("updateCircle") as HTMLButtonElement;
const hideBtn = document.getElementById("hideCircle") as HTMLButtonElement; // New hide button
const deleteBtn = document.getElementById("deleteCircle") as HTMLButtonElement;

export function openEllipseUI(object: THREE.Object3D) {
  if (!(object instanceof THREE.LineLoop)) return;

  if (object.userData.shapeType !== "ellipse") return;

  currentEllipse = object;
  ui.style.display = "block";

  /* center */
  xInput.value = object.position.x.toFixed(2);
  yInput.value = object.position.y.toFixed(2);


  /* radii */
  rxInput.value = object.userData.rx.toFixed(2);
  ryInput.value = object.userData.ry.toFixed(2);

  /* color */
  const material = object.material as THREE.LineBasicMaterial;
  colorInput.value = `#${material.color.getHexString()}`;
  console.log(colorInput.value);

  updateBtn.onclick = () => {
    if (!currentEllipse) return;

    const cx = parseFloat(xInput.value);
    const cy = parseFloat(yInput.value);
   

    const rx = parseFloat(rxInput.value);
    const ry = parseFloat(ryInput.value);

    if (rx <= 0 || ry <= 0) return;

    
    currentEllipse.position.set(cx, cy , 0);

    const curve = new THREE.EllipseCurve(0, 0, rx, ry);
    const points = curve.getPoints(64);

    currentEllipse.geometry.dispose();
    currentEllipse.geometry = new THREE.BufferGeometry().setFromPoints(points);

   
    currentEllipse.userData.rx = rx;
    currentEllipse.userData.ry = ry;

   
    material.color.set(colorInput.value);
  };
  hideBtn.textContent = currentEllipse.visible ? "Hide" : "Show";
  
  hideBtn.onclick = () => {
    if(!currentEllipse) return;
    hideShape(currentEllipse);
  };

  deleteBtn.onclick = () => {
    if (!currentEllipse) return;
    deleteShape(currentEllipse, getScene());
    currentEllipse = null;
  };
}
export function closeEllipseUI() {
  ui.style.display = "none";
  currentEllipse = null;
}