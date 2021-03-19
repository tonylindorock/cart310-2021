// The base class for all buttons
class Button{
  constructor(posX, posY, width, height, bgColor){
    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.bgColor = bgColor;

    this.isHover = false;
    this.mouseClicked = false;
  }

  checkForMouse(){
    if (mouseX >= this.posX - this.width/2 && mouseX <= this.posX + this.width/2
    && mouseY >= this.posY - this.height/2 && mouseY <= this.posY + this.height/2){
      this.isHover = true;
      if (mouseIsPressed){
        this.mouseClicked = true;
      }else{
        this.mouseClicked = false;
      }
    }else{
      this.isHover = false;
    }

  }

  display(){}
}
