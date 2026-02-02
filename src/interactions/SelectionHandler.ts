import * as THREE from "three";
import { getCamera } from "../engine/Renderer";
import { shapeManager } from "../managers/ShapeManager";
import { openPropertiesUI } from "../ui/CheckShapeUI";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function initSelection(canvas: HTMLCanvasElement, selectEnable: () => boolean) {
  canvas.addEventListener("click", (event) => {
    if (!selectEnable()) return;

    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, getCamera());

    const intersects = raycaster.intersectObjects(shapeManager.getAll(), true);

    if (intersects.length === 0) {
      shapeManager.reset();
      console.log("Nothing selected");
      return;
    }

    const selectedObj = intersects[0].object;
    shapeManager.select(selectedObj);
    console.log("Selected object:", selectedObj);

    
    openPropertiesUI(selectedObj);
  });
}
