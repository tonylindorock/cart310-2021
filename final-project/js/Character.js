// character obj for display a single char
class Character{
  constructor(x, y, char, underline, highlight){
    this.char = char;
    this.underline = underline;
    this.style = style;

    this.posX = x;
    this.posY = y;
    this.size = 16;

    this.animationDone = true;
  }

  startAnimation(){
    this.animationDone = false;
    this.size = 0;
  }

  animate(){

  }

  display(bgColor, textColor, size, line){
    push();
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    noStroke();

    if (!animationDone){
      this.animate();
    }

    if (underline){

    }

    if (highlight){
      fill(textColor);
      rect(this.posX, this.posY, CHAR_WIDTH, CHAR_HEIGHT);
      fill(bgColor);
    }else{
      noFill();
      rect(this.posX, this.posY, CHAR_WIDTH, CHAR_HEIGHT);
      fill(textColor);
    }
    text(this.char, this.posX, this.posY);
    pop();
  }
}
