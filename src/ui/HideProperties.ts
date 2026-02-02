export function hideAllProperties() {
  const ids = [
    "linear-ui",
    "circle-ui",
    "ellipse-ui",
  ];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}
