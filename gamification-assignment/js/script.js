/*****************

Gamification
Yichen Wang

CART 310

Gamify the homepage of Concordia Moodle

******************/

const MARGIN = 24;
const TOP_MENU_HEIGHT = 48;

// **************** COLORS ****************
const COLOR_BLACK = "#262626";
const COLOR_GREY = "#ddd";
const COLOR_WHITE = "#fff";
const COLOR_RED = "#ff6464";
const COLOR_ORANGE = "#ffaf4b";
const COLOR_YELLOW = "#ffe600";
const COLOR_GREEN = "#33de7a";
const COLOR_BLUE = "#4bafff";
const COLOR_PURPLE = "#af4bff";

const COLOR_LINK = "#0645AD";
// ********************************

// **************** IMAGES ****************
var LOGO;
var ICON_MENU;
var ICON_USER;
var ICON_ARROW_DOWN;

// ********************************

// **************** BUTTONS ****************
var BUTTON_MENU_HOME;
var BUTTON_MENU_AI;
var BUTTON_MENU_LANG;

// ********************************

function preload() {
  LOGO = loadImage("assets/images/Concordia_logo.png");
  ICON_MENU = loadImage("assets/images/menu.png");
  ICON_USER = loadImage("assets/images/user.png");
  ICON_ARROW_DOWN = loadImage("assets/images/arrow_down.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight*2);
  textFont("Helvetica");
  setupButtons();
}

function draw() {
  background(255);
  displayPage0();
}

function displayPage0(){
  push();
  rectMode(CORNER);
  imageMode(CENTER);
  stroke(COLOR_GREY);
  fill(COLOR_WHITE);
  rect(0, 0, windowWidth, TOP_MENU_HEIGHT);
  image(ICON_MENU, MARGIN + 24/2, TOP_MENU_HEIGHT/2, 24, 24);
  image(LOGO, MARGIN + 24 + MARGIN + 228/2, TOP_MENU_HEIGHT/2, 228, 32);
  BUTTON_MENU_HOME.display();
  BUTTON_MENU_AI.display();
  BUTTON_MENU_LANG.display();
  fill(COLOR_BLACK);
  textAlign(CENTER,CENTER);
  textSize(16);
  text("Yichen Wang", windowWidth - (MARGIN + 24 + 42 + 64), TOP_MENU_HEIGHT/2);
  image(ICON_USER, windowWidth - (MARGIN + 24 + 42/2), TOP_MENU_HEIGHT/2, 42, 42);
  image(ICON_ARROW_DOWN, windowWidth - (MARGIN + 24/2), TOP_MENU_HEIGHT/2, 24, 24);
  pop();
}

function setupButtons(){
  BUTTON_MENU_HOME = new ButtonText(24 + 228 + 32 + MARGIN * 3, TOP_MENU_HEIGHT/2, 64, 32, COLOR_ORANGE, false, COLOR_BLACK, "Home");

  BUTTON_MENU_AI = new ButtonText(24 + 228 + 64 + 80 + MARGIN * 4, TOP_MENU_HEIGHT/2, 160, 32, COLOR_ORANGE, false, COLOR_BLACK, "Academic Integrity");

  BUTTON_MENU_LANG = new ButtonText(24 + 228 + 64 + 160 + 48 + MARGIN * 5, TOP_MENU_HEIGHT/2, 96, 32, COLOR_ORANGE, false, COLOR_BLACK, "English (en)");
}
