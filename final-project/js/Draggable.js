class Draggable{
  constructor(posX, posY, width, height, type, id){
    this.posX = posX;
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.type = type;
    this.id = id;

    this.isHovered = false;
    this.mouseClicked = false;

    this.RAND_ROTATE = 12;
    this.rotation = random(-this.RAND_ROTATE, this.RAND_ROTATE);
    this.offsetX = 0.0;
    this.offsetY = 0.0;
  }

  checkForMouse(){
    if (checkForMouseOver(this.posX, this.posY, this.width, this.height)){
      cursor(ARROW);
      this.isHovered = true;

      if (mouseIsPressed){
        cursor('grab');
        if (selectedItem.id != this.id && selectedItem.type != this.type){
          updateSelectedItem(this.type, this.id);
        }
        if (selectedItem.id === this.id && selectedItem.type === this.type){
          this.mouseClicked = true;
          this.posX = mouseX - this.offsetX;
          this.posY = mouseY - this.offsetY;
        }
      }else{
        this.mouseClicked = false;
        if (selectedItem.id === this.id && selectedItem.type === this.type){
          updateSelectedItem("",-1);
        }
      }
      this.offsetX = mouseX - this.posX;
      this.offsetY = mouseY - this.posY;

    }else{
      if (this.isHovered){
        cursor(ARROW);
      }
      this.isHovered = false;
    }
  }

  checkForDrag(){
    if (this.mouseClicked){
      this.posX = mouseX - this.offsetX;
      this.posY = mouseY - this.offsetY;
    }
  }

  display(){}
}
