// character obj for display a single char
class Character{
  constructor(x, y, char){
    this.char = char;
    this.underline = false;
    this.highlight = false;

    this.posX = x;
    this.posY = y;
    this.size = 1;
    this.FONT_SIZE = 30;
    this.UNDERLINE_WEIGHT = 3;

    this.markupEnabled = false;

    this.animationDone = true;
  }

  startAnimation(){
    this.animationDone = false;
    this.fontSize = 0;
  }

  animate(){

  }

  display(bgColor, textColor, highlight){
    push();
    translate(this.posX * MAX_NOTE_SIZE/CHAR_WIDTH, this.posY * MAX_NOTE_SIZE/CHAR_HEIGHT);
    rectMode(CORNER);
    if (!this.animationDone){
      this.animate();
    }

    if (this.highlight){
      fill(255,255,0,100);
      rect(0,this.UNDERLINE_WEIGHT, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT - this.UNDERLINE_WEIGHT);
      fill(textColor);
    }else{
      fill(255,255,255,0);
      rect(0,0, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT);
      fill(textColor);
    }

    if (this.underline){
      fill(textColor);
      rect(0, MAX_NOTE_SIZE/CHAR_HEIGHT, MAX_NOTE_SIZE/CHAR_WIDTH, this.UNDERLINE_WEIGHT);
    }

    if (checkForMouseOver(windowWidth/2-MAX_NOTE_SIZE/2 + this.posX * MAX_NOTE_SIZE/CHAR_WIDTH + (MAX_NOTE_SIZE/CHAR_WIDTH)/2, TOP_MENU_HEIGHT/2 + this.posY * MAX_NOTE_SIZE/CHAR_HEIGHT + (MAX_NOTE_SIZE/CHAR_HEIGHT)/2, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT) && this.markupEnabled){
      fill(0,0,255,50);
      rect(-2,0, MAX_NOTE_SIZE/CHAR_WIDTH + 4, MAX_NOTE_SIZE/CHAR_HEIGHT);
    }

    fill(textColor);
    textAlign(CENTER, CENTER);
    textSize(this.FONT_SIZE);
    text(this.char, MAX_NOTE_SIZE/CHAR_WIDTH/2, MAX_NOTE_SIZE/CHAR_HEIGHT/2);
    pop();
  }
}
