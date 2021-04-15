// draggable magnet object
class DraggableAward extends Draggable {
  constructor(x, y, bgColor, image, id) {
    super(x, y, AWARD_SIZE, AWARD_SIZE, "AWARD", id);

    this.bgColor = bgColor
    this.image = image;

    this.iconId = awardIcons.indexOf(image);

    this.ENLARGER_RADIO = 1.05;
  }

  // button style
  normalStyle() {
    push();
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 4;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = SHADE_STICKER_SHADOW;
    ellipse(0, 0, AWARD_SIZE);
    pop();
    image(this.image, 0, 0, AWARD_ICON_SIZE, AWARD_ICON_SIZE);
  }

  // button style when hovered
  hoverStyle() {
    push();
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 4;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = SHADE_STICKER_SHADOW;
    ellipse(0, 0, AWARD_SIZE * this.ENLARGER_RADIO);
    pop();
    image(this.image, 0, 0, AWARD_ICON_SIZE * this.ENLARGER_RADIO, AWARD_ICON_SIZE * this.ENLARGER_RADIO);
  }

  // button style when clicked
  clickStyle() {
    this.normalStyle();
  }

  display() {
    this.checkForMouse();
    this.checkForDrag();
    push();
    ellipseMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    translate(this.posX, this.posY);
    rotate(this.rotation);
    fill(this.bgColor);
    if (this.isHovered) {
      if (this.mouseClicked) {
        this.clickStyle();
      } else {
        this.hoverStyle();
      }
    } else {
      this.normalStyle();
    }
    pop();
  }
}
