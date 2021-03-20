class ButtonCourse extends Button{
  constructor(posX, posY, width, height, bgColor, inRect, textColor, title, text){
    super(posX, posY, width, height);

    this.bgColor = bgColor;
    this.inRect = inRect;
    this.textColor = textColor;
    this.title = title;
    this.text = text;
  }

// button style
  normalStyle(){
    if (this.inRect){
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, 16);
      fill(this.textColor);
    }else{
      stroke(this.bgColor);
      strokeWeight(4);
      noFill();
      rect(this.posX, this.posY, this.width, this.height, 16);
      noStroke();
      fill(COLOR_BLACK);
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
      rect(this.posX, this.posY, this.width, this.height, 16);
      fill(255,255,255,75);
      rect(this.posX, this.posY, this.width, this.height, 16);
      fill(this.textColor);
    }else{
      stroke(this.bgColor);
      strokeWeight(4);
      noFill();
      rect(this.posX, this.posY, this.width, this.height, 16);
      noStroke();
      fill(0,0,0,25);
      rect(this.posX, this.posY, this.width, this.height, 16);
      fill(COLOR_BLACK);
    }
  }

  display(){
    this.checkForMouse();
    push();
    rectMode(CENTER);
    noStroke();
    textAlign(CENTER,CENTER);
    if (this.isHover){
      this.hoverStyle();
      if (this.mouseClicked){
        this.clickStyle();
      }
    }else{
      this.normalStyle();
    }
    textAlign(LEFT,TOP);
    textSize(32);
    textStyle(BOLD);
    textLeading(28);
    text(this.title, this.posX - this.width/2 + MARGIN, this.posY - this.height/2 + MARGIN);
    textAlign(CENTER,CENTER);
    textSize(16);
    textStyle(NORMAL);
    text(this.text, this.posX, this.posY + this.height/4);
    pop();
  }
}
