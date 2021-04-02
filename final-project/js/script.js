/*****************

Noteepadd
Yichen Wang

CART 310 Final Project

Noteepadd is a playful, minimalistic note/text editor.

FONTS FROM:
https://www.1001fonts.com/goldie-boxing-font.html
https://webfonts.ffonts.net/04b03.font.download

******************/

const CHAR_WIDTH = 34;
const CHAR_HEIGHT = 16;
const FONT_SIZE = 30;
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

const ALL_CHAR = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+,.<>?\'\"\|/\\";

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
const COLOR_YELLOW_PASTEL = "#edea8c";
const COLOR_GREEN = "#33de7a";
const COLOR_GREEN_PASTEL = "#b3e38d";
const COLOR_BLUE = "#4bafff";
const COLOR_BLUE_PASTEL = "#a6c0ed";
const COLOR_PURPLE = "#af4bff";
const COLOR_PURPLE_PASTEL = "#eba0e1";

const PEN_COLORS = [COLOR_BLACK, COLOR_RED, COLOR_BLUE];
const HIGHLIGHT_COLORS = ["#ffff0080", COLOR_ORANGE, "#00ff0080", "#0080ff80", "#ff00ff80"];
const COLORS_NOTE_PLAYFUL = [COLOR_RED_PASTEL, COLOR_ORANGE_PASTEL, COLOR_YELLOW_PASTEL, COLOR_GREEN_PASTEL, COLOR_BLUE_PASTEL, COLOR_PURPLE_PASTEL, COLOR_WHITE, COLOR_GREY];
const COLORS_THEME = [COLOR_RED, COLOR_ORANGE, COLOR_YELLOW, COLOR_GREEN, COLOR_BLUE, COLOR_PURPLE, COLOR_WHITE];
const COLORS_NOTE_PLAIN = [COLOR_WHITE, COLOR_GREY_DARK];

const SHADE_NOTE_SHADOW = "#00000040";
const SHADE_STICKER_SHADOW = "#00000080";
// ********************************

let FONT_PLAYFUL;
let FONT_TERMINAL;

// **************** IMAGES ****************
let ICON_NOTE_PLAYFUL;
let ICON_NOTE_TERMINAL;
let ICON_NOTE_PLAIN;

let ICON_TRASH_GREY;
let ICON_TRASH_BLACK;
let ICON_ADD;
let ICON_DISABLED;

let ICON_CLOSE;
let ICON_SHARE;
let ICON_UNDERLINE;
let ICON_HIGHLIGHT;
let ICON_CHECKBOX;
let ICON_TEXTCOLOR;
let ICON_BGCOLOR;

let STICKER_ONE_HUNDREN;
// ********************************

let state = 0;
let selectedItem = {
  type: "",
  id: -1
};
let trashAnim = {
  deleteDone: false,
  radius: 0,
  speed: 0.35,
  angleSpeed: 0.05,
  angle: -90
};

let showAddMenu = false;
let editingNote = false;
let isShowingTooltip = false;
let currentTooltip = "";

let noteContainer = [];
let stickerContainer = [];
let badgeContainer = [];
let charGrid;

let btnAdd;
let btnPlayful;
let btnTerminal;
let btnPlain;

let btnClose;
let btnShare;
let btnUnderline;
let btnHighlight;
let btnCheckbox;
let btnMarkupColor;
let penColorIndex = 0;
let highlighColorIndex = 0;
let btnBgColor;
let btnTextColor;

// preload fonts and images
function preload() {
  FONT_PLAYFUL = loadFont("assets/goldie-boxing/Goldie Boxing.ttf");
  FONT_TERMINAL = loadFont("assets/webfonts_04b03/04b03.ttf.woff");

  ICON_NOTE_PLAYFUL = loadImage("assets/images/note_playful.png");
  ICON_NOTE_TERMINAL = loadImage("assets/images/note_terminal.png");
  ICON_NOTE_PLAIN = loadImage("assets/images/note_plain.png");

  ICON_TRASH_GREY = loadImage("assets/images/icon_trash_grey.png");
  ICON_TRASH_BLACK = loadImage("assets/images/icon_trash_black.png");
  ICON_ADD = loadImage("assets/images/icon_add.png");
  ICON_DISABLED = loadImage("assets/images/icon_disabled.png");
  ICON_CLOSE = loadImage("assets/images/icon_close.png");
  ICON_SHARE = loadImage("assets/images/icon_share.png");
  ICON_UNDERLINE = loadImage("assets/images/icon_underline.png");
  ICON_HIGHLIGHT = loadImage("assets/images/icon_highlight.png");
  ICON_CHECKBOX = loadImage("assets/images/icon_checkbox.png");
  ICON_TEXTCOLOR = loadImage("assets/images/icon_text.png");
  ICON_BGCOLOR = loadImage("assets/images/icon_bg.png");

  STICKER_ONE_HUNDREN = loadImage("assets/images/sticker_100.png");
}

