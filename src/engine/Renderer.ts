import * as THREE from "three";

let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;

export function rendererFunction(canvas: HTMLCanvasElement) {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const width = window.innerWidth;
  const height = window.innerHeight;

  // Orthographic camera for XY plane
  camera = new THREE.OrthographicCamera(
    -width / 2,
     width / 2,
     height / 2,
    -height / 2,
    -100,
     100
  );

  camera.position.set(0, 0, 10); // looking towards XY plane
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(width, height);

  window.addEventListener("resize", onResize);
}

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.left = -width / 2;
  camera.right = width / 2;
  camera.top = height / 2;
  camera.bottom = -height / 2;

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

export function startRenderer() {
  render();
}

export function getScene() {
  return scene;
}

export function getCamera() {
  return camera;
}
