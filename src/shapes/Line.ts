import * as THREE from 'three';

export function createLine(
  start: THREE.Vector3,
  end: THREE.Vector3
) {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    start,
    end,
  ]);

  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });

  const line = new THREE.Line(geometry, material);

 
  line.userData = {
    shapeType: "line",  
  };

  return line;
}





export function createRandomLine() {
  const random = () => Math.random() * 600 ;

  return createLine(
    new THREE.Vector3(random(), random(), 0),
    new THREE.Vector3(random(), random(), 0)
  );
}


