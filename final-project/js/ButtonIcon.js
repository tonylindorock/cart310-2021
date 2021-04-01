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

  showTooltip(){
    push();
    fill(COLOR_WHITE);
    textFont(FONT_PLAYFUL);
    textSize(16);
    textAlign(LEFT,CENTER);
    let tipPosX = mouseX;
    let tipPosY = mouseY + 24;
    if (mouseX > windowWidth - textWidth(this.tooltip)){
      tipPosX -= textWidth(this.tooltip);
    }
    text(this.tooltip, tipPosX, tipPosY);
    pop();
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
    if (this.disabled){
      image(ICON_DISABLED, this.posX, this.posY, this.width/2, this.width/2);
    }
    if (this.showingTooltip){
      this.showTooltip();
    }
    pop();
  }
}
