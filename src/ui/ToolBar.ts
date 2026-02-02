import { getScene } from "../engine/Renderer";
import { shapeManager } from "../managers/ShapeManager";
import * as THREE from 'three'
import { createRandomLine } from "../shapes/Line";
import { createRandomCircle } from "../shapes/Circle";
import { createRandomEllipse } from "../shapes/Ellipse";
import { createRandomPolyline } from "../shapes/PolyLine";

function addShape(shape: THREE.Object3D) {
  getScene().add(shape);
  shapeManager.register(shape);
}

export function initToolbarButtons() {
  document.getElementById("line")?.addEventListener("click", () => {
    addShape(createRandomLine());
  });

  document.getElementById("circle")?.addEventListener("click", () => {
    addShape(createRandomCircle());
  });

  document.getElementById("ellipse")?.addEventListener("click", () => {
    addShape(createRandomEllipse());
  });

  document.getElementById("polyline")?.addEventListener("click", () => {
    addShape(createRandomPolyline());
  });
}
export function initToolbar(onToolSelect: (tool: string) => void) {
  const buttons = document.getElementById("toolbar-container") as HTMLSelectElement;

  buttons.addEventListener("click", (event) => {
    const targetedValue = event.target as HTMLElement;

   if(!targetedValue.dataset.tool) return ; 


   onToolSelect(targetedValue.dataset.tool)
  });
}


export function initAction(onActionChange: (action: "draw" | "select" | "") => void) {
  const dropdown = document.getElementById("actionSelect") as HTMLSelectElement;
  dropdown.addEventListener("change", () => {
    const value = dropdown.value as "draw" | "select" | "";
    if (!value) return;
   const abc =  onActionChange(value);

    console.log(abc)
  });
}
