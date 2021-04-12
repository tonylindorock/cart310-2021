// a button with text
class ButtonText extends Button {
  constructor(posX, posY, width, height, bgColor, inRect, textColor, text) {
    super(posX, posY, width, height);

    this.bgColor = bgColor;
    this.inRect = inRect;
    this.textColor = textColor;
    this.text = text;

    this.CORNER_RADIUS = 8;
  }

  // button style
  normalStyle() {
    if (this.inRect) {
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, this.CORNER_RADIUS);
      fill(this.textColor);
    } else {
      fill(this.textColor);
    }
  }

  // button style when hovered
  hoverStyle() {
    this.normalStyle();
  }

  // button style when clicked
  clickStyle() {
    if (this.inRect) {
      fill(this.bgColor);
      rect(this.posX, this.posY, this.width, this.height, this.CORNER_RADIUS);
      fill(255, 255, 255, 75);
      rect(this.posX, this.posY, this.width, this.height, this.CORNER_RADIUS);
      fill(this.textColor);
    } else {
      fill(this.textColor);
    }
  }

  display() {
    this.checkForMouse();
    push();
    rectMode(CENTER);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    if (this.isHovered) {
      cursor(HAND);
      this.hoverStyle();
      if (this.mouseClicked) {
        this.clickStyle();
      }
    } else {
      cursor(ARROW);
      this.normalStyle();
    }
    text(this.text, this.posX, this.posY);
    pop();
  }
}