// setup main screen
function setup() {
  createCanvas(windowWidth, windowHeight*2);
  noStroke();

  charGrid = new CharGrid(0, COLOR_ORANGE_PASTEL, COLOR_BLACK);

  setupMainMenuBtns();
  setupNoteEditorBtns();
  setupFirstUse();
}

function draw() {
  background(COLOR_GREY_LIGHT);
  if (editingNote){
    displayNoteEditor();
  }else{
    displayMainMeun();
    displayNoteThumbnails();
    if (showAddMenu) {
      displayAddMenu();
    }
    displayTrashCan();
  }
  if(isShowingTooltip){
    displayTooltip();
  }
}

// setup all the main menu buttons
function setupMainMenuBtns() {
  // create note butotn
  btnAdd = new ButtonIcon(windowWidth - 64, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_ADD);
  btnAdd.connectFunc(function() {
    showAddMenu = !showAddMenu;
  });
  btnAdd.tooltip = "ADD A NOTE";

  let menuPosX = windowWidth - 48 - ADD_MENU_WIDTH;
  let menuPosY = TOP_MENU_HEIGHT / 2 + UNI_BTN_HEIGHT / 2;
  let downSizeRatio = 1.75;
  // note theme button
  btnPlayful = new ButtonIcon(menuPosX + ADD_MENU_HEIGHT * 0.4, menuPosY + ADD_MENU_HEIGHT / 2 - 16, ADD_MENU_HEIGHT / downSizeRatio, ADD_MENU_HEIGHT / downSizeRatio, ICON_NOTE_PLAYFUL);
  btnPlayful.disabled = true;
  btnTerminal = new ButtonIcon(menuPosX + ADD_MENU_HEIGHT, menuPosY + ADD_MENU_HEIGHT / 2 - 16, ADD_MENU_HEIGHT / downSizeRatio, ADD_MENU_HEIGHT / downSizeRatio, ICON_NOTE_TERMINAL);
  btnTerminal.disabled = true;
  btnPlain = new ButtonIcon(menuPosX + ADD_MENU_HEIGHT * 1.6, menuPosY + ADD_MENU_HEIGHT / 2 - 16, ADD_MENU_HEIGHT / downSizeRatio, ADD_MENU_HEIGHT / downSizeRatio, ICON_NOTE_PLAIN);
}

// set up buttons in note editor
function setupNoteEditorBtns() {
  // top left corner
  btnClose = new ButtonIcon(64, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_CLOSE);
  btnShare = new ButtonIcon(128, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_SHARE);
  btnShare.tooltip = "HAVE THE NOTE READY TO COPY";
  // share function
  btnShare.connectFunc(function() {
    setTimeout(function() {
      charGrid.copyNote();
    }, 200);
    console.log("Text copied.");
  });
  // bottom center left
  btnCheckbox = new ButtonIcon(windowWidth / 2 - MAX_NOTE_SIZE / 2, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_CHECKBOX, false);
  btnCheckbox.tooltip = "ADD A CHECKBOX";
  btnUnderline = new ButtonIcon(windowWidth / 2 - MAX_NOTE_SIZE / 2 + 64, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_UNDERLINE, true);
  btnHighlight = new ButtonIcon(windowWidth / 2 - MAX_NOTE_SIZE / 2 + 128, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_HIGHLIGHT, true);
  // bottom center right
  btnMarkupColor = new ButtonColor(windowWidth / 2 + MAX_NOTE_SIZE/2 - 48, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, PEN_COLORS, 0);
  btnMarkupColor.disabled = true;
  btnBgColor = new ButtonColor(windowWidth / 2 + MAX_NOTE_SIZE/2, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, COLORS_NOTE_PLAYFUL, 1, ICON_BGCOLOR);
  btnTextColor = new ButtonColor(windowWidth / 2 + MAX_NOTE_SIZE/2, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, COLORS_NOTE_PLAYFUL, 1, ICON_TEXTCOLOR);
  // check box function
  btnCheckbox.connectFunc(function() {
    charGrid.addCheckButton();
  });
  // underline function
  btnUnderline.connectFunc(function() {
    charGrid.toggleUnderline(!charGrid.underlineEnabled);
    charGrid.toggleHighlight(false);
    btnHighlight.toggled = false;
    btnMarkupColor.disabled = !charGrid.underlineEnabled;
    btnMarkupColor.colorProfile = PEN_COLORS;
    btnMarkupColor.colorIndex = penColorIndex;
  });
  // highlight function
  btnHighlight.connectFunc(function() {
    charGrid.toggleHighlight(!charGrid.highlightEnabled);
    charGrid.toggleUnderline(false);
    btnUnderline.toggled = false;
    btnMarkupColor.disabled = !charGrid.highlightEnabled;
    btnMarkupColor.colorProfile = HIGHLIGHT_COLORS;
    btnMarkupColor.colorIndex = highlighColorIndex;
  });
  btnMarkupColor.connectFunc(function(){
    if (btnMarkupColor.colorIndex < btnMarkupColor.colorProfile.length - 1){
      btnMarkupColor.colorIndex += 1;
    }else{
      btnMarkupColor.colorIndex = 0;
    }
    if (charGrid.underlineEnabled){
      penColorIndex = btnMarkupColor.colorIndex;
    }else if (charGrid.highlightEnabled){
      highlighColorIndex = btnMarkupColor.colorIndex;
    }
  });
  btnBgColor.connectFunc(function(){
    if (btnBgColor.colorIndex < btnBgColor.colorProfile.length - 1){
      btnBgColor.colorIndex += 1;
    }else{
      btnBgColor.colorIndex = 0;
    }
    charGrid.bgColor = btnBgColor.colorProfile[btnBgColor.colorIndex];
  });
}

