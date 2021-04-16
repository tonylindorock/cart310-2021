// a square displaying information
class InfoSquare {
  constructor(x, y, title, value, unit, color, sign = "") {
    this.posX = x;
    this.posY = y;
    this.title = title.toUpperCase();
    this.displayVal = 0;
    this.displayValShortened = "0";
    this.value = value;
    this.unit = unit.toUpperCase();
    this.sign = sign;

    this.color = color;

    this.scrolledDown = false;

    this.MARGIN = 20;
  }

  reset(){
    this.displayVal = 0;
    this.scrolledDown = false;
  }

  display(translateX, translateY) {
    push();
    rectMode(CORNER);
    textFont(FONT_PLAYFUL);
    textAlign(LEFT, TOP);
    fill(COLOR_GREY_DARK);
    rect(this.posX, this.posY, INFO_SQUARE_SIZE, INFO_SQUARE_SIZE, 16);
    // title
    fill(COLOR_WHITE);
    textSize(18);
    text(this.title, this.posX + this.MARGIN, this.posY + this.MARGIN);
    // value
    fill(this.color);
    textSize(48);
    if (Math.round(this.displayVal) >= 1000){
      this.displayValShortened = this.shortenValue(Math.round(this.displayVal));
      text(this.displayValShortened + this.sign, this.posX + this.MARGIN, this.posY + INFO_SQUARE_SIZE/2 - this.MARGIN/1.5);
    }else{
      text(Math.round(this.displayVal) + this.sign, this.posX + this.MARGIN, this.posY + INFO_SQUARE_SIZE/2 - this.MARGIN/1.5);
    }
    // unit
    textSize(16);
    text(this.unit, this.posX + this.MARGIN, this.posY + INFO_SQUARE_SIZE - this.MARGIN * 2);
    pop();

    // if scrolled down to the element, play animation
    if (document.documentElement.scrollTop > (this.posY + translateY + INFO_SQUARE_SIZE) - windowHeight) {
      this.scrolledDown = true;
    }
    if (this.scrolledDown && Math.round(this.displayVal) != this.value) {
      this.displayVal = lerp(this.displayVal, this.value, 0.1);
    }
  }

  shortenValue(val){
    let valDisplay;
    if (val >= 1000 && val <= 9999) {
      let temp =int(val).toString()[0]; // extract frist character from 1000-9999
      valDisplay = temp + "K";
    } else if (val >= 10000 && val <= 99999) {
      let temp = int(val).toString().substring(0, 2); // extract frist 2 characters from 10000-99999
      valDisplay = temp + "K";
    } else if (val >= 100000 && val <= 999999) {
      let temp = int(val).toString().substring(0, 3); // extract frist 3 characters from 100000-999999
      valDisplay = temp + "K";
    } else if (val >= 1000000 && val <= 9999999) {
      let temp = int(val).toString()[0];
      valDisplay = temp + "M";
    } else if (val >= 10000000) {
      let temp = int(val).toString().substring(0, 2);
      valDisplay = temp + "M";
    }
    return valDisplay;
  }
}
