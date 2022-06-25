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
  // TODO: Paste a picture of the active stamp shape on the icon
  rect(20, -5, 10, 10);
  quad(30, -5, 30, 5, 45, 10, 45, -10);
  rect(45, -10, 35, 20);
  pop();

  // Colour selectors
  push();
  strokeWeight(0);
  for (i = 0; i < 8; i++) {
    fill(brushColours[i]);
    circle((i % 4) * 30 + 30, height - 30 * Math.floor(i / 4) - 35, 24);
  }
  strokeWeight(3);
  stroke(activeUIColours[0]);
  fill(0, 0, 0, 0);
  circle(
    (activeBrushColours[activeBrushID] % 4) * 30 + 30,
    height - 30 * Math.floor(activeBrushColours[activeBrushID] / 4) - 35,
    16
  );
  pop();

  // Brush size selector
  push();
  strokeWeight(0);
  fill(activeUIColours[1]);
  circle(175, height - 38, 20);
  rect(190, height - 50, 40, 24, 2);
  circle(245, height - 38, 20);
  textFont("Inter");
  textSize(17);
  textAlign(CENTER);
  fill(activeUIColours[3]);
  text("Size", 210, height - 60);
  text(brushSizes[activeBrushID], 210, height - 32);
  text("-", 175, height - 33);
  text("+", 245, height - 33);
  pop();

  // Setting the variables (yes this isn't really part of "drawing UI")
  if (activeBrushID == 0) {
    stroke(brushColours[activeBrushColours[activeBrushID]]);
    strokeWeight(brushSizes[activeBrushID]);
  } else if (activeBrushID == 1) {
    strokeWeight(0);
    fill(brushColours[activeBrushColours[activeBrushID]]);
  }
}

function setup() {
  // Setting the default values
  activeBrushColours = [0, 0, 0];
  activeBrushID = 0;
  brushSizes = [10, 10];
  UITheme = "dark";
  activeUIColours = UIColours[UITheme];

  // Creating the canvas
  createCanvas(windowWidth - 80, windowHeight - 80);
  fill(activeUIColours[0]);
  strokeWeight(0);
  rect(0, 0, width, height, 10);

  // Drawing the UI
  drawUI();
}

function draw() {
  if (
    mouseIsPressed &&
    mouseY < height - 100 &&
    pmouseY < height - 100 &&
    mouseX < width - 100 &&
    pmouseX < width - 100 &&
    mouseButton == LEFT
  ) {
    if (activeBrushID == 0) {
      line(mouseX, mouseY, pmouseX, pmouseY);
    } else if (activeBrushID == 1) {
      circle(mouseX, mouseY, brushSizes[1]);
    }
  }
}

function mousePressed() {
  // Detecting is mouse is in the drawing area
  if (mouseX >= width - 80 && mouseY >= 80 && mouseY <= 180) {
    activeBrushID = Math.round((mouseY - 100) / 60);
    drawUI();
    if (activeBrushID == 0) {
      stroke(brushColours[activeBrushColours[activeBrushID]]);
      strokeWeight(brushSizes[activeBrushID]);
    } else if (activeBrushID == 1) {
      strokeWeight(0);
      fill(brushColours[activeBrushColours[activeBrushID]]);
    }
  }
  // Colour selectors
  else if (
    mouseX >= 15 &&
    mouseX <= 135 &&
    mouseY >= height - 77 &&
    mouseY <= height - 23
  ) {
    if (mouseY > height - 50) {
      activeBrushColours[activeBrushID] = Math.round((mouseX - 30) / 30);
    } else {
      activeBrushColours[activeBrushID] = Math.round((mouseX - 30) / 30) + 4;
    }
    drawUI();
  }
  // Size reducing button
  else if (
    dist(mouseX, mouseY, 175, height - 38) <= 20 &&
    brushSizes[activeBrushID] > 1
  ) {
    brushSizes[activeBrushID]--;
    drawUI();
    }
  // Size increasing button
  else if (
    dist(mouseX, mouseY, 245, height - 38) <= 20 &&
    brushSizes[activeBrushID] < 100
  ) {
    brushSizes[activeBrushID]++;
    drawUI();
  }
}
