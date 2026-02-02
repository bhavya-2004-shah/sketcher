// src/main.ts
import './style.css';
import { rendererFunction, startRenderer } from './engine/Renderer';
import { initMouseHandler, setActiveTool } from './interactions/MouseHandler';
import {  initToolbar , initAction} from './ui/ToolBar';
import { initSelection } from './interactions/SelectionHandler';
import { saveCanvas } from "./interactions/Save";
import { loadCanvas } from './interactions/Upload';
import { initLeftPanel } from "./ui/LeftPanel";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
const toolbarContainer = document.getElementById("toolbar-container");

if (!canvas || !toolbarContainer) throw new Error("Canvas or toolbar not found");

initLeftPanel();

rendererFunction(canvas);
startRenderer();

let currentAction: "draw" | "select" | "" = "";


initAction((action) => {
  currentAction = action;       
  console.log("Current action:", currentAction);
  if (currentAction === "draw") {
    console.log("Drawing mode ON");
  } else if (currentAction === "select") {
    console.log("Selection mode ON");
  }
});

//Dropdown 
initToolbar((tool) => {
  setActiveTool(tool as "polyline" |"line" | "circle" | "ellipse"| null);
});




initMouseHandler(canvas , () => currentAction === 'draw');
initSelection(canvas ,() => currentAction === 'select');



/* ================= SAVE ================= */
document.getElementById("saveCanvas")?.addEventListener("click", () => {
  const json = saveCanvas();

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "canvas.json";
  a.click();

  URL.revokeObjectURL(url);
});

/* ================= LOAD ================= */
document.getElementById("uploadCanvas")?.addEventListener("change", (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    loadCanvas(reader.result as string);
  };
  reader.readAsText(file);
});