function setupFirstUse(){
  let titles = ["Double click to open a sticky note", "Drag the note near the trash can to delete it", "Add a new note in the top right corner", "Scroll down to see your progress and rewards"];
  for(let i = 0; i < titles.length; i++){
    let rX = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowWidth - NOTE_THUMBNIAL_SIZE - MARGIN);
    let rY = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowHeight - NOTE_THUMBNIAL_SIZE - MARGIN);
    let note;
    if(i === 2){
      note = new DraggableNote(rX, rY, COLOR_WHITE, COLOR_BLACK, 2, titles[i], i);
    }else if (i === 3){
      note = new DraggableNote(rX, rY, COLOR_BLACK, random(COLORS_THEME), 1, titles[i], i);
    }else{
      note = new DraggableNote(rX, rY, random(COLORS_NOTE_PLAYFUL), COLOR_BLACK, 0, titles[i], i);
    }
    noteContainer.push(note);
  }
  let sticker = new DraggableAward(windowWidth / 2, windowHeight / 2, COLOR_ORANGE, STICKER_ONE_HUNDREN, 1, 0);
}

function displayNoteThumbnails(){
  for(let i = 0; i < noteContainer.length; i++){
    noteContainer[i].display();
  }
}

// display main menu
function displayMainMeun() {
  push();
  rectMode(CORNER);
  // Top bar
  fill(COLOR_BLACK);
  rect(0, 0, windowWidth, TOP_MENU_HEIGHT);
  textFont(FONT_PLAYFUL);
  textAlign(CENTER);
  textSize(64);
  fill(COLOR_WHITE);
  text("Noteepadd", windowWidth / 2, TOP_MENU_HEIGHT / 2 + (MARGIN / 2));
  btnAdd.display();

  // trash and delete
  let size = 48;
  fill(0, 0, 0, 255 / 2);
  // if detect dragging note over, play ready to delete animation
  if (checkForNoteDeletion()) {
    trashAnim.radius = lerp(trashAnim.radius, size * 8, trashAnim.speed);
    ellipse(MARGIN + size / 2, windowHeight - MARGIN - size / 2, trashAnim.radius);
  } else {
    trashAnim.radius = lerp(trashAnim.radius, 0, trashAnim.speed);
    ellipse(MARGIN + size / 2, windowHeight - MARGIN - size / 2, trashAnim.radius);
  }
  pop();
}

// display trash can in main menu
function displayTrashCan() {
  push();
  imageMode(CENTER);
  ellipseMode(CENTER);
  let size = 48;
  // if detect dragging note over, turn trash to black
  if (checkForNoteDeletion()) {
    image(ICON_TRASH_BLACK, MARGIN + size / 2, windowHeight - MARGIN - size / 2, size, size);
    trashAnim.angle = lerp(trashAnim.angle, 270, trashAnim.angleSpeed);
    let radius = 32;
    stroke(COLOR_WHITE);
    strokeWeight(4);
    fill(COLOR_WHITE);
    ellipse(mouseX + radius/2, mouseY - radius/2, radius);
    fill(COLOR_BLACK);
    arc(mouseX + radius/2, mouseY - radius/2, radius, radius, -90, trashAnim.angle);
    if (trashAnim.angle >= 269 && !trashAnim.deleteDone){
      deleteNote(selectedItem.id);
    }
  } else {
    trashAnim.angle = -90;
    trashAnim.deleteDone = false;
    image(ICON_TRASH_GREY, MARGIN + size / 2, windowHeight - MARGIN - size / 2, size, size);
  }
  pop();
}

