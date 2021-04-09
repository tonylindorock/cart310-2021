// Notepad with lines
class CharGrid {
  constructor(theme, bgColor, textColor, id) {
    this.id = id;
    this.theme = theme;
    this.font = "Courier";
    this.bgColor = bgColor;
    this.textColor = textColor;

    this.scanLineCount = 100;

    this.lines = [""];
    this.characters = [];
    this.characters[0] = [];

    this.pointerPosX = 0;
    this.pointerPosY = 0;

    this.MAX_SIZE = 600;

    this.underlineEnabled = false;
    this.highlightEnabled = false;

    this.keyIsTyped = false;

    this.setup();
  }
  // setup if theme is playful or terminal
  setup() {
    if (this.theme === 0) {
      this.font = FONT_PLAYFUL;
    } else if (this.theme === 1) {
      this.font = FONT_TERMINAL;
      this.highlightColor = this.bgColor;
    }
  }
  // return the first line
  getFirstLine() {
    return (this.lines[1] === undefined ? this.lines[0] : this.lines[0].replace("\n", " ") + this.lines[1]);
  }
  // add a character
  addChar(character, special = "") {
    let valid = true;
    // if end of the line, add a new line
    if (this.pointerPosX === CHAR_WIDTH) {
      if (this.pointerPosY != CHAR_HEIGHT - 1) {
        this.pointerPosY += 1;
        this.pointerPosX = 0;
        this.lines.push("");
        this.characters.push([]);
      // if no space
      } else {
        valid = false;
      }
    }
    // if can add a character
    if (valid) {
      let newChar = new Character(this.pointerPosX, this.pointerPosY, character, special);
      newChar.underlineEnabled = this.underlineEnabled;
      newChar.highlightEnabled = this.highlightEnabled;
      this.lines[this.pointerPosY] = this.lines[this.pointerPosY] + character;
      this.characters[this.pointerPosY].push(newChar);
      //console.log(character + " New char added at "+ this.pointerPosX + " " + this.pointerPosY);
      if (character === "\n") {
        if (this.pointerPosY < CHAR_HEIGHT - 1) {
          this.pointerPosY += 1;
          this.pointerPosX = 0;
          this.lines.push("");
          this.characters.push([]);
        }
      } else {
        this.pointerPosX += 1;
      }
    }
  }
  // add line of characters
  addLine(line) {
    for (let j = 0; j < line.length; j++) {
      this.addChar(line.charAt(j));
    }
  }
  // add a checkbox
  addCheckButton() {
    // if has space in the current line
    if (this.pointerPosX < CHAR_WIDTH - 2) {
      this.addChar("[");
      this.addChar(" ", "CHECK_BUTTON");
      this.addChar("]");
    } else {
      console.log("Cannot add checkbox.");
    }
  }
  // remove a character
  removeChar() {
    if (this.pointerPosX === 0) {
      if (this.pointerPosY > 0) {
        this.pointerPosY -= 1;
        this.lines.pop();
        this.characters.pop();
      }
      this.pointerPosX = this.lines[this.pointerPosY].length;
    } else {
      this.pointerPosX -= 1;
      let temp = this.lines[this.pointerPosY];
      this.lines[this.pointerPosY] = temp.substring(0, temp.length - 1);
      this.characters[this.pointerPosY].pop();
    }
  }
  // combine all lines and display an alert
  copyNote() {
    let text = "";
    for (let i = 0; i < this.lines.length; i++) {
      text += this.lines[i];
    }
    alert(text);
  }
  // enable underline in all characters
  toggleUnderline(state) {
    this.underlineEnabled = state;
    for (let i = 0; i < this.characters.length; i++) {
      for (let j = 0; j < this.characters[i].length; j++) {
        this.characters[i][j].underlineEnabled = state;
      }
    }
  }
  // enable highlight in all characters
  toggleHighlight(state) {
    this.highlightEnabled = state;
    for (let i = 0; i < this.characters.length; i++) {
      for (let j = 0; j < this.characters[i].length; j++) {
        this.characters[i][j].highlightEnabled = state;
      }
    }
  }
  // display the typing pointer
  displayPointer() {
    push();
    translate(windowWidth / 2 - this.MAX_SIZE / 2, TOP_MENU_HEIGHT / 2);
    rectMode(CORNER);
    // blink
    if (frameCount % 120 < 60 || this.keyIsTyped) {
      fill(this.textColor);
      if (frameCount % 120 < 60) {
        this.keyIsTyped = false;
      }
    } else {
      noFill();
    }
    // if theme is not terminal, display a thinner one
    if (this.theme != 1) {
      rect(this.pointerPosX * MAX_NOTE_SIZE / CHAR_WIDTH, this.pointerPosY * MAX_NOTE_SIZE / CHAR_HEIGHT, 3, MAX_NOTE_SIZE / CHAR_HEIGHT);
    // display a thicker one
    } else {
      rect(this.pointerPosX * MAX_NOTE_SIZE / CHAR_WIDTH, this.pointerPosY * MAX_NOTE_SIZE / CHAR_HEIGHT, MAX_NOTE_SIZE / CHAR_WIDTH * 0.8, MAX_NOTE_SIZE / CHAR_HEIGHT);
    }
    pop();
  }

  display() {
    push();
    // draw frame for terminal
    if (this.theme === 1) {
      let size = this.MAX_SIZE + 128;
      push();
      translate(windowWidth / 2 - size / 2, 0);
      fill(COLOR_GREY_DARK);
      rect(0, 0, size, windowHeight);
      pop();
    }
    translate(windowWidth / 2 - this.MAX_SIZE / 2, TOP_MENU_HEIGHT / 2);
    rectMode(CORNER);
    fill(this.bgColor);
    // padding
    stroke(this.bgColor);
    strokeWeight(32);
    rect(0, 0, this.MAX_SIZE, this.MAX_SIZE);
    // display characters
    noStroke();
    textFont(this.font);
    for (let i = 0; i < this.characters.length; i++) {
      for (let j = 0; j < this.characters[i].length; j++) {
        this.characters[i][j].display(this.bgColor, this.textColor);
      }
    }
    pop();

    this.displayPointer();

    // draw scanlines for terminal
    push();
    translate(windowWidth / 2 - this.MAX_SIZE / 2, TOP_MENU_HEIGHT / 2);
    if (this.theme === 1) {
      for (let i = 0; i < this.scanLineCount; i++) {
        fill(0, 0, 0, 50);
        rect(-16, i * (this.MAX_SIZE + 32) / this.scanLineCount - 16, this.MAX_SIZE + 32, (this.MAX_SIZE + 32) / (this.scanLineCount * 2));
      }
    }
    pop();
  }
}
