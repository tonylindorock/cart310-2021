// a square displaying information
class InfoSquare{
  constructor(x, y, title, value, unit, color, sign = ""){
    this.posX = x;
    this.posY = y;
    this.title = title.toUpperCase();
    this.displayVal = 0;
    this.value = value;
    this.unit = unit.toUpperCase();
    this.sign = sign;

    this.color = color;

    this.scrolledDown = false;

    this.MARGIN = 24;
  }

  display(translateX, translateY){
    push();
    rectMode(CORNER);
    textFont(FONT_PLAYFUL);
    textAlign(LEFT,CENTER);
    fill(COLOR_GREY_DARK);
    rect(this.posX, this.posY, INFO_SQUARE_SIZE, INFO_SQUARE_SIZE,16);
    // title
    fill(COLOR_WHITE);
    textSize(18);
    text(this.title, this.posX + this.MARGIN, this.posY + this.MARGIN);
    // value
    fill(this.color);
    textSize(48);
    text(Math.round(this.displayVal) + this.sign, this.posX + this.MARGIN, this.posY + INFO_SQUARE_SIZE/2 + this.MARGIN/2);
    // unit
    textSize(16);
    text(this.unit, this.posX + this.MARGIN, this.posY + INFO_SQUARE_SIZE - this.MARGIN);
    pop();

    if (document.documentElement.scrollTop > (this.posY + translateY + INFO_SQUARE_SIZE) - windowHeight){
      this.scrolledDown = true;
    }
    if (this.scrolledDown){
      this.displayVal = lerp(this.displayVal, this.value, 0.1);
    }
  }
}
