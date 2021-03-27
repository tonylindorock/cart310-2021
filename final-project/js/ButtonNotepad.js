class ButtonNotepad extends Button{
  constructor(x, y, bgColor, textColor, type, title){
    super(x, y, NOTE_THUMBNIAL_SIZE, NOTE_THUMBNIAL_SIZE);

    this.title = title;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.type = type;

    this.rotation = random(-8, 8);

    this.CORNER_RADIUS_PLAYFUL = 16;
    this.CORNER_RADIUS_PLAIN = 8;
    this.MARGIN = 8;
    this.ENLARGER_RADIO = 1.05;

    this.offsetX = 0.0;
    this.offsetY = 0.0;
    this.tempMouseX = 0;
    this.tempMouseY = 0;
  }

// button style
  normalStyle(){
    switch(this.type){
      case 0:
        fill(this.bgColor);
        rect(0,0, this.width, this.width, 0, 0, this.CORNER_RADIUS_PLAYFUL, 0);
        break;
      case 1:
        stroke(COLOR_GREY_DARK);
        strokeWeight(16);
        fill(COLOR_BLACK);
        rect(0,0, this.width, this.width);
        noStroke();
        break;
      case 2:
        fill(this.bgColor);
        rect(0,0, this.width, this.width, this.CORNER_RADIUS_PLAIN);
    }
    fill(this.textColor);
  }

// button style when hovered
  hoverStyle(){
    switch(this.type){
      case 0:
        fill(this.bgColor);
        rect(0,0, this.width*this.ENLARGER_RADIO, this.width*this.ENLARGER_RADIO, 0, 0, this.CORNER_RADIUS_PLAYFUL, 0);
        break;
      case 1:
        stroke(COLOR_GREY_DARK);
        strokeWeight(16);
        fill(COLOR_BLACK);
        rect(0,0, this.width*this.ENLARGER_RADIO, this.width*this.ENLARGER_RADIO);
        noStroke();
        break;
      case 2:
        fill(this.bgColor);
        rect(0,0, this.width*this.ENLARGER_RADIO, this.width*this.ENLARGER_RADIO, this.CORNER_RADIUS_PLAIN);
    }
    fill(this.textColor);
  }

// button style when clicked
  clickStyle(){
    this.normalStyle();
  }

  checkForMouse(){
    if (mouseX >= this.posX - this.width/2 && mouseX <= this.posX + this.width/2
    && mouseY >= this.posY - this.height/2 && mouseY <= this.posY + this.height/2){
      cursor(HAND);
      this.isHover = true;

      if (mouseIsPressed){
        cursor('grab');
        this.mouseClicked = true;
        this.posX = mouseX - this.offsetX;
        this.posY = mouseY - this.offsetY;
      }else{
        this.mouseClicked = false;
      }
      this.offsetX = mouseX - this.posX;
      this.offsetY = mouseY - this.posY;

    }else{
      if (this.isHover){
        cursor(ARROW);
      }
      this.isHover = false;
    }
  }

  display(){
    this.checkForMouse();
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    noStroke();
    translate(this.posX, this.posY);
    rotate(this.rotation);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = COLOR_GREY;
    if (this.isHover){
      if (this.mouseClicked){
        this.clickStyle();
      }else{
        this.hoverStyle();
      }
    }else{
      this.normalStyle();
    }
    textAlign(LEFT, TOP);
    textSize(16);
    text(this.title, - this.width/2 + this.MARGIN, - this.width/2 + this.MARGIN);
    pop();
  }
}
