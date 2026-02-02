import * as THREE from "three";

export function createPolyline(points?: THREE.Vector3[]) {
  const pts =
    points ??
    [
      new THREE.Vector3(-200, 0, 0),
      new THREE.Vector3(-100, 200, 0),
      new THREE.Vector3(100, 100, 0),
      new THREE.Vector3(200, 300, 0),
    ];

  const geometry = new THREE.BufferGeometry().setFromPoints(pts);
  const material = new THREE.LineBasicMaterial({ color: 0x00ffff });

  const polyline = new THREE.Line(geometry,material);

  polyline.userData= {
    shapeType: "polyline"
  };

  return polyline;
}

export function createRandomPolyline() {
  return createPolyline();
}
