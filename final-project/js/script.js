/*****************

Noteepadd
Yichen Wang

CART 310 Final Project

This is a template. You must fill in the title,
author, and this description to match your project!

FONTS FROM:
https://www.1001fonts.com/goldie-boxing-font.html

******************/

const CHAR_WIDTH = 32;
const CHAR_HEIGHT = 48;
const NOTE_THUMBNIAL_SIZE = 160;

const MARGIN = 24;
const TOP_MENU_HEIGHT = 48;
const UNI_BTN_HEIGHT = 32;
const UNI_BTNC_HEIGHT = 192;

// **************** COLORS ****************
const COLOR_BLACK = "#262626";
const COLOR_GREY_DARK = "#484848";
const COLOR_GREY = "#aaa";
const COLOR_WHITE = "#fff";
const COLOR_RED = "#ff6464";
const COLOR_ORANGE = "#ffaf4b";
const COLOR_YELLOW = "#ffe600";
const COLOR_GREEN = "#33de7a";
const COLOR_BLUE = "#4bafff";
const COLOR_PURPLE = "#af4bff";

var note;

function preload() {

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();

  note = new ButtonNotepad(windowWidth/2,windowHeight/2,COLOR_ORANGE,COLOR_BLACK,0, "Hello");
}

function draw() {
  background(255);
  note.display();
}
