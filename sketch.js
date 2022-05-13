/* IMPORTANT:
 * The entire codebase is made up of bad code,
 * cobbled together without consideration for
 * future expandability, flexibility and
 * modularity. It is also poorly documented and
 * extremely complex.
 *
 * As such,
 * ALL OF THE CODE WILL BE RE-PLANNED
 * AND RE-WRITTEN.
 * 
 * I will do things like:
 * Writing comments while I code
 * Planning the locations of elements
 * Documenting the code
 * Making things simpler
 * Using Git
 * Using Nord, Sublime and 4 space indentation.
 *
 * The snapshot of the original code, from 9 May
 * 2022, is below. The re-written code will aim
 * to replicate the features of the original.
 */

// default values
UIScale = 1;
brushSize = 10;
brushColourID = 0;
palette = [
  "#BF616A",
  "#D08770",
  "#EBCB8B",
  "#A3BE8C",
  "#88C0D0",
  "#81A1C1",
  "#5E81AC",
  "#B48EAD",
];
darkModeColours = ["#2E3440", "#3B4252", "#4C566A", "#D8DEE9"];
lightModeColours = ["#ECEFF4", "#E5E9F0", "#D8DEE9", "#2E3440"];
darkOrLight = 0; // 0 = Dark, 1 = Light
actualColours = darkModeColours;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(actualColours[0]);
  drawUI();
  strokeWeight(brushSize);
  stroke(palette[brushColourID]);
  noFill();
}

function drawUI() {
  push();
  strokeWeight(0);
  fill(actualColours[1]);
  // bottom bar
  rect(0, height - 100 * UIScale, width, 100 * UIScale);
  // circlular colour choosers
  for (i = 0; i < 9; i++) {
    if (i < 8) {
      fill(palette[i]);
      circle(
        (i / 8) * 300 * UIScale + 50 * UIScale,
        height - 50 * UIScale,
        30 * UIScale
      );
    } else {
      fill(actualColours[0]);
      strokeWeight(3);
      stroke(actualColours[3]);
      circle(
        (i / 8) * 300 * UIScale + 50 * UIScale,
        height - 50 * UIScale,
        28.5 * UIScale
      );
    }
  }
  strokeWeight(3 * UIScale);
  noFill();
  stroke(actualColours[0]);
  circle(
    (brushColourID / 9) * 338 * UIScale + 50 * UIScale,
    height - 50 * UIScale,
    20 * UIScale
  );

  // Light/dark mode button
  strokeWeight(0);
  fill(actualColours[2]);
  rect(
    width - 130 * UIScale,
    height - 45 * UIScale,
    110 * UIScale,
    30 * UIScale
  );
  fill(actualColours[3]);
  textSize(15 * UIScale);
  textFont("JetBrains Mono");
  textAlign(CENTER);
  if (darkOrLight == 0) {
    text("Light Mode", width - 75 * UIScale, height - 25 * UIScale);
  } else if (darkOrLight == 1) {
    text("Dark Mode", width - 75 * UIScale, height - 25 * UIScale);
  }

  // Clear All Button
  fill(actualColours[2]);
  rect(
    width - 130 * UIScale,
    height - 85 * UIScale,
    110 * UIScale,
    30 * UIScale
  );
  fill(actualColours[3]);
  textSize(15 * UIScale);
  textFont("JetBrains Mono");
  text("Clear All", width - 75 * UIScale, height - 65 * UIScale);
  //rect()
  //text()
  pop();
}

// OBJECTIVE: Have as less code in here as possible
function draw() {
  if (mouseIsPressed) {
    if (mouseY < height - 100 * UIScale && pmouseY < height - 100 * UIScale) {
      line(mouseX, mouseY, pmouseX, pmouseY);
    } else {
      UIClick(mouseX, mouseY);
    }
  }
}

function UIClick(x, y) {
  if (y < height - 30 * UIScale && y > height - 70 * UIScale) {
    for (i = 0; i < 9; i++) {
      if (
        dist(
          x,
          y,
          (i / 9) * 338 * UIScale + 50 * UIScale,
          height - 50 * UIScale
        ) <
        15 * UIScale
      ) {
        brushColourID = i;
        drawUI();
      }
    }
  }
  if (x > width - 130 * UIScale && x < width - 20 * UIScale) {
    if (y > height - 85 * UIScale && y < height - 55 * UIScale) {
      // Clear All
      background(actualColours[0]);
      drawUI();
    } else if (y > height - 45 * UIScale && y < height - 15 * UIScale) {
      // Light/dark mode
      if (darkOrLight == 0) {
        darkOrLight = 1;
        actualColours = lightModeColours;
      } else if (darkOrLight == 1) {
        darkOrLight = 0;
        actualColours = darkModeColours;
      }
    }
    background(actualColours[0]);
    drawUI();
  }
  strokeWeight(brushSize);
  if (brushColourID < 8) {
    stroke(palette[brushColourID]);
  } else {
    stroke(actualColours[0]);
  }
}
