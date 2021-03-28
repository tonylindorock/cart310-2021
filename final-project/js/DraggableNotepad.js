class DraggableNotepad extends Draggable{
  constructor(x, y, bgColor, textColor, theme, title, id){
    super(x, y, NOTE_THUMBNIAL_SIZE, NOTE_THUMBNIAL_SIZE, "NOTE", id);

    this.title = title;

    this.bgColor = bgColor;
    this.textColor = textColor;
    this.theme = theme;

    this.font = "Courier";

    if (this.theme === 0){
      this.font = FONT_PLAYFUL;
    }else if (this.theme === 1){
      this.font = FONT_TERMINAL;
    }

    this.CORNER_RADIUS_PLAYFUL = 16;
    this.CORNER_RADIUS_PLAIN = 8;
    this.MARGIN = 16;
    this.ENLARGER_RADIO = 1.05;
    this.scale = 1;

    this.open = false;
  }

// button style
  normalStyle(){
    this.scale = 1;
    switch(this.theme){
      case 0:
        fill(this.bgColor);
        rect(0,0, this.width, this.width, 0, 0, this.CORNER_RADIUS_PLAYFUL, 0);
        break;
      case 1:
        stroke(COLOR_GREY_DARK);
        strokeWeight(12);
        fill(COLOR_BLACK);
        rect(0,0, this.width, this.width);
        noStroke();
        break;
      case 2:
        fill(this.bgColor);
        rect(0,0, this.width, this.width, this.CORNER_RADIUS_PLAIN);
    }
  }

// button style when hovered
  hoverStyle(){
    this.scale = this.ENLARGER_RADIO;
    switch(this.theme){
      case 0:
        fill(this.bgColor);
        rect(0,0, this.width*this.ENLARGER_RADIO, this.width*this.ENLARGER_RADIO, 0, 0, this.CORNER_RADIUS_PLAYFUL, 0);
        break;
      case 1:
        stroke(COLOR_GREY_DARK);
        strokeWeight(12);
        fill(COLOR_BLACK);
        rect(0,0, this.width*this.ENLARGER_RADIO, this.width*this.ENLARGER_RADIO);
        noStroke();
        break;
      case 2:
        fill(this.bgColor);
        rect(0,0, this.width*this.ENLARGER_RADIO, this.width*this.ENLARGER_RADIO, this.CORNER_RADIUS_PLAIN);
    }
  }

// button style when clicked
  clickStyle(){
    this.normalStyle();
  }


  display(){
    this.checkForMouse();
    this.checkForDrag();
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
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
    fill(this.textColor);
    textFont(this.font);
    textAlign(LEFT, TOP);
    textSize(18 * this.scale);
    text(this.title, (- this.width/2 + this.MARGIN) * this.scale, (- this.width/2 + this.MARGIN) * this.scale);
    pop();
  }
}
