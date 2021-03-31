class ButtonColor extends Button{
  constructor(posX, posY, width, colorProfile, colorIndex, icon = null){
    super(posX, posY, width, width);

    this.icon = icon;
    this.iconSize = width * 0.75;

    this.colorProfile = colorProfile;
    this.colorIndex = colorIndex;
  }

// button style
  normalStyle(){
    this.drawStroke();
    fill(this.colorProfile[this.colorIndex]);
    ellipse(this.posX, this.posY, this.width);
  }

// button style when hovered
  hoverStyle(){
    fill(255,255,255,50);
    ellipse(this.posX, this.posY, this.width * 1.4);
    this.drawStroke();
    fill(this.colorProfile[this.colorIndex]);
    ellipse(this.posX, this.posY, this.width);
  }

// button style when clicked
  clickStyle(){
    fill(255,255,255,75);
    ellipse(this.posX, this.posY, this.width * 1.4);
    this.drawStroke();
    fill(this.colorProfile[this.colorIndex]);
    ellipse(this.posX, this.posY, this.width);
  }

  drawStroke(){
    stroke(COLOR_WHITE);
    if (this.icon != null){
      strokeWeight(2);
    }else{
      strokeWeight(4);
    }
  }

  display(){
    this.checkForMouse();
    push();
    rectMode(CENTER);
    ellipseMode(CENTER);
    imageMode(CENTER);
    if (this.isHover){
      if (this.mouseClicked){
        this.clickStyle();
      }else{
        this.hoverStyle();
      }
    }else{
      this.normalStyle();
    }
    noStroke();
    if (this.icon != null){
      image(this.icon, this.posX, this.posY, this.iconSize, this.iconSize);
    }
    pop();
  }
}
