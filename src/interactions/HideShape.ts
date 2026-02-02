import * as THREE from 'three';
import { shapeManager } from '../managers/ShapeManager';



export function hideShape(shape?: THREE.Object3D){
  const obj = shape || shapeManager.getSelected();
  if(!obj) return;

  // toggle visibility
  obj.visible = !obj.visible;


  const item = obj.userData.leftItem as HTMLDivElement | undefined;
  console.log("item is here",item)
  if(item){
    item.style.opacity = obj.visible ? "1" : "0.5";
  }

  // sync RIGHT panel button
  const hideBtn = document.getElementById("hideCircle") as HTMLButtonElement;
  if(hideBtn){
    hideBtn.textContent = obj.visible ? "Hide" : "Show";
  }

  const hideBtnLine = document.getElementById("hideLine") as HTMLButtonElement;
  if(hideBtn){
    hideBtnLine.textContent = obj.visible ? "Hide" : "Show";
  }


  console.log(`Shape ${obj.uuid} is now ${obj.visible ? "visible" : "hidden"}`);
}

export function initHideButton() {

    const hideButton = document.getElementById("hideButton") as HTMLButtonElement;

    if(!hideButton) return ; 

    hideButton.addEventListener("click", () => {
        hideShape()
    })
}