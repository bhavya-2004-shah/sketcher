import * as THREE from "three";
import { shapeManager } from "../managers/ShapeManager";
import { getScene } from "../engine/Renderer";

export function loadCanvas(json: string) {
  const scene = getScene();

  /* REMOVE OLD */
  shapeManager.getAll().forEach(obj => scene.remove(obj));
  shapeManager.clear();

  const data = JSON.parse(json);

  data.forEach((item: any) => {
    let obj: THREE.Object3D | null = null;

    /* LINE / POLYLINE */
    if (item.shapeType === "line" || item.shapeType === "polyline") {
      const points = item.points.map(
        (p: any) => new THREE.Vector3(p.x, p.y, p.z)
      );

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: item.color });
      obj = new THREE.Line(geometry, material);
    }

    /* CIRCLE */
    if (item.shapeType === "circle") {
      const geometry = new THREE.CircleGeometry(
        item.radius,
        item.segments
      );
      const material = new THREE.MeshBasicMaterial({
        color: item.color,
        side: THREE.DoubleSide,
      });

      obj = new THREE.Mesh(geometry, material);
    }

    /* ELLIPSE */
    if (item.shapeType === "ellipse") {
      const curve = new THREE.EllipseCurve(
        0, 0,
        item.rx,
        item.ry,
        0,
        Math.PI * 2
      );

      const points = curve.getPoints(64);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: item.color });
      obj = new THREE.LineLoop(geometry, material);
    }

    if (!obj) return;

    obj.position.copy(item.position);
    obj.visible = item.visible;
    obj.userData.shapeType = item.shapeType;

    scene.add(obj);
    shapeManager.register(obj); 
  });
}
