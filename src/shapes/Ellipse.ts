import * as THREE from "three";

export function createEllipse(
  centerX: number,
  centerY: number,
  rx: number,
  ry: number
) {
  const curve = new THREE.EllipseCurve(
    0, 0,        // IMPORTANT: local space
    rx,
    ry,
    0,
    Math.PI * 2
  );

  const points = curve.getPoints(64);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
  const ellipse = new THREE.LineLoop(geometry, material);

  // 🔑 position is center
  ellipse.position.set(centerX, centerY, 0);

  // 🔑 metadata for UI
  ellipse.userData = {
    shapeType: "ellipse",
    rx,
    ry
  };

  return ellipse;
}

export function createRandomEllipse() {
  return createEllipse(
    Math.random() * 200 - 100,
    Math.random() * 200 - 100,
    Math.random() * 200 + 20,
    Math.random() * 150 + 20
  );
}
