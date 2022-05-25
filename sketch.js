/* Nordic Paint v0.0.0 May 23, 2022 */

// Default values, feel free to change
UIScale = 1;
brushColours = [
  "#BF616A",
  "#D08770",
  "#EBCB8B",
  "#A3BE8C",
  "#88C0D0",
  "#81A1C1",
  "#5E81AC",
  "#B48EAD",
];
UIColours = {
  dark: ["#2E3440", "#3B4252", "#4C566A", "#D8DEE9"],
  light: ["#ECEFF4", "#E5E9F0", "#D8DEE9", "#2E3440"],
};

function drawUI() {
  push();

  // Bottom bar
  strokeWeight(0);
  fill(actualUIColours[1]);
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
  actualUIColours = UIColours[UITheme];
  paintingBorder = height - 100 * UIScale

  // Setting up the canvas
  background(actualUIColours[0]);
  drawUI();
  
  // Applying the variables to the brush
  stroke(brushColours[brushColourID]);
  strokeWeight(brushSize)
  
  // The code is ready to go!
}

function draw() {
  if (mouseIsPressed && mouseY < paintingBorder && pmouseY < paintingBorder && mouseButton == LEFT) {
    line(mouseX, mouseY, pmouseX, pmouseY)
  }
}

function mousePressed() {
  
}

// TODO: saveCanvas()
