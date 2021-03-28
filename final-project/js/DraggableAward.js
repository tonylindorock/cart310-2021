class DraggableAward extends Draggable{
  constructor(x, y, bgColor, image, theme, id){
    super(x, y, AWARD_SIZE, AWARD_SIZE, "AWARD", id);

    this.bgColor = bgColor
    this.image = image;
    this.theme = theme;

    this.ENLARGER_RADIO = 1.05;
  }

  // button style
  normalStyle(){
    if (this.theme === 0){
      push();
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = SHADE_STICKER_SHADOW;
      stroke(255);
      strokeWeight(6);
      ellipse(0,0,AWARD_SIZE);
      pop();
    }else{
      push();
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 25;
      drawingContext.shadowColor = this.bgColor;
      ellipse(0,0,AWARD_SIZE);
      pop();
    }
    image(this.image, 0, 0, AWARD_ICON_SIZE, AWARD_ICON_SIZE);
  }

  // button style when hovered
  hoverStyle(){
    if (this.theme === 0){
      push();
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 10;
      drawingContext.shadowColor = SHADE_STICKER_SHADOW;
      stroke(255);
      strokeWeight(6);
      ellipse(0,0,AWARD_SIZE * this.ENLARGER_RADIO);
      pop();
    }else{
      push();
      drawingContext.shadowOffsetX = 0;
      drawingContext.shadowOffsetY = 0;
      drawingContext.shadowBlur = 25;
      drawingContext.shadowColor = this.bgColor;
      ellipse(0,0,AWARD_SIZE * this.ENLARGER_RADIO);
      pop();
    }
    image(this.image, 0, 0, AWARD_ICON_SIZE * this.ENLARGER_RADIO, AWARD_ICON_SIZE * this.ENLARGER_RADIO);
  }

  // button style when clicked
  clickStyle(){
    this.normalStyle();
  }

  display(){
    this.checkForMouse();
    this.checkForDrag();
    push();
    ellipseMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    translate(this.posX, this.posY);
    rotate(this.rotation);
    fill(this.bgColor);
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
  }
}
