// // src/ui/Toolbar/ToolbarUI.ts
// export function initToolbar(container: HTMLElement, onToolSelect: (tool: string) => void) {
//   const dropdown = document.createElement("select");

//   const defaultOption = document.createElement("option");
//   defaultOption.value = "";
//   defaultOption.textContent = "Select Tool";
//   dropdown.appendChild(defaultOption);

//   ["line", "circle", "ellipse", "polyline"].forEach((tool) => {
//     const option = document.createElement("option");
//     option.value = tool;
//     console.log(option);
//     option.textContent = tool.charAt(0).toUpperCase() + tool.slice(1);
//     dropdown.appendChild(option);
//   });

//   dropdown.addEventListener("change", () => {
//     onToolSelect(dropdown.value);
//     dropdown.value = ""; // reset selection
//     console.log("ans",onToolSelect);
//   });

//   container.appendChild(dropdown);
// }
