// This is a notification object
class Notification {
  constructor() {
    this.height = TOP_MENU_HEIGHT;
    this.width = windowWidth / 5;

    this.x = windowWidth - this.width / 2 - MARGIN;
    this.y = MARGIN + this.height / 2;

    this.xChange = (this.width / 1.25) * 2;
    this.yChange = 0;
    this.sizeChange = 1;

    this.CORNER_RADIUS = 16;

    this.text = "";
    this.buffer = [];
    this.notify = true;

    this.isHovered = false;
    this.mouseClicked = false;
    this.pressTime = 0;

    this.timer = null;
  }

  // add message
  update(text) {
    // if first message
    if (this.text === "") {
      this.text = text;
      this.reset();
      this.startTimer();
    // if first message is not dismissed, next msg goes in buffer
    } else {
      this.buffer.push(text);
    }
  }

  // start interval
  startTimer() {
    var thisNote = this;
    this.timer = setInterval(function() {
      if (thisNote.buffer.length != 0) {
        thisNote.text = thisNote.buffer.shift();
        thisNote.reset();
      } else {
        thisNote.notify = false;
        thisNote.endTimer();
      }
    }, 5000);
  }

  // reset animation and play sound
  reset() {
    SFX_MSG.play();
    this.xChange = (this.width / 1.25) * 2;
    this.notify = true;
  }

  // clear Interval
  endTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  // check for hover
  checkForMouse() {
    if (checkForMouseOver(this.x + this.xChange, this.y + this.yChange, this.width * this.sizeChange, this.height * this.sizeChange) && this.notify) {
      this.isHovered = true;

      if (mouseIsPressed) {
        this.mouseClicked = true;
        // do once
        if (this.pressTime < 1) {
          this.pressTime += 1;
          this.notify = false;
          if (this.buffer.length != 0) {
            this.endTimer();
            this.text = this.buffer.shift();
            this.reset();
            this.startTimer();
          } else {
            this.endTimer();
          }
        }
      } else {
        this.mouseClicked = false;
        this.pressTime = 0;
      }
    } else {
      this.isHovered = false;
    }
  }

  display() {
    this.yChange = lerp(this.yChange, document.documentElement.scrollTop, 0.2);
    this.checkForMouse();
    push();
    rectMode(CENTER);
    ellipseMode(CENTER);
    textAlign(CENTER, CENTER);
    // play sliding from side animation
    if (this.notify) {
      this.xChange = lerp(this.xChange, 0, 0.1);
    } else {
      this.xChange = lerp(this.xChange, this.width + MARGIN * 2, 0.1);
      if (Math.round(this.xChange) === this.width + MARGIN * 2 && this.timer === null) {
        this.text = "";
      }
    }
    // hover animation
    if (this.isHovered) {
      if (this.mouseClicked) {
        this.sizeChange = lerp(this.sizeChange, 1, 1);
      } else {
        this.sizeChange = lerp(this.sizeChange, 1.05, 0.4)
      }
    } else {
      this.sizeChange = lerp(this.sizeChange, 1, 0.2)
    }
    translate(this.x + this.xChange, this.y + this.yChange);
    fill(COLOR_BLUE);
    rect(0, 0, this.width * this.sizeChange, this.height * this.sizeChange, this.CORNER_RADIUS);
    fill(COLOR_WHITE);
    textSize(22 * this.sizeChange);
    textLeading(22 * this.sizeChange);
    textFont(FONT_PLAYFUL);
    text(this.text, 0, 0, (this.width - MARGIN) * this.sizeChange, (this.height - MARGIN / 2) * this.sizeChange);
    pop();
  }
}
