import * as THREE from "three";
import { shapeManager } from "../managers/ShapeManager";

export function saveCanvas(): string {
  const data = shapeManager.getAll().map(obj => {
    const base = {
      shapeType: obj.userData.shapeType,
      visible: obj.visible,
      position: obj.position,
    };

    /* LINE / POLYLINE */
    if (obj instanceof THREE.Line) {
      const geom = obj.geometry as THREE.BufferGeometry;
      const pos = geom.getAttribute("position");
      const points = [];

      for (let i = 0; i < pos.count; i++) {
        points.push({
          x: pos.getX(i),
          y: pos.getY(i),
          z: pos.getZ(i),
        });
      }

      return {
        ...base,
        points,
        color: (obj.material as THREE.LineBasicMaterial).color.getHex(),
      };
    }

    /* CIRCLE */
    if (obj instanceof THREE.Mesh && obj.userData.shapeType === "circle") {
      return {
        ...base,
        radius: obj.userData.radius,
        segments: obj.userData.segments,
        color: (obj.material as THREE.MeshBasicMaterial).color.getHex(),
      };
    }

    /* ELLIPSE */
    if (obj.userData.shapeType === "ellipse") {
      return {
        ...base,
        rx: obj.userData.rx,
        ry: obj.userData.ry,
        color: ((obj as THREE.Line).material as THREE.LineBasicMaterial).color.getHex(),
      };
    }

    return null;
  }).filter(Boolean);

  return JSON.stringify(data, null, 2);
}
