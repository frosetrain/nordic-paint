/* Nordic Paint v0.0.0 June 23, 2022 */

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

let activeBrushID, UITheme, activeUIColours, activeBrushColours, brushSizes;

function drawUI() {
  // Side bar
  push();
  strokeWeight(0);
  fill(activeUIColours[2]);
  rect(
    width - 100 * UIScale,
    50 * UIScale,
    110 * UIScale,
    160 * UIScale,
    10 * UIScale
  );
  pop();

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
    translate(width - 80 * UIScale, 100 * UIScale);
  } else {
    translate(width - 60 * UIScale, 100 * UIScale);
  }
  fill(brushColours[activeBrushColours[activeBrushID]]);
  triangle(0, 0, 15 * UIScale, 5 * UIScale, 15 * UIScale, -5 * UIScale);
  fill(activeUIColours[3]);
  quad(
    15 * UIScale,
    -5 * UIScale,
    15 * UIScale,
    5 * UIScale,
    30 * UIScale,
    10 * UIScale,
    30 * UIScale,
    -10 * UIScale
  );
  fill(brushColours[activeBrushColours[activeBrushID]]);
  rect(30 * UIScale, -10 * UIScale, 5 * UIScale, 20 * UIScale);
  fill(activeUIColours[3]);
  rect(35 * UIScale, -10 * UIScale, 45 * UIScale, 20 * UIScale);
  pop();

  // Brush 1: Stamp
  push();
  strokeWeight(0);
  if (activeBrushID == 1) {
    translate(width - 80 * UIScale, 160 * UIScale);
  } else {
    translate(width - 60 * UIScale, 160 * UIScale);
  }
  fill(brushColours[activeBrushColours[activeBrushID]]);
  rect(0 * UIScale, -10 * UIScale, 5 * UIScale, 20 * UIScale);
  fill(activeUIColours[3]);
  rect(5 * UIScale, -10 * UIScale, 10 * UIScale, 20 * UIScale);
  quad(
    15 * UIScale,
    -10 * UIScale,
    15 * UIScale,
    10 * UIScale,
    20 * UIScale,
    5 * UIScale,
    20 * UIScale,
    -5 * UIScale
  );
  // TODO: Paste a picture of the active stamp shape on the icon
  rect(20 * UIScale, -5 * UIScale, 10 * UIScale, 10 * UIScale);
  quad(
    30 * UIScale,
    -5 * UIScale,
    30 * UIScale,
    5 * UIScale,
    45 * UIScale,
    10 * UIScale,
    45 * UIScale,
    -10 * UIScale
  );
  rect(45 * UIScale, -10 * UIScale, 35 * UIScale, 20 * UIScale);
  pop();

  // Colour selectors
  push();
  strokeWeight(0);
  for (i = 0; i < 8; i++) {
    fill(brushColours[i]);
    circle(
      (i % 4) * 30 + 30 * UIScale,
      height - 30 * Math.floor(i / 4) - 35 * UIScale,
      24 * UIScale
    );
  }
  pop();
}

function setup() {
  createCanvas(windowWidth - 80, windowHeight - 80);

  // Setting the default values
  activeBrushColours = [0, 0, 0];
  activeBrushID = 0;
  brushSizes = [10, 10];
  UITheme = "dark";
  activeUIColours = UIColours[UITheme];

  // Setting up the canvas
  fill(activeUIColours[0]);
  strokeWeight(0);
  rect(0, 0, width, height, 10);

  // Applying the variables to the brush
  stroke(brushColours[activeBrushColours[activeBrushID]]);
  strokeWeight(brushSizes[activeBrushID]);

  // Drawing the UI
  drawUI();

  // The code is ready to go!
}

function draw() {
  if (
    mouseIsPressed &&
    mouseY < height - 100 * UIScale &&
    pmouseY < height - 100 * UIScale &&
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
  if (
    mouseX >= width - 80 * UIScale &&
    mouseY >= 80 * UIScale &&
    mouseY <= 180 * UIScale
  ) {
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
}
