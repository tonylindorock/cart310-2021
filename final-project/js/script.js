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

const CHAR_WIDTH = 34;
const CHAR_HEIGHT = 16;
const MAX_NOTE_SIZE = 600;

const NOTE_THUMBNIAL_SIZE = 160;
const AWARD_SIZE = 100;
const AWARD_ICON_SIZE = 64;

const MARGIN = 32;
const TOP_MENU_HEIGHT = 84;

const ADD_MENU_WIDTH = 320;
const ADD_MENU_HEIGHT = 160;

const UNI_BTN_HEIGHT = 32;
const UNI_BTNC_HEIGHT = 192;

// **************** COLORS ****************
const COLOR_BLACK = "#262626";
const COLOR_GREY_DARK = "#484848";
const COLOR_GREY = "#aaa";
const COLOR_GREY_LIGHT = "#ccc";
const COLOR_WHITE = "#eee";
const COLOR_RED = "#ff6464";
const COLOR_RED_PASTEL = "#fea3aa";
const COLOR_ORANGE = "#ffaf4b";
const COLOR_ORANGE_PASTEL = "#f8b88b";
const COLOR_YELLOW = "#ffe600";
const COLOR_YELLOW_PASTEL = "#faf884";
const COLOR_GREEN = "#33de7a";
const COLOR_GREEN_PASTEL = "#baed91";
const COLOR_BLUE = "#4bafff";
const COLOR_BLUE_PASTEL = "#b2cefe";
const COLOR_PURPLE = "#af4bff";
const COLOR_PURPLE_PASTEL = "#f2a2e8";

const SHADE_NOTE_SHADOW = "#00000040";
const SHADE_STICKER_SHADOW = "#00000080";

let FONT_PLAYFUL;
let FONT_TERMINAL;

let ICON_TRASH_GREY;
let ICON_TRASH_BLACK;
let ICON_ADD;

let ICON_CLOSE;
let ICON_SHARE;
let ICON_UNDERLINE;
let ICON_HIGHLIGHT;

let STICKER_ONE_HUNDREN;

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

let showAddMenu = false;

let note;
let sticker;
let charGrid;

let btnAdd;
let btnPlayful;
let btnTerminal;
let btnPlain;

let btnClose;
let btnShare;
let btnUnderline;
let btnHighlight;
let btnTextColor;
let btnBgColor;

