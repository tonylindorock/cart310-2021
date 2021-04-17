"use strict";
/*****************

Noteeboardd
Yichen Wang

CART 310 Final Project

Noteeboardd is a playful, minimalistic note/text editor.

FONTS FROM:
https://www.1001fonts.com/goldie-boxing-font.html
https://webfonts.ffonts.net/04b03.font.download

SOUND purchase FROM:
https://www.youtube.com/watch?v=4kVTqUxJYBA
SOUND message FROM:
YouTube Audio Library
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
let TOP_MENU_HEIGHT = 84;

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
let ICON_PURGE;
let ICON_DISABLED;

let ICON_CLOSE;
let ICON_SHARE;
let ICON_UNDERLINE;
let ICON_HIGHLIGHT;
let ICON_CHECKBOX;
let ICON_TEXTCOLOR;
let ICON_BGCOLOR;

let AWARD_FIRST_USE;
let AWARD_LIGHTBULB;
let AWARD_ROCKET;
let AWARDS;

let GIFT_ROCKET;
let GIFT_LIGHTBULB;
let GIFTS;
// ********************************
// **************** SOUNDS ****************
let SFX_DELETE;
let SFX_TYPING_0;
let SFX_TYPING_1;
let SFX_TYPING_2;
let SFX_TYPING_3;
let SFX_BEEP;
let SFX_CREATENOTE;
let SFX_PURCHASE;
let SFX_MSG;
let SFX_NO_POINTS;
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
let giftShop = {
  item0Sold: false,
  item1Sold: false,
  item0Price: 60,
  item1Price: 40,
  item0Id: 1,
  item1Id: 2,
  item0: null,
  item1: null
}
let userActivity = {
  inactive: false,
  timer: null
};
let sessionStats = {
  keyStrokes: 0,
  checkBoxes: 0,
  earnedPoints: 0
}

let showAddMenu = false;
let editingNote = false;
let isShowingTooltip = false;
let currentTooltip = "";

let displayPointHeight = 0;
let scrollPos = 0;
let scrolledDown = false;

let noteThumbnailContainer = [];
let magnetContainer = [];

let hoveredDraggables = [];

let noteContainer = [];

let user;
let charGrid;
let pointProgress;
let notification;

let infoTypedKeys;
let infoCheckedBoxes;
let infoSpaceEfficiency;
let infoPointsEarned;
let infoMagnets;
let infoDuration;
let infoArray = [];

let btnAdd;
let btnPurge;
let btnPlayful;
let btnTerminal;
let btnPlain;

let btnGift0;
let btnGift1;

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
  ICON_PURGE = loadImage("assets/images/icon_purge.png");
  ICON_ADD = loadImage("assets/images/icon_add.png");
  ICON_DISABLED = loadImage("assets/images/icon_disabled.png");
  ICON_CLOSE = loadImage("assets/images/icon_close.png");
  ICON_SHARE = loadImage("assets/images/icon_share.png");
  ICON_UNDERLINE = loadImage("assets/images/icon_underline.png");
  ICON_HIGHLIGHT = loadImage("assets/images/icon_highlight.png");
  ICON_CHECKBOX = loadImage("assets/images/icon_checkbox.png");
  ICON_TEXTCOLOR = loadImage("assets/images/icon_text.png");
  ICON_BGCOLOR = loadImage("assets/images/icon_bg.png");

  AWARD_FIRST_USE = loadImage("assets/images/award_firstuse.png");
  AWARD_ROCKET = loadImage("assets/images/award_rocket.png");
  AWARD_LIGHTBULB = loadImage("assets/images/award_lightbulb.png");
  AWARDS = [AWARD_FIRST_USE, AWARD_ROCKET, AWARD_LIGHTBULB];

  GIFT_LIGHTBULB = loadImage("assets/images/gift_lightbulb.png");
  GIFT_ROCKET = loadImage("assets/images/gift_rocket.png");
  GIFTS = [GIFT_ROCKET, GIFT_LIGHTBULB];

  SFX_DELETE = loadSound("assets/sounds/delete.mp3");
  SFX_TYPING_0 = loadSound("assets/sounds/typing_1.mp3");
  SFX_TYPING_1 = loadSound("assets/sounds/typing_2.mp3");
  SFX_TYPING_2 = loadSound("assets/sounds/typing_3.mp3");
  SFX_TYPING_3 = loadSound("assets/sounds/typing_4.mp3");
  SFX_BEEP = loadSound("assets/sounds/beep.mp3");
  SFX_CREATENOTE = loadSound("assets/sounds/create.mp3");
  SFX_PURCHASE = loadSound("assets/sounds/purchase.mp3");
  SFX_MSG = loadSound("assets/sounds/message.mp3");
  SFX_NO_POINTS = loadSound("assets/sounds/not_enough_points.mp3");
}

// setup main screen
function setup() {
  createCanvas(windowWidth, windowHeight * 2);
  noStroke();

  TOP_MENU_HEIGHT = windowHeight / 8.5;

  setupSounds();

  setupUser();
  if (!loadUserData()) {
    setupFirstUse();
  } else {
    setupContinuedUse();
  }
  setupGiftShop();

  setupMainMenuBtns();
  setupNoteEditorBtns();

  updateStatistics();
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
  notification.display();

  autoSave();
}

function setupSounds() {
  SFX_DELETE.setVolume(0.3);
  let typingVol = 0.08;
  SFX_TYPING_0.setVolume(typingVol);
  SFX_TYPING_1.setVolume(typingVol);
  SFX_TYPING_2.setVolume(typingVol);
  SFX_TYPING_3.setVolume(typingVol);
  SFX_BEEP.setVolume(0.1);
  SFX_CREATENOTE.setVolume(0.1);
  SFX_PURCHASE.setVolume(0.3);
  SFX_MSG.setVolume(0.2);
  SFX_NO_POINTS.setVolume(0.08);
}

function setupUser() {
  user = new User();
  pointProgress = new Progress(0, user.info.points, 99);

  infoTypedKeys = new InfoSquare(0, 0, "Typed", 11, "Keystroke(s)", COLOR_BLUE);
  infoCheckedBoxes = new InfoSquare(INFO_SQUARE_SIZE + MARGIN / 2, 0, "Checked", 5, "Checkbox(es)", COLOR_RED);
  infoSpaceEfficiency = new InfoSquare((INFO_SQUARE_SIZE + MARGIN / 2) * 2, 0, "Use of Space", 55, "Efficiency", COLOR_GREEN, "%");
  infoPointsEarned = new InfoSquare(0, INFO_SQUARE_SIZE + MARGIN / 2, "Earned in total", 2, "Point(s)", COLOR_ORANGE);
  infoMagnets = new InfoSquare(INFO_SQUARE_SIZE + MARGIN / 2, INFO_SQUARE_SIZE + MARGIN / 2, "Obtained", 1, "Magnet(s)", COLOR_PURPLE);
  infoDuration = new InfoSquare((INFO_SQUARE_SIZE + MARGIN / 2) * 2, INFO_SQUARE_SIZE + MARGIN / 2, "User for", 1, "day(s)", COLOR_YELLOW);

  infoArray = [infoTypedKeys, infoCheckedBoxes, infoSpaceEfficiency, infoPointsEarned, infoMagnets, infoDuration];

  notification = new Notification();
}

function setupGiftShop() {
  let lastSoldOut = false;
  if (user.info.gifts[0] === -1 && user.info.gifts[1] === -1 && !user.info.todayUsed) {
    lastSoldOut = true;
  }
  if (user.info.gifts[0] >= 0) {
    setupGiftItem(0, user.info.gifts[0]);
  } else {
    if (lastSoldOut) {
      setupGiftItem(0, user.info.themesObtained.includes(0) ? 1 : 0);
    } else {
      giftShop.item0Sold = true;
    }
  }
  if (user.info.gifts[1] >= 0) {
    setupGiftItem(1, user.info.gifts[1]);
  } else {
    if (lastSoldOut) {
      setupGiftItem(1, int(random(2, 4)));
    } else {
      giftShop.item1Sold = true;
    }
  }
}

function setupGiftItem(id, uniqueId) {
  let translateX = windowWidth / 2 + MARGIN;
  let translateY = windowHeight + TOP_MENU_HEIGHT * 4;
  let w = INFO_SQUARE_SIZE * 3 + MARGIN;
  let h = INFO_SQUARE_SIZE * 2 + MARGIN / 2;
  let size = 160;

  let gift;
  if (id === 0) {
    gift = new GiftItem(uniqueId);
    giftShop.item0Price = gift.price;
    giftShop.item0 = gift.func;
    giftShop.item0Id = gift.id;
    btnGift0 = new ButtonIcon(translateX + w / 2 - 80 - MARGIN / 2, translateY + h / 2 - MARGIN, size, size, gift.icon);
    btnGift0.rotateIcon();
    btnGift0.connectFunc(function() {
      if (user.usePoints(giftShop.item0Price)) {
        giftShop.item0Sold = true;
        //btnGift0.disabled = true;
        btnGift0.forget();
        giftShop.item0();
        updateStatistics();
        SFX_PURCHASE.play();
        saveUserData();
      }
    });
    btnGift0.tooltip = gift.des;
  } else {
    gift = new GiftItem(uniqueId);
    giftShop.item1Price = gift.price;
    giftShop.item1 = gift.func;
    giftShop.item1Id = gift.id;
    btnGift1 = new ButtonIcon(translateX + w / 2 + 80 + MARGIN / 2, translateY + h / 2 - MARGIN, size, size, gift.icon);
    btnGift1.rotateIcon();
    btnGift1.connectFunc(function() {
      if (user.usePoints(giftShop.item1Price)) {
        giftShop.item1Sold = true;
        //btnGift1.disabled = true;
        btnGift1.forget();
        giftShop.item1();

        updateStatistics();
        SFX_PURCHASE.play();
        saveUserData();
      }
    });
    btnGift1.tooltip = gift.des;
  }
}

// setup all the main menu buttons
function setupMainMenuBtns() {
  btnPurge = new ButtonIcon(32, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_PURGE);
  btnPurge.tooltip = "PURGE ALL DATA";
  // create note butotn
  btnAdd = new ButtonIcon(windowWidth - 64, TOP_MENU_HEIGHT / 2, UNI_BTN_HEIGHT, UNI_BTN_HEIGHT, ICON_ADD);
  btnAdd.tooltip = "ADD A NOTE";

  let menuPosX = windowWidth - 48 - ADD_MENU_WIDTH;
  let menuPosY = TOP_MENU_HEIGHT / 2 + UNI_BTN_HEIGHT / 2;
  let downSizeRatio = 1.75;
  // note theme button
  btnPlayful = new ButtonIcon(menuPosX + ADD_MENU_HEIGHT * 0.4, menuPosY + ADD_MENU_HEIGHT / 2 - 16, ADD_MENU_HEIGHT / downSizeRatio, ADD_MENU_HEIGHT / downSizeRatio, ICON_NOTE_PLAYFUL);
  btnPlayful.rotateIcon();
  if (!user.info.themesObtained.includes(0)) {
    btnPlayful.disabled = true;
  }

  btnTerminal = new ButtonIcon(menuPosX + ADD_MENU_HEIGHT, menuPosY + ADD_MENU_HEIGHT / 2 - 16, ADD_MENU_HEIGHT / downSizeRatio, ADD_MENU_HEIGHT / downSizeRatio, ICON_NOTE_TERMINAL);
  btnTerminal.rotateIcon();
  if (!user.info.themesObtained.includes(1)) {
    btnTerminal.disabled = true;
  }

  btnPlain = new ButtonIcon(menuPosX + ADD_MENU_HEIGHT * 1.6, menuPosY + ADD_MENU_HEIGHT / 2 - 16, ADD_MENU_HEIGHT / downSizeRatio, ADD_MENU_HEIGHT / downSizeRatio, ICON_NOTE_PLAIN);
  btnPlain.rotateIcon();

  connectMainMenuBtns();
}

function connectMainMenuBtns() {
  btnPurge.connectFunc(function() {
    setTimeout(function() {
      if (confirm("Are you sure you want to purge all data?")) {
        removeItem('user');
        location.reload();
        console.log("All data erased!");
      }
    }, 200);
  });

  btnAdd.connectFunc(function() {
    showAddMenu = !showAddMenu;
  });

  btnPlayful.connectFunc(function() {
    createNote(0);
  });

  btnTerminal.connectFunc(function() {
    createNote(1);
  });

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
    saveUserData();
    updateNoteThumbnail();
    resizeCanvas(windowWidth, windowHeight * 2);
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
    if (charGrid.theme === 1) {
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
    if (charGrid.theme === 1) {
      charGrid.updateMarkupColor();
    }
  });
}

function setupFirstUse() {
  user.info.startDay = day();
  user.info.startMonth = month() - 1;
  user.info.startYear = year();
  user.info.todayUsed = true;

  notification.update("Hello! Welcome to Noteeboardd!");
  notification.update("You get 10 points for being a new user!");
  user.addPoints(10);
  notification.update("Start typing!");

  let titles = ["Double click to open a sticky note", "Drag the note to the trash can to delete it", "Add a new note in the top right corner", "Scroll down to see your progress and the gift shop"];
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
  let magnet = new DraggableAward(rX, rY, COLOR_RED, AWARD_FIRST_USE, getItemId());
  magnetContainer.push(magnet);
}

function setupContinuedUse() {
  notification.update("Hello! Welcome back!");
  if (!user.info.todayUsed) {
    notification.update("Here's your daily 10 points!");
    user.addPoints(10);
    user.info.todayUsed = true;
  }
  loadContainers();
}

function displayNoteThumbnails() {
  for (let i = 0; i < noteContainer.length; i++) {
    noteThumbnailContainer[i].display();
  }
}

function displayAwards() {
  for (let i = 0; i < magnetContainer.length; i++) {
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
  btnPurge.display();
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
    fill(COLOR_WHITE);
    ellipse(MARGIN + size / 2, windowHeight - MARGIN - size / 2, size * 1.5);
    image(ICON_TRASH_BLACK, MARGIN + size / 2, windowHeight - MARGIN - size / 2, size, size);
    trashAnim.angle = lerp(trashAnim.angle, 270, trashAnim.angleSpeed);
    let radius = 32;
    stroke(COLOR_WHITE);
    strokeWeight(4);
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
  text(currentTooltip.toUpperCase(), tipPosX, tipPosY);
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
  fill(COLOR_ORANGE);
  textAlign(RIGHT);
  textFont(FONT_PLAYFUL);
  textSize(20);
  text(CHAR_WIDTH * 2 + " keystrokes = 1 point\n5 checked checkboxes = 1 point\nevery day +10 points", windowWidth - MARGIN, windowHeight + MARGIN * 1.5);
  pop();
  displayPoints();
  displayStatistics();
  displayGiftShop();
}

function displayPoints() {
  push();
  rectMode(CENTER);
  textFont(FONT_PLAYFUL);
  translate(windowWidth / 2, windowHeight + TOP_MENU_HEIGHT);

  let height = 96;
  let progressHeight = pointProgress.getConvertedValue(0, height);
  // animation
  if (scrolledDown) {
    displayPointHeight = lerp(displayPointHeight, progressHeight, 0.05);
  }
  // visualization
  fill(COLOR_GREY_DARK);
  rect(-height, 0, height * 1.05, height * 1.05, 6);
  stroke(COLOR_GREY_DARK);
  strokeWeight(4);
  fill(COLOR_ORANGE);
  let tempHeight = Math.round(displayPointHeight);
  if (tempHeight >= 8) {
    rect(-height, (height * 1.05) / 2 - tempHeight / 2, height, tempHeight, 6);
  }

  // text
  noStroke();
  fill(COLOR_WHITE);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(user.info.points + "/99", -height, height / 3);
  textAlign(LEFT, CENTER);
  textSize(48);
  text("Points", height / 2 - MARGIN, 0);
  pop();
}

function displayStatistics() {
  push();
  let translateX = windowWidth / 2 - (INFO_SQUARE_SIZE * 3 + MARGIN) - MARGIN;
  let translateY = windowHeight + TOP_MENU_HEIGHT * 4;
  translate(translateX, translateY);
  textAlign(LEFT, CENTER);
  textFont(FONT_PLAYFUL);
  fill(COLOR_WHITE);
  textSize(64);
  text("Statistics", 0, -MARGIN * 2);
  // info squares
  for (let i = 0; i < infoArray.length; i++) {
    infoArray[i].display(translateX, translateY);
  }
  pop();
}

function displayGiftShop() {
  push();
  let translateX = windowWidth / 2 + MARGIN;
  let translateY = windowHeight + TOP_MENU_HEIGHT * 4;

  translate(translateX, translateY);
  textAlign(LEFT, CENTER);
  textFont(FONT_PLAYFUL);
  fill(COLOR_WHITE);
  textSize(64);
  text("Gift Shop", 0, -MARGIN * 2);
  // outline
  noFill();
  stroke(COLOR_WHITE);
  strokeWeight(2);
  let w = INFO_SQUARE_SIZE * 3 + MARGIN;
  let h = INFO_SQUARE_SIZE * 2 + MARGIN / 2;
  rect(0, 0, w, h, 16);

  // hint
  noStroke();
  textAlign(LEFT, CENTER);
  fill(COLOR_GREY);
  textSize(20);
  if (giftShop.item0Sold && giftShop.item1Sold) {
    text("New items will be available tomorrow", MARGIN / 2, h - MARGIN);
  } else {
    text("These items will be available for 7 days", MARGIN / 2, h - MARGIN);
  }
  pop();
  // items
  if (!giftShop.item0Sold) {
    btnGift0.display();
  }
  if (!giftShop.item1Sold) {
    btnGift1.display();
  }

  push();
  translate(translateX, translateY);
  angleMode(DEGREES);
  textFont(FONT_PLAYFUL);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(COLOR_ORANGE);
  textSize(24);
  if (giftShop.item0Sold && giftShop.item1Sold) {
    fill(COLOR_GREY);
    text("SOLD OUT", w / 2, h / 2);
  } else {
    if (giftShop.item0Sold) {
      push();
      translate(w / 2 - 80 - MARGIN / 2, h / 2 - 50 + MARGIN / 2);
      rotate(-15);
      rect(0, 0, 100, 48);
      fill(COLOR_WHITE);
      text("SOLD", 0, -4);
      pop();
    } else {
      text(giftShop.item0Price + " POINTS", w / 2 - 100, h / 2 + 50 + MARGIN / 2);
    }
    if (giftShop.item1Sold) {
      push();
      translate(w / 2 + 80 + MARGIN / 2, h / 2 - 50 + MARGIN / 2);
      rotate(-15);
      rect(0, 0, 100, 48);
      fill(COLOR_WHITE);
      text("SOLD", 0, -4);
      pop();
    } else {
      text(giftShop.item1Price + " POINTS", w / 2 + 100, h / 2 + 50 + MARGIN / 2);
    }
  }
  pop();
}

function resetUserStatisticsAnimation() {
  updateStatistics();
  displayPointHeight = 0;
  scrolledDown = false;
  for (let i = 0; i < infoArray.length; i++) {
    infoArray[i].reset();
  }
}

function updateStatistics() {
  pointProgress.value = user.info.points;
  infoTypedKeys.value = user.info.keyStrokes;
  infoCheckedBoxes.value = user.info.checkBoxes;
  user.info.efficiency = getNoteSpaceEifficency();
  infoSpaceEfficiency.value = user.info.efficiency;
  infoPointsEarned.value = user.info.pointsEarned;
  user.info.magnets = magnetContainer;
  infoMagnets.value = user.info.magnets.length;
  infoDuration.value = user.getDuration();
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

  updateStatistics();
  saveUserData();
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

  if (SFX_CREATENOTE.isPlaying()) {
    SFX_CREATENOTE.stop();
  }
  SFX_CREATENOTE.play();
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

function addAward(color, icon) {
  let rX = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowWidth - NOTE_THUMBNIAL_SIZE - MARGIN);
  let rY = random(NOTE_THUMBNIAL_SIZE + MARGIN, windowHeight - NOTE_THUMBNIAL_SIZE - MARGIN);
  let magnet = new DraggableAward(rX, rY, color, icon, getItemId());
  magnetContainer.push(magnet);
  console.log("A new magnet is added.");
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
      addKeyStrokes();
      /*
      if (charGrid.theme === 0){
        charGrid.returnAnimH = MAX_NOTE_SIZE/CHAR_HEIGHT;
        charGrid.returnAnimDone = false;
      }*/
    }
    if (keyCode === 32) {
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
      addKeyStrokes();
    }
  }
}

