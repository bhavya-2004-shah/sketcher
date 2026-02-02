import * as THREE from "three";
import { hideShape } from "../interactions/HideShape";
import { deleteShape } from "../interactions/DeleteShape";
import { getScene } from "../engine/Renderer";


let currentLine: THREE.Line | null = null;

const panel = document.getElementById("properties-panel")!;
const linearUI = document.getElementById("linear-ui")!;
const hideBtn = document.getElementById("hideLine") as HTMLButtonElement; // New hide button
const deleteBtn = document.getElementById("deleteLine") as HTMLButtonElement;



export function openLineUI(object: THREE.Object3D) {
  if (!(object instanceof THREE.Line)) return;

  currentLine = object;
  linearUI.style.display = "block";

  // Clear old point inputs
  const oldPoints = linearUI.querySelectorAll(".point-block");
  oldPoints.forEach(p => p.remove());

  const geometry = object.geometry as THREE.BufferGeometry;
  const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
  const array = positionAttr.array as Float32Array;

  const pointsCount = array.length / 3;

  // Create UI for each point
  for (let i = 0; i < pointsCount; i++) {
    const pointDiv = document.createElement("div");
    pointDiv.className = "point-block";
    pointDiv.style.border = "1px solid #ddd";
    pointDiv.style.padding = "6px";
    pointDiv.style.marginBottom = "6px";

    pointDiv.innerHTML = `
      <strong>Point ${i + 1}</strong>

      <div class="prop">
        <label>X</label>
        <input type="number" step="0.1" data-index="${i}" data-axis="x"
          value="${array[i * 3].toFixed(2)}">
      </div>

      <div class="prop">
        <label>Y</label>
        <input type="number" step="0.1" data-index="${i}" data-axis="y"
          value="${array[i * 3 + 1].toFixed(2)}">
      </div>

      <div class="prop">
        <label>Z</label>
        <input type="number" step="0.1" data-index="${i}" data-axis="z"
          value="${array[i * 3 + 2].toFixed(2)}">
      </div>
    `;

    linearUI.insertBefore(pointDiv, document.getElementById("updateLine"));
  }

  // Color
  const colorInput = document.getElementById("lineColor") as HTMLInputElement;
  const material = object.material as THREE.LineBasicMaterial;
  colorInput.value = `#${material.color.getHexString()}`;

  // UPDATE BUTTON
  const updateBtn = document.getElementById("updateLine") as HTMLButtonElement;
  updateBtn.onclick = () => {
    if (!currentLine) return;

    const inputs = linearUI.querySelectorAll("input[data-index]");

    inputs.forEach(input => {
      const el = input as HTMLInputElement;
      const pointIndex = Number(el.dataset.index);
      const axis = el.dataset.axis!;
      const value = parseFloat(el.value);

      const baseIndex = pointIndex * 3;

      if (axis === "x") array[baseIndex] = value;
      if (axis === "y") array[baseIndex + 1] = value;
      if (axis === "z") array[baseIndex + 2] = value;
    });

    positionAttr.needsUpdate = true;

    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    material.color.set(colorInput.value);
  };

   hideBtn.textContent = currentLine.visible ? "Hide" : "Show";
  
  hideBtn.onclick = () => {
    if(!currentLine) return;
    hideShape(currentLine);
  };

  deleteBtn.onclick = () => {
    if (!currentLine) return;
    deleteShape(currentLine, getScene());
    currentLine = null;
  };
}
export function closeLineUI() {
  linearUI.style.display = "none";
  currentLine = null;
}
