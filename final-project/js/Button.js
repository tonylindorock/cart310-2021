// The base class for all buttons
class Button{
  constructor(posX, posY, width, height){
    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.isHover = false;
    this.mouseClicked = false;

    this.pressTime = 0;
    this.func = null;
  }

  connectFunc(def){
    this.func = def;
  }

  checkForMouse(){
    if (mouseX >= this.posX - this.width/2 && mouseX <= this.posX + this.width/2
    && mouseY >= this.posY - this.height/2 && mouseY <= this.posY + this.height/2){
      cursor(HAND);
      this.isHover = true;

      if (mouseIsPressed){
        this.mouseClicked = true;
        if (this.pressTime < 1){
          this.pressTime += 1;
          if (this.func != null){
            this.func();
          }
        }
      }else{
        this.pressTime = 0;
        this.mouseClicked = false;
      }

    }else{
      if (this.isHover){
        cursor(ARROW);
      }
      this.isHover = false;
    }
  }

  display(){}
}
