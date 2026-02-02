import * as THREE from "three";
import { shapeManager } from "../managers/ShapeManager";
import { hideShape } from "../interactions/HideShape";
import { deleteShape } from "../interactions/DeleteShape";
import { getScene } from "../engine/Renderer";
import { openLineUI, closeLineUI } from "./LineProperties";
import { openCircleUI } from "./CircleProperties";
import { openEllipseUI } from "./EllipseProperties";
import { hideAllProperties } from "./HideProperties";

const leftPanel = document.getElementById("left-panel");
const fileBlock = leftPanel?.querySelector(".file-block");

// Global counters for stable display names
const shapeCount: Record<string, number> = {};
// Track objects already in the panel
const objectToItem = new Map<THREE.Object3D, HTMLElement>();

/* -------------------- INIT LEFT PANEL -------------------- */
export function initLeftPanel() {
  shapeManager.subscribe(() => {
    // Only add objects that aren't in the panel yet
    const newObjects = shapeManager.getAll().filter(obj => !objectToItem.has(obj));
    newObjects.forEach(obj => addObjectToLeftPanel(obj));
  });
}

/* -------------------- ADD OBJECT -------------------- */
export function addObjectToLeftPanel(object: THREE.Object3D) {
  const shapeType = object.userData.shapeType;
  if (!shapeType) return;

  // Check if object already has a displayName
  let name = object.userData.displayName;

  if (!name) {
    name = `${shapeType} `;
    object.userData.displayName = name;
  }

  // Skip adding if already in panel (prevent duplicates)
  if (object.userData.leftItem) return;

  const item = document.createElement("div");
  item.className = "object-item";
  item.textContent = name;

  const eyeBtn = document.createElement("button");
  eyeBtn.textContent = "👁";
  eyeBtn.onclick = (e) => {
    e.stopPropagation();
    hideShape(object);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    deleteShape(object, getScene());
    removeFromLeftPanel(object);
  };

  item.onclick = () => {
    shapeManager.select(object);
    hideAllProperties();

    if (shapeType === "line" || shapeType === "polyline") openLineUI(object);
    else if (shapeType === "circle") openCircleUI(object);
    else if (shapeType === "ellipse") openEllipseUI(object);
  };

  item.appendChild(eyeBtn);
  item.appendChild(deleteBtn);
  fileBlock?.appendChild(item);

  object.userData.leftItem = item;
  objectToItem.set(object, item);
}

/* -------------------- REMOVE OBJECT -------------------- */
export function removeFromLeftPanel(object: THREE.Object3D) {
  const item = objectToItem.get(object);
  if (item && item.parentElement) item.parentElement.removeChild(item);
  objectToItem.delete(object);
  // Optional: Close UI if current object is deleted
  const shapeType = object.userData.shapeType;
  if (shapeType === "line" || shapeType === "polyline") closeLineUI();
}

/* -------------------- OPTIONAL: REBUILD PANEL -------------------- */
export function rebuildLeftPanel() {
  if (!fileBlock) return;

  fileBlock.innerHTML = "";
  objectToItem.clear();
  // Reset counters if you want fresh numbering
  for (const key in shapeCount) shapeCount[key] = 0;

  shapeManager.getAll().forEach(obj => addObjectToLeftPanel(obj));
}
