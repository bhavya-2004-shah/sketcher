import * as THREE from "three";


export function createRandomCircle() {
  const radius = Math.random() * 150;
  const center = new THREE.Vector3(
    Math.random() * 200 - 100,
    Math.random() * 200 - 100,
    0
  );

  return createCircle(center, radius);
}




export function createCircle(
  center: THREE.Vector3,
  radius: number,
  segments = 64
) {
  const geometry = new THREE.CircleGeometry(radius, segments);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide
  });

  const circle = new THREE.Mesh(geometry, material);

  
  circle.position.copy(center);


  circle.userData = {
    shapeType: "circle",
    radius,
    segments
  };

  return circle;
}
