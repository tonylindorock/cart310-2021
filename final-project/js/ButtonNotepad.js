class ButtonNotepad extends Button{
  constructor(x, y, bgColor, textColor, type, title, id){
    super(x, y, NOTE_THUMBNIAL_SIZE, NOTE_THUMBNIAL_SIZE);

    this.title = title;
    this.id = id;

    this.bgColor = bgColor;
    this.textColor = textColor;
    this.type = type;

    this.RAND_ROTATE = 12;
    this.rotation = random(-this.RAND_ROTATE, this.RAND_ROTATE);

    this.CORNER_RADIUS_PLAYFUL = 16;
    this.CORNER_RADIUS_PLAIN = 8;
    this.MARGIN = 16;
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
    if (checkForMouseOver(this.posX, this.posY, this.width, this.height)){
      cursor(HAND);
      this.isHover = true;

      if (mouseIsPressed){
        cursor('grab');
        this.mouseClicked = true;
        this.posX = mouseX - this.offsetX;
        this.posY = mouseY - this.offsetY;

        updateSelectedItem("NOTE", this.id);
      }else{
        this.mouseClicked = false;

        updateSelectedItem("",-1);
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

  checkForDrag(){
    if (this.mouseClicked){
      this.posX = mouseX - this.offsetX;
      this.posY = mouseY - this.offsetY;
    }
  }

  display(){
    this.checkForMouse();
    this.checkForDrag();
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    noStroke();
    translate(this.posX, this.posY);
    rotate(this.rotation);
    push();
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = SHADE_NOTE_SHADOW;
    if (this.isHover){
      if (this.mouseClicked){
        this.clickStyle();
      }else{
        this.hoverStyle();
      }
    }else{
      this.normalStyle();
    }
    pop();
    textAlign(LEFT, TOP);
    textSize(16);
    text(this.title, - this.width/2 + this.MARGIN, - this.width/2 + this.MARGIN);
    pop();
  }
}
