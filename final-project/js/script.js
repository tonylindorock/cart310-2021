/*****************

Noteeboardd
Yichen Wang

CART 310 Final Project

Noteeboardd is a playful, minimalistic note/text editor.

FONTS FROM:
https://www.1001fonts.com/goldie-boxing-font.html
https://webfonts.ffonts.net/04b03.font.download

******************/

const CHAR_WIDTH = 34;
const CHAR_HEIGHT = 16;
const FONT_SIZE = 30;
const MAX_NOTE_SIZE = 600;
const MAX_NOTE_NUM = 16;

const NOTE_THUMBNIAL_SIZE = 160;
const AWARD_SIZE = 100;
const AWARD_ICON_SIZE = 64;

const MARGIN = 32;
const TOP_MENU_HEIGHT = 84;

const ADD_MENU_WIDTH = 320;
const ADD_MENU_HEIGHT = 160;

const UNI_BTN_HEIGHT = 32;
const UNI_BTNC_HEIGHT = 192;

const INFO_SQUARE_SIZE = 160;

const ALL_CHAR = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+,.<>?:;[]{}\'\"\|/\\";

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
const COLOR_PURPLE = "#c073ff";
const COLOR_PURPLE_PASTEL = "#eba0e1";

const PEN_COLORS = [COLOR_BLACK, COLOR_RED, COLOR_BLUE];
const HIGHLIGHT_COLORS = ["#ffff0080", "#ff800080", "#00ff0080", "#0080ff80", "#ff00ff80"];
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

let AWARD_FIRST_USE;
let AWARD_ONE_HUNDREN;

let SFX_DELETE;
let SFX_TYPING_0;
let SFX_TYPING_1;
let SFX_TYPING_2;
let SFX_TYPING_3;
let SFX_BEEP;
// ********************************

let currentItemIndex = 0;

let state = 0;
let selectedItem = {
  type: "",
  id: -1
};
let trashAnim = {
  deleteDone: false,
  radius: 0,
  speed: 0.35,
  angleSpeed: 0.1,
  angle: -90
};

let showAddMenu = false;
let editingNote = false;
let isShowingTooltip = false;
let currentTooltip = "";

let displayLevelHeight = 0;
let scrollPos = 0;
let scrolledDown = false;

let noteThumbnailContainer = [];
let magnetContainer = [];

let hoveredDraggables = [];

let noteContainer = [];

let user;
let charGrid;
let levelProgress;

let infoTypedKeys;
let infoCheckedBoxes;
let infoSpaceEfficiency;
let infoChallengesDone;
let infoMagnets;
let infoDuration;
let infoArray = [];

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

  AWARD_ONE_HUNDREN = loadImage("assets/images/award_100.png");
  AWARD_FIRST_USE = loadImage("assets/images/award_firstuse.png");

  SFX_DELETE = loadSound("assets/sounds/delete.mp3");
  SFX_TYPING_0 = loadSound("assets/sounds/typing_1.mp3");
  SFX_TYPING_1 = loadSound("assets/sounds/typing_2.mp3");
  SFX_TYPING_2 = loadSound("assets/sounds/typing_3.mp3");
  SFX_TYPING_3 = loadSound("assets/sounds/typing_4.mp3");
  SFX_BEEP = loadSound("assets/sounds/beep.mp3");
}

// setup main screen
function setup() {
  createCanvas(windowWidth, windowHeight * 2);
  noStroke();

  setupUser();
  setupSounds();

  setupMainMenuBtns();
  setupNoteEditorBtns();
  setupFirstUse();
}

function draw() {
  background(COLOR_GREY_LIGHT);
  if (editingNote) {
    displayNoteEditor();
  } else {
    displayMainMeun();
    displayUserInfo();
    displayNoteThumbnails();
    displayAwards();
    if (showAddMenu) {
      displayAddMenu();
    }
    displayTrashCan();
  }
  if (isShowingTooltip) {
    displayTooltip();
  }
}

