/* Nordic Paint v0.0.0 May 23, 2022 */

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
  dark: ["#2E3440", "#3B4252", "#4C566A", "#D8DEE9"],
  light: ["#ECEFF4", "#E5E9F0", "#D8DEE9", "#2E3440"],
};

let brushColourID, brushSize, UITheme, activeUIColours, paintingBorder;

function drawUI() {
  push();

  // Bottom bar
  strokeWeight(0);
  fill(activeUIColours[1]);
  rect(0, height - 100 * UIScale, width, 100 * UIScale);

  // TODO: Make brushes

  pop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set the default values
  brushColourID = 0;
  brushSize = 10;
  UITheme = "dark";
  activeUIColours = UIColours[UITheme];
  paintingBorder = height - 100 * UIScale;

  // Setting up the canvas
  background(activeUIColours[0]);
  drawUI();

  // Applying the variables to the brush
  stroke(brushColours[brushColourID]);
  strokeWeight(brushSize);

  // The code is ready to go!
}

function draw() {
  if (
    mouseIsPressed &&
    mouseY < paintingBorder &&
    pmouseY < paintingBorder &&
    mouseButton == LEFT
  ) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mousePressed() {}

// TODO: saveCanvas()
