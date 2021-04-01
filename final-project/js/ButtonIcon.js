// a button with text
class ButtonIcon extends Button{
  constructor(posX, posY, width, height, icon, toggle = false){
    super(posX, posY, width, height, toggle);

    this.icon = icon;
    this.iconSize = height * 0.75;

    this.CORNER_RADIUS = 8;
  }

// button style
  normalStyle(){
  }

// button style when hovered
  hoverStyle(){
    fill(255,255,255,50);
    if (this.toggleMode && this.toggled){
      rect(this.posX, this.posY, this.width * 1.2, this.width * 1.2, this.CORNER_RADIUS);
    }else{
      rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
    }
  }

// button style when clicked
  clickStyle(){
    if (this.toggleMode){
      fill(255,255,255,50);
    }else{
      fill(255,255,255,75);
    }
    rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
  }

  display(){
    this.checkForMouse();
    push();
    rectMode(CENTER);
    imageMode(CENTER);
    if (this.isHover || (this.toggleMode && this.toggled)){
      if (this.mouseClicked){
        this.clickStyle();
      }else{
        this.hoverStyle();
      }
    }else{
      this.normalStyle();
    }
    image(this.icon, this.posX, this.posY, this.iconSize, this.iconSize);
    pop();
  }
}