function preload() {
  FONT_PLAYFUL = loadFont("assets/goldie-boxing/Goldie Boxing.ttf");
  FONT_TERMINAL = loadFont("assets/webfonts_04b03/04b03.ttf.woff");

  ICON_TRASH_GREY = loadImage("assets/images/icon_trash_grey.png");
  ICON_TRASH_BLACK = loadImage("assets/images/icon_trash_black.png");
  ICON_ADD = loadImage("assets/images/icon_add.png");
  ICON_CLOSE = loadImage("assets/images/icon_close.png");
  ICON_SHARE = loadImage("assets/images/icon_share.png");
  ICON_UNDERLINE = loadImage("assets/images/icon_underline.png");
  ICON_HIGHLIGHT = loadImage("assets/images/icon_highlight.png");

  STICKER_ONE_HUNDREN = loadImage("assets/images/sticker_100.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  note = new DraggableNote(windowWidth / 2, windowHeight / 2, COLOR_BLUE_PASTEL, COLOR_BLACK, 0, "Hello", 0);
  sticker = new DraggableAward(windowWidth / 2, windowHeight / 2, COLOR_ORANGE, STICKER_ONE_HUNDREN, 1, 0);

  charGrid = new CharGrid(0, COLOR_ORANGE_PASTEL, COLOR_BLACK);
  charGrid.addLine("This is a note.\n\n- Item 1\n- Item 2\n- Item 3\n\n[X] Finish essay\n[ ] Rehearse presentation\n[ ] Help TONY print out his paper\n\nPresentation due FRI\nPaper due SUN");

  setupMainMenuBtns();
  setupNoteEditorBtns();
}

function draw() {
  background(COLOR_GREY_LIGHT);
  displayNoteEditor();
  //displayMainMeun();
  //note.display();
  //sticker.display();
  if (showAddMenu) {
    displayAddMenu();
  }
  //displayTrashCan();
}

function setupMainMenuBtns() {
  btnAdd = new ButtonIcon(windowWidth - 64, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_ADD);
  btnAdd.connectFunc(function() {
    showAddMenu = !showAddMenu;
  });

  let menuPosX = windowWidth - 48 - ADD_MENU_WIDTH;
  let menuPosY = TOP_MENU_HEIGHT / 2 + UNI_BTN_HEIGHT / 2;

  btnPlayful = new ButtonText(menuPosX + ADD_MENU_HEIGHT * 0.4, menuPosY + ADD_MENU_HEIGHT/2, ADD_MENU_HEIGHT/2, ADD_MENU_HEIGHT/2, COLOR_ORANGE_PASTEL, true, COLOR_BLACK, "PLAYFUL");
  btnTerminal = new ButtonText(menuPosX + ADD_MENU_HEIGHT, menuPosY + ADD_MENU_HEIGHT/2, ADD_MENU_HEIGHT/2, ADD_MENU_HEIGHT/2, COLOR_GREY_DARK, true, COLOR_WHITE, "TERMINAL");
  btnPlain = new ButtonText(menuPosX + ADD_MENU_HEIGHT * 1.6, menuPosY + ADD_MENU_HEIGHT/2, ADD_MENU_HEIGHT/2, ADD_MENU_HEIGHT/2, COLOR_WHITE, true, COLOR_BLACK, "PLAIN");
}

function displayMainMeun() {
  push();
  rectMode(CORNER);
  fill(COLOR_BLACK);
  let barHeight = 84;
  rect(0, 0, windowWidth, barHeight);
  textFont(FONT_PLAYFUL);
  textAlign(CENTER);
  textSize(64);
  fill(COLOR_WHITE);
  text("Noteepadd", windowWidth / 2, barHeight / 2 + (MARGIN / 2));
  btnAdd.display();

  let size = 48;
  fill(0, 0, 0, 255 / 2);
  if (checkForNoteDeletion()) {
    trashAnim.radius = lerp(trashAnim.radius, size * 8, trashAnim.speed);
    ellipse(MARGIN + size / 2, windowHeight - MARGIN - size / 2, trashAnim.radius);
  } else {
    trashAnim.radius = lerp(trashAnim.radius, 0, trashAnim.speed);
    ellipse(MARGIN + size / 2, windowHeight - MARGIN - size / 2, trashAnim.radius);
  }

  pop();
}

function displayTrashCan() {
  push();
  imageMode(CENTER);
  ellipseMode(CENTER);
  let size = 48;
  if (checkForNoteDeletion()) {
    image(ICON_TRASH_BLACK, MARGIN + size / 2, windowHeight - MARGIN - size / 2, size, size);
  } else {
    image(ICON_TRASH_GREY, MARGIN + size / 2, windowHeight - MARGIN - size / 2, size, size);
  }
  pop();
}

function displayAddMenu() {
  push();
  fill(COLOR_GREY);
  rect(windowWidth - 48 - ADD_MENU_WIDTH, TOP_MENU_HEIGHT / 2 + UNI_BTN_HEIGHT / 2, ADD_MENU_WIDTH, ADD_MENU_HEIGHT, 8);
  textFont(FONT_PLAYFUL);
  btnPlayful.display();
  textFont(FONT_TERMINAL);
  btnTerminal.display();
  textFont("Courier");
  btnPlain.display();
  pop();
}

function checkForNoteDeletion() {
  let size = 48;
  if (selectedItem.type === "NOTE" && checkForMouseOver(MARGIN + size / 2, windowHeight - MARGIN - size / 2, size * 2, size * 2)) {
    return true;
  }
  return false;
}

function setupNoteEditorBtns(){
  btnClose = new ButtonIcon(64, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_CLOSE);
  btnShare = new ButtonIcon(128, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_SHARE);
  btnShare.connectFunc(function(){
    setTimeout(function(){
      charGrid.copyNote();
    }, 200);
    console.log("Text copied.");
  });
  btnUnderline = new ButtonIcon(windowWidth - 128, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_UNDERLINE);
  btnHighlight = new ButtonIcon(windowWidth - 64, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_HIGHLIGHT);
}

function displayNoteEditor(){
  background(COLOR_BLACK);
  charGrid.display();
  btnClose.display();
  btnShare.display();
  btnUnderline.display();
  btnHighlight.display();
}

function updateSelectedItem(type, id) {
  selectedItem.type = type;
  selectedItem.id = id;
}

function checkForMouseOver(x, y, w, h) {
  return (mouseX >= x - w / 2 && mouseX <= x + w / 2 &&
    mouseY >= y - h / 2 && mouseY <= y + h / 2);
}

function doubleClicked() {
  if (selectedItem.type === "NOTE") {
    console.log("Open note " + selectedItem.id);
  }
}
