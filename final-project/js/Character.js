// character obj for display a single char
class Character{
  constructor(x, y, char, special = ""){
    this.char = char;
    this.underline = false;
    this.highlight = false;

    this.underlineColor = COLOR_BLACK;
    this.highlightColor = COLOR_YELLOW;

    this.special = special;
    this.button = null;

    this.posX = x;
    this.posY = y;
    this.size = 1;
    this.FONT_SIZE = 30;
    this.UNDERLINE_WEIGHT = 3;

    this.underlineEnabled = false;
    this.highlightEnabled = false;

    this.pressTime = 0;

    this.animationDone = true;

    this.globalX = windowWidth/2-MAX_NOTE_SIZE/2 + this.posX * MAX_NOTE_SIZE/CHAR_WIDTH + (MAX_NOTE_SIZE/CHAR_WIDTH)/2;
    this.globalY = TOP_MENU_HEIGHT/2 + this.posY * MAX_NOTE_SIZE/CHAR_HEIGHT + (MAX_NOTE_SIZE/CHAR_HEIGHT)/2;

    if (this.special === "CHECK_BUTTON"){
      this.setupButton();
    }
  }

  setupButton(){
    this.button = new ButtonText(this.globalX, this.globalY, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT, COLOR_WHITE, false, COLOR_BLACK, " ");
    var thisObject = this;
    this.button.connectFunc(function(){
      if (thisObject.char === " "){
        thisObject.char = "X";
      }else{
        thisObject.char = " ";
      }
    });
  }

  startAnimation(){
    this.animationDone = false;
    this.fontSize = 0;
  }

  animate(){

  }

  display(bgColor, textColor){
    push();
    translate(this.posX * MAX_NOTE_SIZE/CHAR_WIDTH, this.posY * MAX_NOTE_SIZE/CHAR_HEIGHT);
    rectMode(CORNER);

    if (this.button != null){
      this.button.display();
    }

    if (!this.animationDone){
      this.animate();
    }

    if (this.highlight){
      fill(this.highlightColor);
      rect(0,this.UNDERLINE_WEIGHT/2, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT - this.UNDERLINE_WEIGHT);
    }else{
      fill(255,255,255,0);
      rect(0,0, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT);
    }

    if (this.underline){
      fill(this.underlineColor);
      rect(0, MAX_NOTE_SIZE/CHAR_HEIGHT - this.UNDERLINE_WEIGHT/2, MAX_NOTE_SIZE/CHAR_WIDTH, this.UNDERLINE_WEIGHT);
    }

    if (checkForMouseOver(windowWidth/2-MAX_NOTE_SIZE/2 + this.posX * MAX_NOTE_SIZE/CHAR_WIDTH + (MAX_NOTE_SIZE/CHAR_WIDTH)/2, TOP_MENU_HEIGHT/2 + this.posY * MAX_NOTE_SIZE/CHAR_HEIGHT + (MAX_NOTE_SIZE/CHAR_HEIGHT)/2, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT) && (this.underlineEnabled || this.highlightEnabled)){
      fill(0,100,255,50);
      rect(-2,0, MAX_NOTE_SIZE/CHAR_WIDTH + 4, MAX_NOTE_SIZE/CHAR_HEIGHT);

      if (mouseIsPressed){
        if (this.pressTime < 1){
          this.pressTime += 1;
          if (this.underlineEnabled){
            this.underline = !this.underline;
            if (charGrid.theme != 1){
              this.underlineColor = PEN_COLORS[penColorIndex];
            }else{
              this.underlineColor = textColor;
            }
          }
          if (this.highlightEnabled){
            this.highlight = !this.highlight;
            if (charGrid.theme != 1){
              this.highlightColor = HIGHLIGHT_COLORS[highlighColorIndex];
            }else{
              this.highlightColor = textColor;
            }

          }
        }
      }else{
        this.pressTime = 0;
      }
    }else{
      this.pressTime = 0;
    }
    // special case: terminal
    if (charGrid.theme === 1 && this.highlight){
      fill(bgColor);
    }else{
      fill(textColor);
    }
    textAlign(CENTER, CENTER);
    textSize(FONT_SIZE);
    text(this.char, MAX_NOTE_SIZE/CHAR_WIDTH/2, MAX_NOTE_SIZE/CHAR_HEIGHT/2);
    pop();
  }
}
