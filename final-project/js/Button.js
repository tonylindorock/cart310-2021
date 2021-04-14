// The base class for all buttons
class Button{
  constructor(posX, posY, width, height, toggle = false){
    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.isHovered = false;
    this.mouseClicked = false;
    this.toggleMode = toggle;
    this.toggled = false;
    this.disabled = false;

    this.pressTime = 0;
    this.func = null;

    this.tooltip = "";
    this.hoverTimeout = null;
  }
  // function when pressed
  connectFunc(def){
    this.func = def;
  }

  checkForMouse(){
    if (checkForMouseOver(this.posX, this.posY, this.width, this.height) && selectedItem.type === "" && !this.disabled){
      //cursor(HAND);
      this.isHovered = true;

      // show tooltip when hovered for 2s
      if (this.hoverTimeout === null){
        var thisObject = this;
        this.hoverTimeout = setTimeout(function(){
          showTooltip(thisObject.tooltip);
          //console.log("Showing tooltip");
        }, 2000);
      }

      if (mouseIsPressed){
        this.mouseClicked = true;
        // do once
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
      if (this.isHovered){
        //cursor(ARROW);
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = null;
        isShowingTooltip = false;
      }
      this.isHovered = false;
    }
  }

  forget(){
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = null;
    isShowingTooltip = false;
  }

  display(){}
}
