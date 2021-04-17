// a draggable object
class Draggable {
  constructor(posX, posY, width, height, type, id) {
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
  // check for mouse hovering and clicking
  checkForMouse() {
    if (checkForMouseOver(this.posX, this.posY, this.width, this.height)) {
      cursor(ARROW);
      this.isHovered = true;
      // push to hovered draggables array
      updateDraggableItems(this, true);

      if (mouseIsPressed) {
        userIsActive();
        cursor('grab');
        let top = findTopItem(); // get the draggable on the very top
        // if it's the selected item and the object on the top
        if (selectedItem.id != this.id && selectedItem.type != this.type && top.id === this.id && top.type === this.type) {
            if (selectedItem.id === -1){
              // remember the selected object
              updateSelectedItem(this.type, this.id);
            }
          }
        // check for remembered draggable and move it with mouse motion
        if (selectedItem.id === this.id && selectedItem.type === this.type) {
          this.mouseClicked = true;
          this.posX = mouseX - this.offsetX;
          this.posY = mouseY - this.offsetY;
        }
      // if mouse button up
      } else {
        this.mouseClicked = false;
        // reset selected item
        if (selectedItem.id === this.id && selectedItem.type === this.type) {
          saveUserData();
          updateSelectedItem("", -1);
        }
      }
      // so that the draggable won't reposition when selected
      this.offsetX = mouseX - this.posX;
      this.offsetY = mouseY - this.posY;
    // if not hovered
    } else {
      if (this.isHovered) {
        cursor(ARROW);
      }
      this.isHovered = false;
      updateDraggableItems(this, false);
    }
  }
  // forget this draggable
  forget() {
    this.isHovered = false;
    this.mouseClicked = false;
  }

  checkForDrag() {
    if (this.mouseClicked && selectedItem.id === this.id && selectedItem.type === this.type) {
      this.posX = mouseX - this.offsetX;
      this.posY = mouseY - this.offsetY;
    }
  }

  display() {}
}