function mouseWheel(event) {
  if (document.documentElement.scrollTop > windowHeight / 4) {
    scrolledDown = true;
  }
}

function playTypingSound(id) {
  if (charGrid.theme === 1) {
    if (id === 0) {
      SFX_TYPING_0.play();
    } else {
      let r = random();
      if (r <= 0.33) {
        SFX_TYPING_1.play();
      } else if (0.33 < r && r <= 0.66) {
        SFX_TYPING_2.play();
      } else {
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
      if (hoveredDraggables[i].type === "AWARD" && hoveredDraggables[i].id > top.id) {
        top = hoveredDraggables[i];
      }
    } else {
      if (hoveredDraggables[i].type === "AWARD") {
        top = hoveredDraggables[i];
      } else {
        if (hoveredDraggables[i].id > top.id) {
          top = hoveredDraggables[i];
        }
      }
    }
  }
  return top;
}

function getNoteSpaceEifficency() {
  let total = 0;
  for (let i = 0; i < noteContainer.length; i++) {
    total += noteContainer[i].getSpaceEifficency();
  }
  return (total / noteContainer.length) * 100;
}

function loadUserData() {
  let result = user.loadData();
  console.log("Loading user data... Data Exists: " + result);
  console.log(user.info);
  return result;
}

function loadContainers() {
  for (let j = 0; j < user.info.notes.length; j++) {
    let id = user.info.notes[j]['id'];
    let theme = user.info.notes[j]['theme'];
    let bgColor = user.info.notes[j]['bgColor'];
    let textColor = user.info.notes[j]['textColor'];
    let pos = user.info.notes[j]['pos'];

    let userNote, userNoteThumbnail;
    // add note
    userNote = new CharGrid(theme, bgColor, textColor, id);
    // add lines
    for (let i = 0; i < user.info.notes[j]['lines'].length; i++) {
      userNote.addLine(user.info.notes[j]['lines'][i]);
    }
    // add markup
    for (let i = 0; i < user.info.notes[j]['markup'].length; i++) {
      let x = user.info.notes[j]['markup'][i][0];
      let y = user.info.notes[j]['markup'][i][1];
      let markupType = user.info.notes[j]['markup'][i][2];
      let color = user.info.notes[j]['markup'][i][3];
      if (markupType === 0) {
        userNote.characters[x][y].underline = true;
        userNote.characters[x][y].underlineColor = color;
      } else if (markupType === 1) {
        userNote.characters[x][y].highlight = true;
        userNote.characters[x][y].highlightColor = color;
      } else {
        userNote.characters[x][y].setupButton();
        userNote.characters[x][y].char = user.info.notes[j]['markup'][i][3];
      }
    }
    // add thumbnail
    userNoteThumbnail = new DraggableNote(pos[0], pos[1], bgColor, textColor, theme, userNote.getFirstLine(), id);

    noteContainer.push(userNote);
    noteThumbnailContainer.push(userNoteThumbnail);
    currentItemIndex++;
  }
  // add magnets
  for (let j = 0; j < user.info.magnets.length; j++) {
    let bgColor = user.info.magnets[j]['bgColor'];
    let id = user.info.magnets[j]['id'];
    let iconId = user.info.magnets[j]['iconId'];
    let pos = user.info.magnets[j]['pos'];
    let magnet = new DraggableAward(pos[0], pos[1], bgColor, AWARDS[iconId], id);

    magnetContainer.push(magnet);
    currentItemIndex++;
  }
}

function saveUserData() {
  user.saveData();
  console.log("User data saved.");
}

function userIsActive() {
  if (userActivity.timer != null) {
    clearTimeout(userActivity.timer);
    userActivity.timer = null;
  }
}

function autoSave() {
  if (userActivity.timer === null) {
    userActivity.timer = setTimeout(function() {
      saveUserData();
    }, 10000);
  }
}

function addKeyStrokes() {
  if (++sessionStats.keyStrokes === CHAR_WIDTH * 2) {
    sessionStats.keyStrokes = 0;
    user.addPoints(1);
    console.log("Points +1");
    if (++sessionStats.earnedPoints === 10) {
      notification.update("You earned 10 points!");
      sessionStats.earnedPoints = 0;
    }
  }
  user.info.keyStrokes++;
}

function addCheckedBoxes() {
  if (++sessionStats.checkBoxes === 5) {
    sessionStats.checkBoxes = 0;
    user.addPoints(1);
    console.log("Points +1");
    if (++sessionStats.earnedPoints === 10) {
      notification.update("You earned 10 points!");
      sessionStats.earnedPoints = 0;
    }
  }

  user.info.checkBoxes++;
}
