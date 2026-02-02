import * as THREE from "three";
import { getScene } from "../engine/Renderer";
import { shapeManager } from "../managers/ShapeManager";
import { createLine } from "../shapes/Line";
import { createCircle } from "../shapes/Circle";
import { createEllipse } from "../shapes/Ellipse";
import { createPolyline } from "../shapes/PolyLine";
import { getWorldPoint } from "./RaycastHelper";
import { addObjectToLeftPanel } from "../ui/LeftPanel";

type Tool = "line" | "circle" | "ellipse" | "polyline" | null;

let activeTool: Tool = null;
let isDrawing = false;

/* ---------- LINE ---------- */
let lineStart: THREE.Vector3 | null = null;
let previewLine: THREE.Line | null = null;

/* ---------- CIRCLE ---------- */
let circleCenter: THREE.Vector3 | null = null;
let previewCircle: THREE.Mesh | null = null;

/* ---------- ELLIPSE ---------- */
let ellipseCenter: THREE.Vector3 | null = null;
let previewEllipse: THREE.Line | null = null;

/* ---------- POLYLINE ---------- */
let polyPoints: THREE.Vector3[] = [];
let previewPolyline: THREE.Line | null = null;
let polylineDrawing = false;

/* ---------------- TOOL SELECTION ---------------- */
export function setActiveTool(tool: Tool) {
  activeTool = tool;

  // reset polyline when tool changes
  polyPoints = [];
  polylineDrawing = false;
  if (previewPolyline) {
    getScene().remove(previewPolyline);
    previewPolyline = null;
  }
}



/* ---------------- MOUSE HANDLER ---------------- */
export function initMouseHandler(canvas: HTMLCanvasElement , drawEnable: () => boolean) {

  /* ---------- MOUSE DOWN ---------- */
  canvas.addEventListener("mousedown", (event) => {
    if(!drawEnable()) return ;
    if (!activeTool) return;

    const p = getWorldPoint(event, canvas);

    /* ---- POLYLINE (LEFT CLICK) ---- */
    if (activeTool === "polyline" && event.button === 0) {
      polylineDrawing = true;
      polyPoints.push(p);

      if (previewPolyline) {
        getScene().remove(previewPolyline);
      }

      previewPolyline = createPolyline([...polyPoints]);
      getScene().add(previewPolyline);
      return;
    }

    /* ---- OTHER TOOLS ---- */
    if (event.button !== 0) return;

    isDrawing = true;

    if (activeTool === "line") {
      lineStart = p;
      previewLine = createLine(p, p.clone());
      getScene().add(previewLine);
    }

    if (activeTool === "circle") {
      circleCenter = p;
      previewCircle = createCircle(p, 0.001);
      getScene().add(previewCircle);
    }

    if (activeTool === "ellipse") {
      ellipseCenter = p;
      previewEllipse = createEllipse(p.x, p.y, 0.001, 0.001);
      getScene().add(previewEllipse);
    }
  });

  /* ---------- MOUSE MOVE ---------- */
  canvas.addEventListener("mousemove", (event) => {
    const p = getWorldPoint(event, canvas);

    /* ---- POLYLINE PREVIEW ---- */
    if (activeTool === "polyline" && polylineDrawing && polyPoints.length > 0) {
      const tempPoints = [...polyPoints, p];

      if (previewPolyline) {
        previewPolyline.geometry.dispose();
        previewPolyline.geometry = new THREE.BufferGeometry().setFromPoints(tempPoints);
      }
      return;
    }

    if (!isDrawing) return;

    if (activeTool === "line" && previewLine && lineStart) {
      previewLine.geometry.dispose();
      previewLine.geometry = new THREE.BufferGeometry().setFromPoints([
        lineStart,
        p,
      ]);
    }

    if (activeTool === "circle" && previewCircle && circleCenter) {
      const r = circleCenter.distanceTo(p);
      previewCircle.geometry.dispose();
      previewCircle.geometry = createCircle(circleCenter, r).geometry;
    }

    if (activeTool === "ellipse" && previewEllipse && ellipseCenter) {
      const rx = Math.abs(p.x - ellipseCenter.x);
      const ry = Math.abs(p.y - ellipseCenter.y);

      previewEllipse.geometry.dispose();
      previewEllipse.geometry = createEllipse(
        ellipseCenter.x,
        ellipseCenter.y,
        rx,
        ry
      ).geometry;
    }
  });

  /* ---------- MOUSE UP ---------- */
  canvas.addEventListener("mouseup", (event) => {
    if (!isDrawing) return;

    const p = getWorldPoint(event, canvas);

    if (activeTool === "line" && lineStart && previewLine) {
      const line = createLine(lineStart, p);
      getScene().add(line);
      
      shapeManager.register(line);
      getScene().remove(previewLine);
      addObjectToLeftPanel(line);
      previewLine = null;
      lineStart = null;
    }

    if (activeTool === "circle" && circleCenter && previewCircle) {
      const r = circleCenter.distanceTo(p);
      const circle = createCircle(circleCenter, r);
      getScene().add(circle);
      addObjectToLeftPanel(circle);

      shapeManager.register(circle);
      getScene().remove(previewCircle);
      previewCircle = null;
      circleCenter = null;
    }

    if (activeTool === "ellipse" && ellipseCenter && previewEllipse) {
      const rx = Math.abs(p.x - ellipseCenter.x);
      const ry = Math.abs(p.y - ellipseCenter.y);

      const ellipse = createEllipse(
        ellipseCenter.x,
        ellipseCenter.y,
        rx,
        ry
      );

      getScene().add(ellipse);
      addObjectToLeftPanel(ellipse);

      shapeManager.register(ellipse);
      getScene().remove(previewEllipse);
      previewEllipse = null;
      ellipseCenter = null;
    }

    isDrawing = false;
  });

  canvas.addEventListener("contextmenu", (event) => {
  if (activeTool !== "polyline" || !polylineDrawing) return;

  event.preventDefault();

  if (polyPoints.length > 1 && previewPolyline) {
         addObjectToLeftPanel(previewPolyline)

    shapeManager.register(previewPolyline);
    previewPolyline = null;
    
  }
  // addObjectToLeftPanel(polyline);

  polyPoints = [];
  polylineDrawing = false;
});

}
