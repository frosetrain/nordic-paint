/* Nordic Paint v0.0.0 May 13, 2022 */

// Change this value if you wish
UIScale = 1;
// These colours were taken from Nord (nordtheme.com)
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
// Dark and light theme UI colours
UIColours = {
    "dark": ["#2E3440", "#3B4252", "#4C566A", "#D8DEE9"],
    "light": ["#ECEFF4", "#E5E9F0", "#D8DEE9", "#2E3440"]
};

function drawUI() {
    push();

    // bottom bar
    strokeWeight(0);
    fill(actualUIColours[1]);
    rect(0, height - 100 * UIScale, width, 100 * UIScale);

    // TODO: Make brushes

    pop();
};

function setup() {
    brushColourID = 0;
    brushSize = 10;
    UITheme = "dark";
    actualUIColours = UIColours[UITheme];

    createCanvas(windowWidth, windowHeight);
    background(actualUIColours[0]);

    drawUI();
};

