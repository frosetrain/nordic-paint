/* Nordic Paint v0.0.0 June 4, 2022 */

// Default constants, feel free to change
const UIScale = 1;
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

let activeBrushID,
  brushSize,
  UITheme,
  activeUIColours,
  paintingBorder,
  activeBrushColours;

function drawUI() {
  // Bottom bar
  push();
  strokeWeight(0);
  fill(activeUIColours[2]);
  rect(0, height - 100 * UIScale, width, 100 * UIScale);
  pop();

  // Brush 0: Pen
  push();
  strokeWeight(0);

  if (activeBrushID == 0) {
    translate(50 * UIScale, height - 80 * UIScale);
  } else {
    translate(50 * UIScale, height - 60 * UIScale);
  }

  fill(brushColours[activeBrushColours[activeBrushID]]);
  triangle(
    0,
    0 * UIScale,
    5 * UIScale,
    15 * UIScale,
    -5 * UIScale,
    15 * UIScale
  );
  fill(activeUIColours[3]);
  quad(
    -5 * UIScale,
    15 * UIScale,
    5 * UIScale,
    15 * UIScale,
    10 * UIScale,
    30 * UIScale,
    -10 * UIScale,
    30 * UIScale
  );
  fill(brushColours[activeBrushColours[activeBrushID]]);
  rect(-10 * UIScale, 30 * UIScale, 20 * UIScale, 5 * UIScale);
  fill(activeUIColours[3]);
  rect(-10 * UIScale, 35 * UIScale, 20 * UIScale, 45 * UIScale);

  pop();

  // Brush 1: Stamp
  push();
  strokeWeight(0);

  if (activeBrushID == 1) {
    translate(110 * UIScale, height - 80 * UIScale);
  } else {
    translate(110 * UIScale, height - 60 * UIScale);
  }
  fill(brushColours[activeBrushColours[activeBrushID]]);
  rect(-10 * UIScale, 0 * UIScale, 20 * UIScale, 5 * UIScale);
  fill(activeUIColours[3]);
  rect(-10 * UIScale, 5 * UIScale, 20 * UIScale, 10 * UIScale);
  quad(
    -10 * UIScale,
    15 * UIScale,
    10 * UIScale,
    15 * UIScale,
    5 * UIScale,
    20 * UIScale,
    -5 * UIScale,
    20 * UIScale
  );
  // TODO: Paste a picture of the active stamp shape on the icon
  rect(-5 * UIScale, 20 * UIScale, 10 * UIScale, 10 * UIScale);
  quad(
    -5 * UIScale,
    30 * UIScale,
    5 * UIScale,
    30 * UIScale,
    10 * UIScale,
    45 * UIScale,
    -10 * UIScale,
    45 * UIScale
  );
  rect(-10 * UIScale, 45 * UIScale, 20 * UIScale, 35 * UIScale);

  pop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Setting the default values
  activeBrushColours = [0, 0, 0];
  activeBrushID = 0;
  brushSize = 10;
  UITheme = "dark";
  activeUIColours = UIColours[UITheme];
  paintingBorder = height - 100 * UIScale;

  // Setting up the canvas
  background(activeUIColours[0]);

  // Applying the variables to the brush
  stroke(brushColours[activeBrushColours[activeBrushID]]);
  strokeWeight(brushSize);

  // Drawing the UI
  drawUI();

  // The code is ready to go!
}

function draw() {
  if (
    mouseIsPressed &&
    mouseY < paintingBorder &&
    pmouseY < paintingBorder &&
    mouseButton == LEFT
  ) {
    if (activeBrushID == 0) {
      line(mouseX, mouseY, pmouseX, pmouseY);
    } else if (activeBrushID == 1) {
      circle(mouseX, mouseY, brushSize / 2)
    }
  }
}

function mousePressed() {
  if (mouseX >= 20 && mouseX <= 120 && mouseY >= height - 80) {
    activeBrushID = Math.round((mouseX - 50) / 60);
    drawUI()
  }
}

