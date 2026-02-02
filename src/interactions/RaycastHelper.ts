import * as THREE from "three";
import { getCamera } from "../engine/Renderer";



const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();



export function rayCastBoiler(
  event: MouseEvent,
  canvas: HTMLCanvasElement
): THREE.Raycaster {

  const rect = canvas.getBoundingClientRect();

  mouse.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );

  raycaster.setFromCamera(mouse, getCamera());
  return raycaster;
}


export function getWorldPoint(
  event: MouseEvent,
  canvas: HTMLCanvasElement
): THREE.Vector3 {

  const ray = rayCastBoiler(event, canvas);

  // XY plane (Z = 0)
  const plane = new THREE.Plane(
    new THREE.Vector3(0, 0, 1),
    0
  );

  const point = new THREE.Vector3();
  ray.ray.intersectPlane(plane, point);

  return point;
}



export function selectObject(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  objects: THREE.Object3D[]
): THREE.Object3D | null {

  const ray = rayCastBoiler(event, canvas);

  const intersects = ray.intersectObjects(objects, true);

  if (intersects.length > 0) {

    return intersects[0].object.parent ?? intersects[0].object;
  }

  return null;
}