function setupSounds(){
  SFX_DELETE.setVolume(0.2);
  let typingVol = 0.08;
  SFX_TYPING_0.setVolume(typingVol);
  SFX_TYPING_1.setVolume(typingVol);
  SFX_TYPING_2.setVolume(typingVol);
  SFX_TYPING_3.setVolume(typingVol);
  SFX_BEEP.setVolume(0.1);
}

function setupUser() {
  user = new User();
  levelProgress = new Progress(0, 5, nextLevelXp(1));
  infoTypedKeys = new InfoSquare(0, 0, "Typed", 11, "Keystroke(s)", COLOR_BLUE);
  infoCheckedBoxes = new InfoSquare(INFO_SQUARE_SIZE + MARGIN / 2, 0, "Checked", 5, "Checkbox(es)", COLOR_RED);
  infoSpaceEfficiency = new InfoSquare((INFO_SQUARE_SIZE + MARGIN / 2) * 2, 0, "Use of Space", 55, "Efficiency", COLOR_GREEN, "%");
  infoChallengesDone = new InfoSquare(0, INFO_SQUARE_SIZE + MARGIN / 2, "Completed", 2, "Challenge(s)", COLOR_ORANGE);
  infoMagnets = new InfoSquare(INFO_SQUARE_SIZE + MARGIN / 2, INFO_SQUARE_SIZE + MARGIN / 2, "Earned", 1, "Magnet(s)", COLOR_PURPLE);
  infoDuration = new InfoSquare((INFO_SQUARE_SIZE + MARGIN / 2) * 2, INFO_SQUARE_SIZE + MARGIN / 2, "User for", 1, "day(s)", COLOR_YELLOW);
  infoArray = [infoTypedKeys, infoCheckedBoxes, infoSpaceEfficiency, infoChallengesDone, infoMagnets, infoDuration];
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
  btnPlayful.connectFunc(function() {
    createNote(0);
  });
  //btnPlayful.disabled = true;
  btnTerminal = new ButtonIcon(menuPosX + ADD_MENU_HEIGHT, menuPosY + ADD_MENU_HEIGHT / 2 - 16, ADD_MENU_HEIGHT / downSizeRatio, ADD_MENU_HEIGHT / downSizeRatio, ICON_NOTE_TERMINAL);
  btnTerminal.connectFunc(function() {
    createNote(1);
  });
  //btnTerminal.disabled = true;
  btnPlain = new ButtonIcon(menuPosX + ADD_MENU_HEIGHT * 1.6, menuPosY + ADD_MENU_HEIGHT / 2 - 16, ADD_MENU_HEIGHT / downSizeRatio, ADD_MENU_HEIGHT / downSizeRatio, ICON_NOTE_PLAIN);
  btnPlain.connectFunc(function() {
    createNote(2);
  });
}

// set up buttons in note editor
function setupNoteEditorBtns() {
  // top left corner
  btnClose = new ButtonIcon(64, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_CLOSE);
  btnShare = new ButtonIcon(128, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_SHARE);
  btnShare.tooltip = "READY TO COPY THE NOTE";
  // bottom center left
  btnCheckbox = new ButtonIcon(windowWidth / 2 - MAX_NOTE_SIZE / 2, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_CHECKBOX, false);
  btnCheckbox.tooltip = "ADD A CHECKBOX";
  btnUnderline = new ButtonIcon(windowWidth / 2 - MAX_NOTE_SIZE / 2 + 64, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_UNDERLINE, true);
  btnUnderline.tooltip = "UNDERLINE";
  btnHighlight = new ButtonIcon(windowWidth / 2 - MAX_NOTE_SIZE / 2 + 128, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_HIGHLIGHT, true);
  btnHighlight.tooltip = "HIGHLIGHT";
  // bottom center right
  btnMarkupColor = new ButtonColor(windowWidth / 2 + MAX_NOTE_SIZE / 2 - 48, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, PEN_COLORS, 0);
  btnMarkupColor.disabled = true;
  btnMarkupColor.tooltip = "MARKUP COLOR";
  btnBgColor = new ButtonColor(windowWidth / 2 + MAX_NOTE_SIZE / 2, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, COLORS_NOTE_PLAYFUL, 1, ICON_BGCOLOR);
  btnBgColor.tooltip = "BACKGROUND COLOR";
  btnTextColor = new ButtonColor(windowWidth / 2 + MAX_NOTE_SIZE / 2, windowHeight - TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, COLORS_NOTE_PLAYFUL, 1, ICON_TEXTCOLOR);
  btnTextColor.tooltip = "TEXT COLOR";

  connectEditorBtns();
}

