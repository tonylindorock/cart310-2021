// character obj for display a single char
class Character{
  constructor(x, y, char){
    this.char = char;
    this.underline = false;
    this.highlight = false;

    this.posX = x;
    this.posY = y;
    this.size = 1;
    this.fontSize = 30;

    this.animationDone = true;
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
    if (!this.animationDone){
      this.animate();
    }

    if (this.underline){

    }

    if (this.highlight){
      fill(textColor);
      rect(0, 0, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT);
      fill(bgColor);
    }else{
      fill(255,255,255,0);
      rect(0,0, MAX_NOTE_SIZE/CHAR_WIDTH, MAX_NOTE_SIZE/CHAR_HEIGHT);
      fill(textColor);
    }
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    text(this.char, MAX_NOTE_SIZE/CHAR_WIDTH/2, MAX_NOTE_SIZE/CHAR_HEIGHT/2);
    pop();
  }
}
