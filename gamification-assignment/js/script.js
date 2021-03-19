/*****************

Gamification
Yichen Wang

CART 310

Gamify the homepage of Concordia Moodle

******************/

const COLOR_BLACK = "#262626";
const COLOR_WHITE = "#fff";
const COLOR_RED = "#ff6464";
const COLOR_ORANGE = "#ffaf4b";
const COLOR_YELLOW = "#ffe600";
const COLOR_GREEN = "#33de7a";
const COLOR_BLUE = "#4bafff";
const COLOR_PURPLE = "#af4bff";

const COLOR_LINK = "#0645AD";

var button;

function preload() {

}

function setup() {
  createCanvas(windowWidth,windowHeight*2);
  textFont("Helvetica");
  setupButtons();
}

function draw() {
  background(255);
  button.display();
}

function setupButtons(){
  button = new ButtonText(windowWidth/2,windowHeight/2,128,32, COLOR_ORANGE, true, "Hello World");
}