function connectEditorBtns() {
  // close note
  btnClose.connectFunc(function() {
    editingNote = false;
    updateNoteThumbnail();
    resizeCanvas(windowWidth, windowHeight*2);
    resetUserStatisticsAnimation();
  });
  // share function
  btnShare.connectFunc(function() {
    setTimeout(function() {
      charGrid.copyNote();
    }, 200);
    console.log("Text copied.");
  });
  // check box function
  btnCheckbox.connectFunc(function() {
    charGrid.addCheckButton();
    if (charGrid.theme === 1){
      SFX_BEEP.play();
    }
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

  btnMarkupColor.connectFunc(function() {
    if (btnMarkupColor.colorIndex < btnMarkupColor.colorProfile.length - 1) {
      btnMarkupColor.colorIndex += 1;
    } else {
      btnMarkupColor.colorIndex = 0;
    }
    if (charGrid.underlineEnabled) {
      penColorIndex = btnMarkupColor.colorIndex;
    } else if (charGrid.highlightEnabled) {
      highlighColorIndex = btnMarkupColor.colorIndex;
    }
  });

  btnBgColor.connectFunc(function() {
    if (btnBgColor.colorIndex < btnBgColor.colorProfile.length - 1) {
      btnBgColor.colorIndex += 1;
    } else {
      btnBgColor.colorIndex = 0;
    }
    charGrid.bgColor = btnBgColor.colorProfile[btnBgColor.colorIndex];
    if (charGrid.theme === 2) {
      if (btnTextColor.colorIndex < btnTextColor.colorProfile.length - 1) {
        btnTextColor.colorIndex += 1;
      } else {
        btnTextColor.colorIndex = 0;
      }
      charGrid.textColor = btnTextColor.colorProfile[btnTextColor.colorIndex];
    }
  });
  btnTextColor.connectFunc(function() {
    if (btnTextColor.colorIndex < btnTextColor.colorProfile.length - 1) {
      btnTextColor.colorIndex += 1;
    } else {
      btnTextColor.colorIndex = 0;
    }
    charGrid.textColor = btnTextColor.colorProfile[btnTextColor.colorIndex];
    if (charGrid.theme === 1){
      charGrid.updateMarkupColor();
    }
  });
}

function setupFirstUse() {
  let titles = ["Double click to open a sticky note", "Drag the note near the trash can to delete it", "Add a new note in the top right corner", "Scroll down to see your progress and rewards"];
  for (let i = 0; i < titles.length; i++) {
    let id = getItemId();
    let rX = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowWidth - NOTE_THUMBNIAL_SIZE - MARGIN);
    let rY = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowHeight - NOTE_THUMBNIAL_SIZE - MARGIN);
    let noteThumbnail, note;
    if (i === 2) {
      noteThumbnail = new DraggableNote(rX, rY, COLOR_WHITE, COLOR_BLACK, 2, titles[i], id);
      note = new CharGrid(2, COLOR_WHITE, COLOR_BLACK, id);
    } else if (i === 3) {
      let randColor = random(COLORS_THEME);
      noteThumbnail = new DraggableNote(rX, rY, COLOR_BLACK, randColor, 1, titles[i], id);
      note = new CharGrid(1, COLOR_BLACK, randColor, id);
    } else {
      let randColor = random(COLORS_NOTE_PLAYFUL);
      noteThumbnail = new DraggableNote(rX, rY, randColor, COLOR_BLACK, 0, titles[i], id);
      note = new CharGrid(0, randColor, COLOR_BLACK, id);
    }
    note.addLine(titles[i]);
    noteContainer.push(note);
    noteThumbnailContainer.push(noteThumbnail);
  }
  let rX = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowWidth - NOTE_THUMBNIAL_SIZE - MARGIN);
  let rY = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowHeight - NOTE_THUMBNIAL_SIZE - MARGIN);
  let magnet = new DraggableAward(rX, rY, COLOR_RED, AWARD_FIRST_USE, noteThumbnailContainer.length);
  magnetContainer.push(magnet);
}

