/* Nordic Paint v0.0.0 July 3, 2022 */

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
const brushNames = ["Pen", "Stamp", "Path", "Eraser"];
const brushKeybinds = ["q", "w", "e", "r"];

let activeBrushID,
  UITheme,
  activeUIColours,
  activeBrushColours,
  brushSizes,
  shakyHand,
  stampShape,
  previousClickX,
  previousClickY;

function preload() {
  // rickImage = loadImage("assets/images/rick.jpg");
  rickImage = loadImage(
    "https://raw.githubusercontent.com/frosetrain/nordic-paint/main/assets/images/rick.jpg"
  );
}

function drawUI() {
  // Top bar
  push();
  strokeWeight(0);
  fill(activeUIColours[2]);
  rect(0, 0, width, 50, 10);
  fill(activeUIColours[0]);
  rect(0, 40, width, 10);
  fill(activeUIColours[3]);
  textAlign(CENTER);
  textFont("Inter");
  textSize(16);
  text("Nordic Paint", width / 2, 26);
  fill(activeUIColours[1]);
  circle(width - 20, 20, 25);
  fill(activeUIColours[3]);
  text("?", width - 20, 25);
  pop();

  // Side bar
  push();
  strokeWeight(0);
  fill(activeUIColours[2]);
  rect(width - 100, 50, 110, 250, 10);
  fill(activeUIColours[0]);
  rect(width - 100, 300, 100, 25);
  textAlign(CENTER);
  textFont("Inter");
  textSize(15);
  fill(activeUIColours[3]);
  text(brushNames[activeBrushID], width - 50, 320);
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
  if (activeBrushID === 0) {
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
  if (activeBrushID === 1) {
    translate(width - 80, 150);
  } else {
    translate(width - 60, 150);
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

  // Brush 2: Path
  push();
  strokeWeight(0);
  if (activeBrushID === 2) {
    translate(width - 80, 200);
  } else {
    translate(width - 60, 200);
  }
  rectMode(CENTER);
  fill(brushColours[activeBrushColours[2]]);
  square(0, 0, 8);
  square(20, 6, 8);
  square(45, -6, 8);
  stroke(brushColours[activeBrushColours[2]]);
  strokeWeight(2);
  line(0, 0, 20, 4);
  line(20, 6, 45, -6);
  line(45, -6, 80, 0);
  pop();

  // Brush 3: Eraser
  push();
  strokeWeight(0);
  if (activeBrushID === 3) {
    translate(width - 80, 250);
  } else {
    translate(width - 60, 250);
  }
  fill(brushColours[0]);
  rect(0, -10, 20, 20, 2);
  fill(activeUIColours[3]);
  rect(15, -10, 65, 20);
  pop();

  // Colour selectors
  if (activeBrushID != 3) {
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
  }

  // Brush size selector
  push();
  if (activeBrushID != 3) {
    translate(160, 0);
  } else {
    translate(20, 0);
  }
  strokeWeight(0);
  fill(activeUIColours[1]);
  circle(15, height - 38, 20);
  rect(30, height - 50, 40, 24, 2);
  circle(85, height - 38, 20);
  textFont("Inter");
  textSize(17);
  textAlign(CENTER);
  fill(activeUIColours[3]);
  text("Size", 50, height - 60);
  text(brushSizes[activeBrushID], 50, height - 32);
  text("-", 15, height - 33);
  text("+", 85, height - 33);
  pop();

  // Shaky hand toggle
  if (activeBrushID === 0) {
    push();
    translate(280, 0);
    strokeWeight(0);
    fill(activeUIColours[1]);
    circle(15, height - 38, 20);
    rect(30, height - 50, 40, 24, 2);
    circle(85, height - 38, 20);
    textFont("Inter");
    textSize(17);
    textAlign(CENTER);
    fill(activeUIColours[3]);
    text("Shaky Hand", 50, height - 60);
    text("-", 15, height - 33);
    text("+", 85, height - 33);
    text(shakyHand, 50, height - 32);
    pop();
  }

  // Stamp shape chooser
  if (activeBrushID === 1) {
    push();
    translate(280, 0);
    strokeWeight(0);
    fill(activeUIColours[1]);
    circle(15, height - 38, 20);
    rect(30, height - 50, 40, 24, 2);
    circle(85, height - 38, 20);
    textFont("Inter");
    textSize(17);
    textAlign(CENTER);
    fill(activeUIColours[3]);
    text("Shape", 50, height - 60);
    text("<", 15, height - 33);
    text(">", 85, height - 33);
    switch (stampShape) {
      case 0:
        circle(50, height - 38, 13);
        break;
      case 1:
        triangle(
          50,
          height - 43,
          50 - 13 * 0.6,
          height - 30,
          50 + 13 * 0.6,
          height - 30
        );
        break;
      case 2:
        square(44, height - 44, 13);
        break;
      case 3:
        image(rickImage, 44, height - 44, 13, 13);
        break;
    }
    pop();
  }

  // Clear canvas button and dark/light mode button
  push();
  strokeWeight(0);
  fill(activeUIColours[1]);
  rect(width - 120, height - 80, 100, 25);
  rect(width - 120, height - 45, 100, 25);
  fill(activeUIColours[3]);
  textAlign(CENTER);
  textFont("Inter");
  textSize(16);
  text("Clear", width - 70, height - 62);
  if (UITheme === "dark") {
    text("Light Mode", width - 70, height - 28);
  } else if (UITheme === "light") {
    text("Dark Mode", width - 70, height - 28);
  }
  pop();

  // Setting the variables (yes this isn't really part of "drawing UI")
  switch (activeBrushID) {
    case 0:
      stroke(brushColours[activeBrushColours[activeBrushID]]);
      strokeWeight(brushSizes[activeBrushID]);
      break;
    case 1:
      strokeWeight(0);
      fill(brushColours[activeBrushColours[activeBrushID]]);
      break;
    case 2:
      strokeWeight(brushSizes[activeBrushID] / 2);
      fill(brushColours[activeBrushColours[activeBrushID]]);
      stroke(brushColours[activeBrushColours[activeBrushID]]);
      break;
    case 3:
      stroke(activeUIColours[0]);
      strokeWeight(brushSizes[activeBrushID]);
      break;
  }
}

function setup() {
  // Setting the default values
  angleMode(DEGREES);
  activeBrushColours = [0, 0, 0, 0, 0];
  activeBrushID = 0;
  brushSizes = [10, 10, 10, 10, 10];
  UITheme = "dark";
  activeUIColours = UIColours[UITheme];
  stampShape = 0;
  shakyHand = 0;

  // Creating the canvas
  createCanvas(windowWidth - 80, windowHeight - 80);
  fill(activeUIColours[0]);
  strokeWeight(0);
  rect(0, 0, width, height, 10);

  // Drawing the UI
  drawUI();
}

function draw() {
  // Detecting if the mouse is within the drawing boundaries
  if (
    mouseIsPressed &&
    mouseY < height - 100 &&
    pmouseY < height - 100 &&
    mouseX < width - 100 &&
    pmouseX < width - 100 &&
    mouseY > 40 &&
    pmouseY > 40 &&
    mouseButton === LEFT
  ) {
    switch (activeBrushID) {
      case 0:
        if (shakyHand > 0) {
          line(
            mouseX + random(-shakyHand * 2, shakyHand * 2),
            mouseY + random(-shakyHand * 2, shakyHand * 2),
            pmouseX,
            pmouseY
          );
        } else {
          line(mouseX, mouseY, pmouseX, pmouseY);
        }
        break;
      case 1:
        switch (stampShape) {
          case 0:
            circle(mouseX, mouseY, brushSizes[activeBrushID]);
            break;
          case 1:
            triangle(
              mouseX,
              mouseY - brushSizes[activeBrushID],
              mouseX - brushSizes[activeBrushID] * 0.6,
              mouseY,
              mouseX + brushSizes[activeBrushID] * 0.6,
              mouseY
            );
            break;
          case 2:
            square(mouseX, mouseY, brushSizes[activeBrushID]);
            break;
          case 3:
            image(
              rickImage,
              mouseX,
              mouseY,
              brushSizes[activeBrushID],
              brushSizes[activeBrushID]
            );
            break;
        }
        break;
      // case 2 isn't here because it's handled in mousePressed()
      case 3:
        line(mouseX, mouseY, pmouseX, pmouseY);
        break;
    }
  }
}

function mousePressed() {
  // Path brush
  if (
    mouseY < height - 100 &&
    pmouseY < height - 100 &&
    mouseX < width - 100 &&
    pmouseX < width - 100 &&
    mouseY > 40 &&
    pmouseY > 40 &&
    mouseButton === LEFT &&
    activeBrushID === 2
  ) {
    square(mouseX, mouseY, brushSizes[activeBrushID] / 2);
    line(mouseX, mouseY, previousClickX, previousClickY);
    previousClickX = mouseX;
    previousClickY = mouseY;
  }

  // Help button
  if (dist(mouseX, mouseY, width - 20, 20) <= 25) {
    window.open("https://frosetrain.github.io/nordic-paint/documentation");
  }

  // Brush selectors
  if (mouseX >= width - 80 && mouseY >= 80 && mouseY <= 270) {
    activeBrushID = Math.round((mouseY - 100) / 50);
    drawUI();
  }

  // Colour selectors
  if (
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

  // Size changing button
  if (activeBrushID != 3) {
    if (
      dist(mouseX, mouseY, 175, height - 38) <= 20 &&
      brushSizes[activeBrushID] > 1
    ) {
      brushSizes[activeBrushID]--;
      drawUI();
    } else if (
      dist(mouseX, mouseY, 245, height - 38) <= 20 &&
      brushSizes[activeBrushID] < 100
    ) {
      brushSizes[activeBrushID]++;
      drawUI();
    }
  } else if (activeBrushID === 3) {
    if (
      dist(mouseX, mouseY, 35, height - 38) <= 20 &&
      brushSizes[activeBrushID] > 1
    ) {
      brushSizes[activeBrushID]--;
      drawUI();
    } else if (
      dist(mouseX, mouseY, 105, height - 38) <= 20 &&
      brushSizes[activeBrushID] < 100
    ) {
      brushSizes[activeBrushID]++;
      drawUI();
    }
  }

  // Shaky hand button
  if (activeBrushID === 0) {
    if (dist(mouseX, mouseY, 295, height - 38) <= 20 && shakyHand > 0) {
      shakyHand--;
      drawUI();
    } else if (dist(mouseX, mouseY, 365, height - 38) <= 20 && shakyHand < 3) {
      shakyHand++;
      drawUI();
    }
  }

  // Stamp changing button
  if (activeBrushID === 1) {
    if (dist(mouseX, mouseY, 295, height - 38) <= 20 && stampShape > 0) {
      stampShape--;
      drawUI();
    } else if (dist(mouseX, mouseY, 365, height - 38) <= 20 && stampShape < 3) {
      stampShape++;
      drawUI();
    }
  }

  // Canvas clearing button
  if (
    mouseX >= width - 120 &&
    mouseX <= width - 20 &&
    mouseY >= height - 80 &&
    mouseY <= height - 55
  ) {
    fill(activeUIColours[0]);
    strokeWeight(0);
    rect(0, 0, width, height, 10);
    drawUI();
  }

  // Dark/light mode button
  if (
    mouseX >= width - 120 &&
    mouseY <= width - 20 &&
    mouseY >= height - 45 &&
    mouseY <= height - 20
  ) {
    if (UITheme === "light") {
      UITheme = "dark";
      activeUIColours = UIColours[UITheme];
      fill(activeUIColours[0]);
      strokeWeight(0);
      rect(0, 0, width, height, 10);
      drawUI();
    } else if (UITheme === "dark") {
      UITheme = "light";
      activeUIColours = UIColours[UITheme];
      fill(activeUIColours[0]);
      strokeWeight(0);
      rect(0, 0, width, height, 10);
      drawUI();
    }
  }

  // rect(width - 120, height - 80, 100, 25);
  // rect(width - 120, height - 45, 100, 25);
}

function keyPressed() {
  if (parseInt(key) >= 1 && parseInt(key) <= 8) {
    activeBrushColours[activeBrushID] = parseInt(key) - 1;
    drawUI();
  } else if (brushKeybinds.includes(key)) {
    activeBrushID = brushKeybinds.indexOf(key);
    drawUI();
  } else {
    switch (key) {
      case "?":
        window.open("https://frosetrain.github.io/nordic-paint/documentation");
        break;
      case "Backspace":
        fill(activeUIColours[0]);
        strokeWeight(0);
        rect(0, 0, width, height, 10);
        drawUI();
        break;
      case "m":
        if (UITheme === "light") {
          UITheme = "dark";
          activeUIColours = UIColours[UITheme];
          fill(activeUIColours[0]);
          strokeWeight(0);
          rect(0, 0, width, height, 10);
          drawUI();
        } else if (UITheme === "dark") {
          UITheme = "light";
          activeUIColours = UIColours[UITheme];
          fill(activeUIColours[0]);
          strokeWeight(0);
          rect(0, 0, width, height, 10);
          drawUI();
        }
        break;
      case "[":
        if (brushSizes[activeBrushID] > 1) {
          brushSizes[activeBrushID]--;
          drawUI();
        }
        break;
      case "]":
        if (brushSizes[activeBrushID] < 100) {
          brushSizes[activeBrushID]++;
          drawUI();
        }
        break;
      case ",":
        if (activeBrushID === 1 && stampShape > 0) {
          stampShape--;
          drawUI();
        } else if (activeBrushID === 0 && shakyHand > 0) {
          shakyHand--;
          drawUI();
        }
        break;
      case ".":
        if (activeBrushID === 1 && stampShape < 3) {
          stampShape++;
          drawUI();
        } else if (activeBrushID === 0 && shakyHand < 3) {
          shakyHand++;
          drawUI();
        }
        break;
      case "s":
        saveCanvas("my-art-drawn-with-nordic-paint", "png")
    }
  }
}
