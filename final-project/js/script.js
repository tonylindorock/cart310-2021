/*****************

Noteepadd
Yichen Wang

CART 310 Final Project

This is a template. You must fill in the title,
author, and this description to match your project!

FONTS FROM:
https://www.1001fonts.com/goldie-boxing-font.html
https://webfonts.ffonts.net/04b03.font.download

******************/

const CHAR_WIDTH = 32;
const CHAR_HEIGHT = 48;
const NOTE_THUMBNIAL_SIZE = 160;

const MARGIN = 32;
const TOP_MENU_HEIGHT = 48;
const UNI_BTN_HEIGHT = 32;
const UNI_BTNC_HEIGHT = 192;

// **************** COLORS ****************
const COLOR_BLACK = "#262626";
const COLOR_GREY_DARK = "#484848";
const COLOR_GREY = "#aaa";
const COLOR_GREY_LIGHT = "#ccc";
const COLOR_WHITE = "#fff";
const COLOR_RED = "#ff6464";
const COLOR_ORANGE = "#ffaf4b";
const COLOR_YELLOW = "#ffe600";
const COLOR_GREEN = "#33de7a";
const COLOR_BLUE = "#4bafff";
const COLOR_PURPLE = "#af4bff";

const SHADE_NOTE_SHADOW = "#00000040";
const SHADE_STICKER_SHADOW = "#00000080";

let FONT_PLAYFUL;
let FONT_TERMINAL;

let ICON_TRASH_GREY;
let ICON_TRASH_BLACK;

let state = 0;
let selectedItem = {
  type: "",
  id: -1
};
let trashAnim = {
  done: false,
  radius: 0,
  speed: 0.35
};

let note;

function preload() {
  FONT_PLAYFUL = loadFont("assets/goldie-boxing/Goldie Boxing.ttf");
  FONT_TERMINAL = loadFont("assets/webfonts_04b03/04b03.ttf.woff");

  ICON_TRASH_GREY = loadImage("assets/images/icon_trash_grey.png");
  ICON_TRASH_BLACK = loadImage("assets/images/icon_trash_black.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();

  note = new ButtonNotepad(windowWidth/2,windowHeight/2,COLOR_ORANGE,COLOR_BLACK,0, "Hello");
}

function draw() {
  background(COLOR_GREY_LIGHT);
  displayMainMeun();
  note.display();
  displayTrashCan();
}

function displayMainMeun(){
  push();
  rectMode(CORNER);
  fill(COLOR_BLACK);
  let barHeight = 84;
  rect(0, 0, windowWidth, barHeight);
  textFont(FONT_PLAYFUL);
  textAlign(CENTER);
  textSize(64);
  fill(COLOR_WHITE);
  text("Noteepadd", windowWidth/2, barHeight/2 + (MARGIN/2));

  let size = 48;
  if (checkForNoteDeletion()){
    trashAnim.radius = lerp(trashAnim.radius,size*8,trashAnim.speed);
    ellipse(MARGIN + size/2, windowHeight - MARGIN - size/2,trashAnim.radius);
  }else{
    trashAnim.radius = lerp(trashAnim.radius,0,trashAnim.speed);
    ellipse(MARGIN + size/2, windowHeight - MARGIN - size/2,trashAnim.radius);
  }
  pop();
}

function displayTrashCan(){
  push();
  imageMode(CENTER);
  ellipseMode(CENTER);
  let size = 48;
  if (checkForNoteDeletion()){
    image(ICON_TRASH_BLACK, MARGIN + size/2, windowHeight - MARGIN - size/2, size, size);
  }else{
    image(ICON_TRASH_GREY, MARGIN + size/2, windowHeight - MARGIN - size/2, size, size);
  }
  pop();
}

function checkForNoteDeletion(){
  let size = 48;
  if(selectedItem.type === "NOTE" && checkForMouseOver(MARGIN + size/2, windowHeight - MARGIN - size/2, size*2, size*2)){
    return true;
  }
  return false;
}

function updateSelectedItem(type, id){
  selectedItem.type = type;
  selectedItem.id = id;
}

function checkForMouseOver(x, y, w, h){
  return (mouseX >= x - w/2 && mouseX <= x + w/2
  && mouseY >= y - h/2 && mouseY <= y + h/2);
}
