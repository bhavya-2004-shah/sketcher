import * as THREE from "three";
import { shapeManager } from "../managers/ShapeManager";
import { hideShape } from "../interactions/HideShape";
import { deleteShape } from "../interactions/DeleteShape";
import { getScene } from "../engine/Renderer";
import { openLineUI } from "./LineProperties";
import { openCircleUI } from "./CircleProperties";
import { openEllipseUI } from "./EllipseProperties";
import { hideAllProperties } from "./HideProperties";

// import { shapeManager } from "../managers/ShapeManager";

const leftPanel = document.getElementById("left-panel");
const fileBlock = leftPanel?.querySelector(".file-block");


export function initLeftPanel() {
  shapeManager.subscribe(() => {
    rebuildLeftPanel();
  });
}


export function addObjectToLeftPanel(object: THREE.Object3D) {
  const shapeType = object.userData.shapeType;
  if (!shapeType) return;

  /* MAIN ITEM */
  const item = document.createElement("div");
  item.className = "object-item";
  item.textContent = shapeType;

  /* 👁 HIDE BUTTON */
  const eyeBtn = document.createElement("button");
  eyeBtn.textContent = "👁";

  eyeBtn.onclick = (e) => {
    e.stopPropagation();
    hideShape(object);
  };

  /* 🗑 DELETE BUTTON */
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";

  deleteBtn.onclick = (e) => {
  e.stopPropagation();
  deleteShape(object, getScene());
};

  /* SELECT FROM LEFT PANEL */
  item.onclick = () => {
    shapeManager.select(object);
    console.log("Selected from left panel", object.uuid);
      hideAllProperties();
     if (shapeType === "line" || shapeType === "polyline") {
        openLineUI(object);
        return;
      }
    
      if (shapeType === "circle") {
        openCircleUI(object);
        return;
      }
    
      if (shapeType === "ellipse") {
      openEllipseUI(object);
      return;
    }
  };

  /* APPEND BUTTONS */
  item.appendChild(eyeBtn);
  item.appendChild(deleteBtn);

  fileBlock?.appendChild(item);

  /* STORE REF (for sync later) */
  object.userData.leftItem = item;
}

function rebuildLeftPanel() {
  if (!fileBlock) return;

  fileBlock.innerHTML = ""; // 🔥 clear old UI

  shapeManager.getAll().forEach(obj => {
    addObjectToLeftPanel(obj);
  });
}