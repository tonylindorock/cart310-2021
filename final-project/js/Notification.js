class Notification{
  constructor() {
    this.height = TOP_MENU_HEIGHT;
    this.width = windowWidth/5;

    this.x = windowWidth - this.width/2 - MARGIN;
    this.y = MARGIN + this.height/2;

    this.xChange = (this.width / 1.25) * 2;
    this.sizeChange = 1;

    this.CORNER_RADIUS = 16;

    this.text = "This is a notification.";
    this.notify = true;

    this.isHovered = false;
    this.mouseClicked = false;
    this.pressTime = 0;

    this.timer = null;
  }

  update(text) {
    this.text = text;

    this.xChange = (this.width / 1.25) * 2;
    this.notify = true;
    var thisNote = this;
    this.timer = setTimeout(function() {
      thisNote.notify = false;
    }, 10000);

    SFX_MSG.play();
  }

  checkForMouse(){
    if (checkForMouseOver(this.x + this.xChange, this.y, this.width * this.sizeChange, this.height * this.sizeChange) && this.notify){
      this.isHovered = true;

      if (mouseIsPressed){
        this.mouseClicked = true;
        // do once
        if (this.pressTime < 1){
          this.pressTime += 1;
          this.notify = false;
          clearTimeout(this.timer);
          this.timer = null;
        }
      }else{
        this.mouseClicked = false;
        this.pressTime = 0;
      }
    }else{
      this.isHovered = false;
    }
  }

  display() {
    this.checkForMouse();
    push();
    rectMode(CENTER);
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);
    if (this.notify) {
      this.xChange = lerp(this.xChange, 0, 0.1);
    } else {
      this.xChange = lerp(this.xChange, this.width + MARGIN*2, 0.1);
    }
    if (this.isHovered) {
      if (this.mouseClicked) {
        this.sizeChange = lerp(this.sizeChange, 1, 1);
      } else {
        this.sizeChange = lerp(this.sizeChange, 1.05, 0.4)
      }
    } else {
      this.sizeChange = lerp(this.sizeChange, 1, 0.2)
    }
    translate(this.x + this.xChange, this.y);
    fill(COLOR_BLUE);
    rect(0, 0, this.width * this.sizeChange, this.height * this.sizeChange, this.CORNER_RADIUS);
    fill(COLOR_WHITE);
    textSize(24 * this.sizeChange);
    textLeading(24 * this.sizeChange);
    textFont(FONT_PLAYFUL);
    text(this.text, 0, 0, (this.width - MARGIN)* this.sizeChange, (this.height - MARGIN/2)* this.sizeChange);
    pop();
  }
}
