import * as THREE from "three";
import { shapeManager } from "../managers/ShapeManager";

/**
 * CENTRAL DELETE FUNCTION
 * This keeps LEFT + RIGHT + SCENE fully in sync
 */
export function deleteShape(object: THREE.Object3D, scene: THREE.Scene) {
  if (!object) return;

  /* 1️⃣ REMOVE FROM SCENE */
  scene.remove(object);

  /* 2️⃣ DISPOSE GEOMETRY */
  if ((object as any).geometry) {
    (object as any).geometry.dispose();
  }

  /* 3️⃣ DISPOSE MATERIAL */
  if ((object as any).material) {
    const material = (object as any).material;
    Array.isArray(material)
      ? material.forEach(m => m.dispose())
      : material.dispose();
  }

  /* 4️⃣ REMOVE FROM SHAPE MANAGER */
  shapeManager.remove(object);

  /* 5️⃣ REMOVE FROM LEFT PANEL UI */
  const leftItem = object.userData.leftItem as HTMLElement | undefined;
  if (leftItem) {
    leftItem.remove();
  }

  /* 6️⃣ CLOSE RIGHT PROPERTIES PANEL */
  closePropertiesPanel();

  console.log("Deleted shape:", object.uuid);
}

/* 🔽 Helper */
function closePropertiesPanel() {
  const circleUI = document.getElementById("circle-ui");
  const lineUI = document.getElementById("linear-ui");

  if (circleUI) circleUI.style.display = "none";
  if (lineUI) lineUI.style.display = "none";
}
