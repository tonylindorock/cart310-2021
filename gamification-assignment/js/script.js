/*****************

Gamification
Yichen Wang

CART 310

Gamify the homepage of Concordia Moodle

******************/

const MARGIN = 24;
const TOP_MENU_HEIGHT = 48;
const UNI_BTN_HEIGHT = 32;
const UNI_BTNC_HEIGHT = 192;


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
var BTN_MENU_HOME;
var BTN_MENU_AI;
var BTN_MENU_LANG;

var BTN_COURSE_0;
var BTN_COURSE_1;
var BTN_COURSE_2;
var BTN_WORKSHOP_0;
var BTN_WORKSHOP_1;
var BTN_WORKSHOP_2;
var BTN_WORKSHOP_3;

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
  noStroke();
}

function draw() {
  background(255);
  displayPage0();
}

function displayPage0(){
  push();
  rectMode(CORNER);
  imageMode(CENTER);
  // top menu left
  stroke(COLOR_GREY);
  fill(COLOR_WHITE);
  rect(0, 0, windowWidth, TOP_MENU_HEIGHT);
  image(ICON_MENU, MARGIN + 24/2, TOP_MENU_HEIGHT/2, 24, 24);
  image(LOGO, MARGIN + 24 + MARGIN + 228/2, TOP_MENU_HEIGHT/2, 228, 32);
  BTN_MENU_HOME.display();
  BTN_MENU_AI.display();
  BTN_MENU_LANG.display();
  // top menu right
  fill(COLOR_BLACK);
  textAlign(CENTER,CENTER);
  textSize(16);
  text("Yichen Wang", windowWidth - (MARGIN + 24 + 42 + 64), TOP_MENU_HEIGHT/2);
  image(ICON_USER, windowWidth - (MARGIN + 24 + 42/2), TOP_MENU_HEIGHT/2, 42, 42);
  image(ICON_ARROW_DOWN, windowWidth - (MARGIN + 24/2), TOP_MENU_HEIGHT/2, 24, 24);
  // title
  textAlign(LEFT,CENTER);
  textSize(36);
  textStyle(BOLD);
  let titleHeight = 100;
  fill(COLOR_GREY);
  rect(MARGIN, TOP_MENU_HEIGHT + MARGIN, windowWidth - MARGIN*2, titleHeight);
  fill(COLOR_BLACK);
  text("Concordia Course Web Sites", MARGIN * 2, TOP_MENU_HEIGHT + MARGIN + titleHeight/2);

  displayDashBoard();
  pop();
}

function setupButtons(){
  BTN_MENU_HOME = new ButtonText(24 + 228 + 32 + MARGIN * 3, TOP_MENU_HEIGHT/2, 64, UNI_BTN_HEIGHT, COLOR_ORANGE, false, COLOR_BLACK, "Home");

  BTN_MENU_AI = new ButtonText(24 + 228 + 64 + 80 + MARGIN * 4, TOP_MENU_HEIGHT/2, 160, UNI_BTN_HEIGHT, COLOR_ORANGE, false, COLOR_BLACK, "Academic Integrity");

  BTN_MENU_LANG = new ButtonText(24 + 228 + 64 + 160 + 48 + MARGIN * 5, TOP_MENU_HEIGHT/2, 96, UNI_BTN_HEIGHT, COLOR_ORANGE, false, COLOR_BLACK, "English (en)");

  let dashBoradwidth = windowWidth - windowWidth/3 - MARGIN;
  let dashBoradheight = windowHeight - (48 + 100 + MARGIN*3);
  let dashBoradXCenter = dashBoradwidth/2 + MARGIN;
  let dashBoradYCenter = dashBoradheight/2 + 48 + 100 + MARGIN*2;

  BTN_COURSE_0 = new ButtonCourse(dashBoradXCenter - UNI_BTNC_HEIGHT*1.5 - MARGIN*1.5, dashBoradYCenter -UNI_BTNC_HEIGHT/1.5 - MARGIN/1.5, UNI_BTNC_HEIGHT, UNI_BTNC_HEIGHT, COLOR_YELLOW, true, COLOR_BLACK, "FFAR\n250 AA", "Tutorial\nTUE 15:30-17:00");
  BTN_COURSE_1 = new ButtonCourse(dashBoradXCenter - UNI_BTNC_HEIGHT/2 - MARGIN/2, dashBoradYCenter -UNI_BTNC_HEIGHT/1.5 - MARGIN/1.5, UNI_BTNC_HEIGHT, UNI_BTNC_HEIGHT, COLOR_GREEN, true, COLOR_WHITE, "CART\n310 A", "Studio\nWED 8:30-12:30");
  BTN_COURSE_2 = new ButtonCourse(dashBoradXCenter + UNI_BTNC_HEIGHT/2 + MARGIN/2, dashBoradYCenter -UNI_BTNC_HEIGHT/1.5 - MARGIN/1.5, UNI_BTNC_HEIGHT, UNI_BTNC_HEIGHT, COLOR_BLUE, true, COLOR_WHITE, "CART\n362 A", "Studio\nFRI 8:30-12:30");
  BTN_WORKSHOP_0 = new ButtonCourse(dashBoradXCenter + UNI_BTNC_HEIGHT*1.5 + MARGIN*1.5, dashBoradYCenter -UNI_BTNC_HEIGHT/1.5 - MARGIN/1.5, UNI_BTNC_HEIGHT, UNI_BTNC_HEIGHT, COLOR_RED, false, COLOR_WHITE, "CDA\nPVEW", "Workshop\nPremiere Video Editing");

  BTN_WORKSHOP_1 = new ButtonCourse(dashBoradXCenter - UNI_BTNC_HEIGHT*1.5 - MARGIN*1.5, dashBoradYCenter +UNI_BTNC_HEIGHT/1.5 + MARGIN/1.5, UNI_BTNC_HEIGHT, UNI_BTNC_HEIGHT, COLOR_RED, false, COLOR_WHITE, "CDA\nVCCW", "Workshop\nVideo Colour Correction");
  BTN_WORKSHOP_2 = new ButtonCourse(dashBoradXCenter - UNI_BTNC_HEIGHT*0.5 - MARGIN*0.5, dashBoradYCenter +UNI_BTNC_HEIGHT/1.5 + MARGIN/1.5, UNI_BTNC_HEIGHT, UNI_BTNC_HEIGHT, COLOR_RED, false, COLOR_WHITE, "CDA\nVCW", "Workshop\nVideo Compression");
  BTN_WORKSHOP_3 = new ButtonCourse(dashBoradXCenter + UNI_BTNC_HEIGHT*0.5 + MARGIN*0.5, dashBoradYCenter +UNI_BTNC_HEIGHT/1.5 + MARGIN/1.5, UNI_BTNC_HEIGHT, UNI_BTNC_HEIGHT, COLOR_RED, false, COLOR_WHITE, "CTC", "Fine Arts\nCore Technical Center");
}

function displayDashBoard(){
  push();
  let x = MARGIN;
  let y = 48 + 100 + MARGIN*2;
  let width = windowWidth - windowWidth/3 - MARGIN;
  let height = windowHeight - (48 + 100 + MARGIN*3);
  // outline
  rectMode(CORNER);
  stroke(COLOR_GREY);
  strokeWeight(1);
  noFill();
  rect(x, y, width, height);
  // courses
  BTN_COURSE_0.display();
  BTN_COURSE_1.display();
  BTN_COURSE_2.display();
  BTN_WORKSHOP_0.display();
  BTN_WORKSHOP_1.display();
  BTN_WORKSHOP_2.display();
  BTN_WORKSHOP_3.display();
  pop();
}
