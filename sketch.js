/* Nordic Paint v0.0.0 June 25, 2022 */

// Default constants, feel free to change
const brushColours = [
  "#BF616A",
  "#D08770",
  "#EBCB8B",
  "#A3BE8C",
  "#88C0D0",
  "#81A1C1",
  "#5E81AC",
  "#B48EAD",
];
const UIColours = {
  dark: ["#2E3440", "#4C566A", "#3B4252", "#D8DEE9"],
  light: ["#ECEFF4", "#E5E9F0", "#D8DEE9", "#2E3440"],
};

let activeBrushID, UITheme, activeUIColours, activeBrushColours, brushSizes;

function drawUI() {
  // Side bar
  push();
  strokeWeight(0);
  fill(activeUIColours[2]);
  rect(width - 100, 50, 110, 160, 10);
  pop();

  // Bottom bar
  push();
  strokeWeight(0);
  fill(activeUIColours[2]);
  rect(0, height - 100, width, 100);
  pop();

  // Brush 0: Pen
  push();
  strokeWeight(0);
  if (activeBrushID == 0) {
    translate(width - 80, 100);
  } else {
    translate(width - 60, 100);
  }
  fill(brushColours[activeBrushColours[0]]);
  triangle(0, 0, 15, 5, 15, -5);
  fill(activeUIColours[3]);
  quad(15, -5, 15, 5, 30, 10, 30, -10);
  fill(brushColours[activeBrushColours[0]]);
  rect(30, -10, 5, 20);
  fill(activeUIColours[3]);
  rect(35, -10, 45, 20);
  pop();

  // Brush 1: Stamp
  push();
  strokeWeight(0);
  if (activeBrushID == 1) {
    translate(width - 80, 160);
  } else {
    translate(width - 60, 160);
  }
  fill(brushColours[activeBrushColours[1]]);
  rect(0, -10, 5, 20);
  fill(activeUIColours[3]);
  rect(5, -10, 10, 20);
  quad(15, -10, 15, 10, 20, 5, 20, -5);
  