function displayNoteThumbnails() {
  for (let i = 0; i < noteContainer.length; i++) {
    noteThumbnailContainer[i].display();
  }
}

function displayAwards(){
  for(let i = 0;i<magnetContainer.length; i++){
    magnetContainer[i].display();
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
  text("Noteeboardd", windowWidth / 2, TOP_MENU_HEIGHT / 2 + (MARGIN / 2));
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
  if (noteContainer.length === 0) {
    textSize(32);
    fill(COLOR_WHITE);
    text("Add a note and start typing!", windowWidth / 2, windowHeight / 2);
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
    ellipse(mouseX + radius / 2, mouseY - radius / 2, radius);
    fill(COLOR_BLACK);
    arc(mouseX + radius / 2, mouseY - radius / 2, radius, radius, -90, trashAnim.angle);
    if (trashAnim.angle >= 269 && !trashAnim.deleteDone) {
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
  switch (charGrid.theme) {
    case 0:
      btnMarkupColor.display();
      btnBgColor.display();
      break;
    case 1:
      btnTextColor.display();
      break;
    case 2:
      btnMarkupColor.display();
      btnBgColor.display();
  }

}

function displayTooltip() {
  push();
  fill(COLOR_WHITE);
  textFont(FONT_PLAYFUL);
  textSize(16);
  textAlign(LEFT, CENTER);
  let tipPosX = mouseX;
  let tipPosY = mouseY + 24;
  if (mouseX > windowWidth - textWidth(currentTooltip)) {
    tipPosX -= textWidth(currentTooltip);
  }
  text(currentTooltip, tipPosX, tipPosY);
  pop();
}

function showTooltip(text) {
  currentTooltip = text;
  isShowingTooltip = true;
}

function displayUserInfo() {
  // bg
  push();
  rectMode(CORNER);
  fill(COLOR_BLACK);
  rect(0, windowHeight, windowWidth, windowHeight);
  pop();
  displayLevel();
  displayStatistics();
  displayChallenages();
}

function displayLevel() {
  push();
  rectMode(CENTER);
  textFont(FONT_PLAYFUL);
  translate(windowWidth / 2, windowHeight + TOP_MENU_HEIGHT);

  let width = 96;
  let progressHeight = levelProgress.getConvertedValue(0, width);
  // animation
  if (scrolledDown) {
    displayLevelHeight = lerp(displayLevelHeight, progressHeight, 0.05);
  }
  // visualization
  fill(COLOR_GREY_DARK);
  rect(-width, 0, width * 1.05, width * 1.05, 8);
  stroke(COLOR_GREY_DARK);
  strokeWeight(4);
  fill(COLOR_BLUE);
  if (displayLevelHeight >= 10) {
    rect(-width, (width * 1.05) / 2 - displayLevelHeight / 2, width, displayLevelHeight, 8);
  }
  // text
  noStroke();
  fill(COLOR_WHITE);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(user.info.xp + "/" + nextLevelXp(user.info.level), -width, width / 3);
  textAlign(LEFT, CENTER);
  textSize(48);
  text("Level " + user.info.level, width / 2 - MARGIN, 0);
  pop();
}

function displayStatistics() {
  push();
  let translateX = windowWidth/2 - (INFO_SQUARE_SIZE*3 + MARGIN*2);
  let translateY = windowHeight + TOP_MENU_HEIGHT * 4;
  translate(translateX, translateY);
  textAlign(LEFT,CENTER);
  textFont(FONT_PLAYFUL);
  fill(COLOR_WHITE);
  textSize(64);
  text("Statistics", 0, -MARGIN*2);
  // info squares
  for (let i = 0; i < infoArray.length; i++) {
    infoArray[i].display(translateX, translateY);
  }
  pop();
}

function displayChallenages(){
  push();
  let translateX = windowWidth - (INFO_SQUARE_SIZE*3 + MARGIN*6);
  let translateY = windowHeight + TOP_MENU_HEIGHT * 4;
  translate(translateX, translateY);
  textAlign(LEFT,CENTER);
  textFont(FONT_PLAYFUL);
  fill(COLOR_WHITE);
  textSize(64);
  text("Challenges", 0, -MARGIN*2);
  noFill();
  stroke(COLOR_WHITE);
  strokeWeight(2);
  rect(0,0,(INFO_SQUARE_SIZE*3 + MARGIN), (INFO_SQUARE_SIZE*2 + MARGIN/2), 16);
  pop();
}

function resetUserStatisticsAnimation(){
  displayLevelHeight = 0;
  scrolledDown = false;
  for (let i = 0; i < infoArray.length; i++) {
    infoArray[i].reset();
  }
}

// update dragged item
function updateSelectedItem(type, id) {
  selectedItem.type = type;
  selectedItem.id = id;
}

function updateDraggableItems(obj, state) {
  if (state) {
    if (!hoveredDraggables.includes(obj)) {
      hoveredDraggables.push(obj);
    }
  } else {
    removeFromArray(hoveredDraggables, obj);
  }
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

function deleteNote(id) {
  cursor(ARROW);
  updateSelectedItem("", -1);
  removeFromArrayByItemId(noteContainer, id);
  console.log("\"" + removeFromArrayByItemId(noteThumbnailContainer, id).title + "\" is deleted.");
  trashAnim.deleteDone = true;
  hoveredDraggables = [];

  SFX_DELETE.play();
}

function createNote(theme) {
  if (noteContainer.length < MAX_NOTE_NUM) {
    let randId = getItemId();
    let rX = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowWidth - NOTE_THUMBNIAL_SIZE - MARGIN);
    let rY = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowHeight - NOTE_THUMBNIAL_SIZE - MARGIN);
    let newNote, newNoteThumbnail;
    switch (theme) {
      case 0:
        newNote = new CharGrid(theme, COLOR_YELLOW_PASTEL, COLOR_BLACK, randId);
        newNoteThumbnail = new DraggableNote(rX, rY, COLOR_YELLOW_PASTEL, COLOR_BLACK, theme, "", randId);
        break;
      case 1:
        newNote = new CharGrid(theme, COLOR_BLACK, COLOR_ORANGE, randId);
        newNoteThumbnail = new DraggableNote(rX, rY, COLOR_BLACK, COLOR_ORANGE, theme, "", randId);
        break;
      case 2:
        newNote = new CharGrid(theme, COLOR_WHITE, COLOR_BLACK, randId);
        newNoteThumbnail = new DraggableNote(rX, rY, COLOR_WHITE, COLOR_BLACK, theme, "", randId);
    }
    noteContainer.push(newNote);
    noteThumbnailContainer.push(newNoteThumbnail);
    console.log("A new note is created. Theme: " + theme);
  } else {
    console.log("Cannot create note. Max number reached.");
  }
}

function openNote(id) {
  for (let i = 0; i < noteContainer.length; i++) {
    if (id === noteContainer[i].id) {
      charGrid = noteContainer[i];
      // update buttons for different themes
      switch (charGrid.theme) {
        case 0:
          btnBgColor.colorProfile = COLORS_NOTE_PLAYFUL;
          btnBgColor.colorIndex = COLORS_NOTE_PLAYFUL.indexOf(charGrid.bgColor);
          charGrid.resetAnimation();
          break;
        case 1:
          btnTextColor.posX = windowWidth / 2 + MAX_NOTE_SIZE / 2;
          btnTextColor.colorProfile = COLORS_THEME;
          btnTextColor.colorIndex = COLORS_THEME.indexOf(charGrid.textColor);
          break;
        case 2:
          btnBgColor.colorProfile = COLORS_NOTE_PLAIN;
          btnBgColor.colorIndex = COLORS_NOTE_PLAIN.indexOf(charGrid.bgColor);
          btnTextColor.colorProfile = COLORS_NOTE_PLAIN;
          btnTextColor.colorIndex = COLORS_NOTE_PLAIN.indexOf(charGrid.textColor);
      }
      charGrid.toggleHighlight(btnHighlight.toggled);
      charGrid.toggleUnderline(btnUnderline.toggled);
    }
  }
  editingNote = true;
  resizeCanvas(windowWidth, windowHeight);
}

function updateNoteThumbnail() {
  for (let i = 0; i < noteThumbnailContainer.length; i++) {
    if (charGrid.id === noteThumbnailContainer[i].id) {
      noteThumbnailContainer[i].bgColor = charGrid.bgColor;
      noteThumbnailContainer[i].textColor = charGrid.textColor;
      noteThumbnailContainer[i].title = charGrid.getFirstLine();
    }
  }
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
    openNote(selectedItem.id);
    console.log("Open note " + selectedItem.id);
    for (let i = 0; i < noteThumbnailContainer.length; i++) {
      if (noteThumbnailContainer[i].id === selectedItem.id) {
        noteThumbnailContainer[i].forget();
      }
    }
    updateSelectedItem("", -1);
    hoveredDraggables = [];
    cursor(ARROW);
  }
}

// check for delete and return key
function keyPressed() {
  if (editingNote) {
    // delete
    if (keyCode === 8) {
      charGrid.removeChar();
      playTypingSound();
    }
    // return
    if (keyCode === 13) {
      charGrid.addChar("\n");
      playTypingSound(0);
      /*
      if (charGrid.theme === 0){
        charGrid.returnAnimH = MAX_NOTE_SIZE/CHAR_HEIGHT;
        charGrid.returnAnimDone = false;
      }*/
    }
    if (keyCode === 32){
      playTypingSound(0);
    }
  }
}

// check for character typed
function keyTyped() {
  if (editingNote) {
    if (ALL_CHAR.includes(key)) {
      charGrid.addChar(key);
      playTypingSound();
    }
  }
}

function mouseWheel(event) {
  if (document.documentElement.scrollTop > windowHeight / 4) {
    scrolledDown = true;
  }
}

function playTypingSound(id){
  if (charGrid.theme === 1){
    if (id === 0){
      SFX_TYPING_0.play();
    }else{
      let r = random();
      if (r >= 0.33){
        SFX_TYPING_1.play();
      }else if (r >= 0.66){
        SFX_TYPING_2.play();
      }else{
        SFX_TYPING_3.play();
      }
    }
  }
}

function removeFromArray(array, obj) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      let tempLast = array[array.length - 1];
      array[array.length - 1] = array[i];
      array[i] = tempLast;
      return array.pop();
    }
  }
  return null;
}

function removeFromArrayByItemId(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      let tempLast = array[array.length - 1];
      array[array.length - 1] = array[i];
      array[i] = tempLast;
      return array.pop();
    }
  }
  return null;
}

function getItemId() {
  return currentItemIndex++;
}

function findTopItem() {
  let top = hoveredDraggables[0];
  for (let i = 1; i < hoveredDraggables.length; i++) {
    if (top.type === "AWARD") {
      if (hoveredDraggables[i].type === "AWARD" && hoveredDraggables[i].id > top.id){
        top = hoveredDraggables[i];
      }
    }else{
      if (hoveredDraggables[i].type === "AWARD"){
        top = hoveredDraggables[i];
      }else{
        if (hoveredDraggables[i].id > top.id){
          top = hoveredDraggables[i];
        }
      }
    }
  }
  return top;
}

function gainXp(xp) {

}

function nextLevelXp(level) {
  return Math.round(0.8 * level * level + 10 * level);
}
