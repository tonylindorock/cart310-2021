// a button with text
class ButtonIcon extends Button{
  constructor(posX, posY, width, height, icon){
    super(posX, posY, width, height);

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
    rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
  }

// button style when clicked
  clickStyle(){
    fill(255,255,255,75);
    rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
  }

  display(){
    this.checkForMouse();
    push();
    rectMode(CENTER);
    imageMode(CENTER);
    if (this.isHover){
      this.hoverStyle();
      if (this.mouseClicked){
        this.clickStyle();
      }
    }else{
      this.normalStyle();
    }
    image(this.icon, this.posX, this.posY, this.iconSize, this.iconSize);
    pop();
  }
}