// display add menu
function displayAddMenu() {
  push();
  // window
  fill(COLOR_GREY);
  let menuPosX = windowWidth - 48 - ADD_MENU_WIDTH;
  let menuPosY = TOP_MENU_HEIGHT / 2 + UNI_BTN_HEIGHT / 2;
  rect(menuPosX, menuPosY, ADD_MENU_WIDTH, ADD_MENU_HEIGHT, 8);
  // text des and buttons
  fill(COLOR_WHITE);
  textAlign(CENTER);
  textFont(FONT_PLAYFUL);
  textSize(18);
  btnPlayful.display();
  text("PLAYFUL", menuPosX + ADD_MENU_HEIGHT * 0.4, menuPosY + ADD_MENU_HEIGHT / 2 + 52);
  textFont(FONT_TERMINAL);
  btnTerminal.display();
  text("TERMINAL", menuPosX + ADD_MENU_HEIGHT, menuPosY + ADD_MENU_HEIGHT / 2 + 52);
  textFont("Courier");
  btnPlain.display();
  text("PLAIN", menuPosX + ADD_MENU_HEIGHT * 1.6, menuPosY + ADD_MENU_HEIGHT / 2 + 52);
  pop();
}

// display note editor
function displayNoteEditor() {
  background(COLOR_BLACK);
  // text editor
  charGrid.display();
  // buttons
  btnClose.display();
  btnShare.display();
  btnUnderline.display();
  btnHighlight.display();
  btnCheckbox.display();
  btnMarkupColor.display();
  btnBgColor.display();
}

// update dragged item
function updateSelectedItem(type, id) {
  selectedItem.type = type;
  selectedItem.id = id;
}

function displayTooltip(){
  push();
  fill(COLOR_WHITE);
  textFont(FONT_PLAYFUL);
  textSize(16);
  textAlign(LEFT,CENTER);
  let tipPosX = mouseX;
  let tipPosY = mouseY + 24;
  if (mouseX > windowWidth - textWidth(currentTooltip)){
    tipPosX -= textWidth(currentTooltip);
  }
  text(currentTooltip, tipPosX, tipPosY);
  pop();
}

function showTooltip(text){
  currentTooltip = text;
  isShowingTooltip = true;
}

// check for action of dragging note near trash can icon
function checkForNoteDeletion() {
  let size = 48;
  // if dragging item is a note and within the radius
  if (selectedItem.type === "NOTE" && checkForMouseOver(MARGIN + size / 2, windowHeight - MARGIN - size / 2, size * 2, size * 2)) {
    return true;
  }
  return false;
}

function deleteNote(id){
  cursor(ARROW);
  updateSelectedItem("", -1);
  for(let i = 0; i < noteContainer.length; i++){
    if (noteContainer[i].id === id){
      let tempLast = noteContainer[noteContainer.length - 1];
      noteContainer[noteContainer.length - 1] = noteContainer[i];
      noteContainer[i] = tempLast;
      console.log("\"" + noteContainer.pop().title + "\" is deleted.");

    }
  }
  trashAnim.deleteDone = true;
}

// check if mouse is over within a square radius in its position
function checkForMouseOver(x, y, w, h) {
  return (mouseX >= x - w / 2 && mouseX <= x + w / 2 &&
    mouseY >= y - h / 2 && mouseY <= y + h / 2);
}

// check for double click
function doubleClicked() {
  // if double click on a note, it opens note editor
  if (selectedItem.type === "NOTE") {
    editingNote = true;
    updateSelectedItem("", -1);
    cursor(ARROW);
    console.log("Open note " + selectedItem.id);
  }
}

// check for delete and return key
function keyPressed() {
  if (editingNote){
    // delete
    if (keyCode === 8) {
      charGrid.removeChar();
      charGrid.keyIsTyped = true;
    }
    // return
    if (keyCode === 13) {
      charGrid.addChar("\n");
      charGrid.keyIsTyped = true;
    }
  }
}

// check for character typed
function keyTyped() {
  if (editingNote){
    if (ALL_CHAR.includes(key)) {
      charGrid.addChar(key);
      charGrid.keyIsTyped = true;
    }
  }
}
