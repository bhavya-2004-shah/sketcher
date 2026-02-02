import * as THREE from "three";
import { openLineUI } from "./LineProperties";
import { openCircleUI } from "./CircleProperties";
import { openEllipseUI } from "./EllipseProperties";

export function openPropertiesUI(object: THREE.Object3D) {
  const shapeType = object.userData.shapeType;

  // hide both first
  document.getElementById("linear-ui")!.style.display = "none";
  document.getElementById("circle-ui")!.style.display = "none";

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

  console.warn("Unknown shape type", shapeType);
}
