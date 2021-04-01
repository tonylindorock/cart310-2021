// The base class for all buttons
class Button{
  constructor(posX, posY, width, height, toggle = false){
    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.isHover = false;
    this.mouseClicked = false;
    this.toggleMode = toggle;
    this.toggled = false;
    this.disabled = false;

    this.pressTime = 0;
    this.func = null;

    this.tooltip = "";
    this.showingTooltip = false;
    this.hoverTimeout = null;
  }

  connectFunc(def){
    this.func = def;
  }

  showTooltip(){}

  checkForMouse(){
    if (checkForMouseOver(this.posX, this.posY, this.width, this.height) && selectedItem.type === "" && !this.disabled){
      cursor(HAND);
      this.isHover = true;

      if (this.hoverTimeout === null){
        var thisObject = this;
        this.hoverTimeout = setTimeout(function(){
          thisObject.showingTooltip = true;
          //console.log("Showing tooltip");
        }, 2000);
      }

      if (mouseIsPressed){
        this.mouseClicked = true;

        if (this.pressTime < 1){
          this.pressTime += 1;
          this.toggled = !this.toggled;

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
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = null
        this.showingTooltip = false;
      }
      this.isHover = false;
    }
  }

  display(){}
}
