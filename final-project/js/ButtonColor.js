class ButtonColor extends Button{
  constructor(posX, posY, width, height, colorProfile, colorIndex, icon = null){
    super(posX, posY, width, height);

    this.icon = icon;
    this.iconSize = height * 0.75;

    this.colorProfile = colorProfile;
    this.colorIndex = colorIndex;

    this.CORNER_RADIUS = 8;
  }

// button style
  normalStyle(){
    fill(this.colorProfile[this.colorIndex]);
    rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
  }

// button style when hovered
  hoverStyle(){
    fill(255,255,255,50);
    rect(this.posX, this.posY, this.width * 1.2, this.width * 1.2, this.CORNER_RADIUS);
    fill(this.colorProfile[this.colorIndex]);
    rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
  }

// button style when clicked
  clickStyle(){
    fill(255,255,255,75);
    rect(this.posX, this.posY, this.width * 1.2, this.width * 1.2, this.CORNER_RADIUS);
    fill(this.colorProfile[this.colorIndex]);
    rect(this.posX, this.posY, this.width, this.width, this.CORNER_RADIUS);
  }

  display(){
    this.checkForMouse();
    push();
    rectMode(CENTER);
    imageMode(CENTER);
    if (this.isHover)){
      if (this.mouseClicked){
        this.clickStyle();
      }else{
        this.hoverStyle();
      }
    }else{
      this.normalStyle();
    }
    if (this.icon != null){
      image(this.icon, this.posX, this.posY, this.iconSize, this.iconSize);
    }
    pop();
  }
}
