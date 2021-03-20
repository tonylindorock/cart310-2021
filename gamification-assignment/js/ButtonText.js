// a button with text
class ButtonText extends Button{
  constructor(posX, posY, width, height, bgColor, inRect, textColor, text){
    super(posX, posY, width, height);

    this.bgColor = bgColor;
    this.inRect = inRect;
    this.textColor = textColor;
    this.text = text;
  }

// button style
  normalStyle(){
    if (this.inRect){
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, 8);
      fill(COLOR_WHITE);
    }else{
      fill(this.textColor);
    }
  }

// button style when hovered
  hoverStyle(){
    this.normalStyle();
  }

// button style when clicked
  clickStyle(){
    if (this.inRect){
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, 8);
      fill(255,255,255,75);
      rect(this.posX, this.posY, this.width, this.height, 8);
      fill(COLOR_WHITE);
    }else{
      fill(COLOR_ORANGE);
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
    text(this.text, this.posX, this.posY);
    pop();
  }
}
