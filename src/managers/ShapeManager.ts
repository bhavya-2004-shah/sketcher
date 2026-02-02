import * as THREE from "three";

type Listener = () => void;

class ShapeManager {
  private shapes: THREE.Object3D[] = [];
  private selected: THREE.Object3D | null = null;
  private listeners: Listener[] = [];

  /* ---------- LISTENERS ---------- */
  subscribe(fn: Listener) {
    this.listeners.push(fn);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  /* ---------- SHAPES ---------- */
  register(shape: THREE.Object3D) {
    this.shapes.push(shape);
    this.notify();
  }

  remove(shape: THREE.Object3D) {
    this.shapes = this.shapes.filter(s => s !== shape);
    if (this.selected === shape) this.selected = null;
    this.notify();
  }

  clear() {
    this.shapes = [];
    this.selected = null;
    this.notify();
  }

  getAll() {
    return this.shapes;
  }

  select(shape: THREE.Object3D | null) {
    this.selected = shape;
    this.notify();
  }

  getSelected() {
    return this.selected;
  }
  reset() {
  this.selected = null;
  this.notify();
}

  toggleVisibility(shape?: THREE.Object3D) {
    const obj = shape || this.selected;
    if (!obj) return;
    obj.visible = !obj.visible;
    this.notify();
  }
}

export const shapeManager = new ShapeManager();
