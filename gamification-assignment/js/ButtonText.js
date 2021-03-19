// a button with text
class ButtonText extends Button{
  constructor(posX, posY, width, height, bgColor, inRect, text){
    super(posX, posY, width, height, bgColor);

    this.inRect = inRect;
    this.text = text;
  }

  normalStyle(){
    if (this.inRect){
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, 8);
      fill(COLOR_WHITE);
    }else{
      fill(COLOR_LINK);
    }
    cursor(ARROW);
  }

  hoverStyle(){
    this.normalStyle();
    cursor(HAND);
  }

  clickStyle(){
    if (this.inRect){
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, 8);
      fill(255,255,255,75);
      rect(this.posX, this.posY, this.width, this.height, 8);
      fill(COLOR_WHITE);
    }else{
      fill(COLOR_LINK);
    }
  }

  display(){
    this.checkForMouse();
    push();
    rectMode(CENTER);
    noStroke();
    textAlign(CENTER,CENTER);
    textSize(16);
    if (this.isHover){
      this.hoverStyle();
      if (this.mouseClicked){
        this.clickStyle();
      }
    }else{
      this.normalStyle();
    }
    text(this.text, this.posX, this.posY, this.width, this.height);
    pop();
  }
}
