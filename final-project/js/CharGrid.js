// Notepad with lines
class CharGrid{
  constructor(theme, bgColor, textColor, id){
    this.id = id;
    this.theme = theme;
    this.font = "Courier";
    this.bgColor = bgColor;
    this.textColor = textColor;

    this.lines = [""];
    this.characters = [];
    this.characters[0] = [];

    this.pointerPosX = 0;
    this.pointerPosY = 0;

    this.MAX_SIZE = 600;

    this.underlineEnabled = false;
    this.highlightEnabled = false;

    this.keyIsTyped = false;

    this.setup();
  }

  setup(){
    if (this.theme === 0){
      this.font = FONT_PLAYFUL;
    }else if (this.theme === 1){
      this.font = FONT_TERMINAL;
      this.highlightColor = this.bgColor;
    }
  }

  addChar(character, special = ""){
    let valid = true;
    if (this.lines[this.pointerPosY].length === CHAR_WIDTH){
      this.pointerPosX = 0;
      if (this.lines.length != CHAR_HEIGHT){
        this.pointerPosY += 1;
        this.lines.push("");
        this.characters.push([]);
      }else{
        valid = false;
      }
    }
    if (valid){
      let newChar = new Character(this.pointerPosX, this.pointerPosY, character, special);
      newChar.underlineEnabled = this.underlineEnabled;
      newChar.highlightEnabled = this.highlightEnabled;
      this.lines[this.pointerPosY] =  this.lines[this.pointerPosY] + character;
      this.characters[this.pointerPosY].push(newChar);
      //console.log(character + " New char added at "+ this.pointerPosX + " " + this.pointerPosY);
      if (character === "\n" && this.pointerPosY < CHAR_HEIGHT){
        this.pointerPosY += 1;
        this.pointerPosX = 0;
        this.lines.push("");
        this.characters.push([]);
      }else{
        this.pointerPosX += 1;
      }
    }
  }

  addLine(line){
    for (let j = 0; j < line.length; j++) {
      this.addChar(line.charAt(j));
    }
  }

  addCheckButton(){
    if (this.pointerPosX < CHAR_WIDTH - 2){
      this.addChar("[");
      this.addChar(" ", "CHECK_BUTTON");
      this.addChar("]");
    }else{
      console.log("Cannot add checkbox.");
    }
  }

  removeChar(){
    if (this.pointerPosX === 0){
      if (this.pointerPosY > 0){
        this.pointerPosY -= 1;
        this.lines.pop();
        this.characters.pop();
      }
      this.pointerPosX = this.lines[this.pointerPosY].length;
    }else{
      this.pointerPosX -= 1;
      let temp = this.lines[this.pointerPosY];
      this.lines[this.pointerPosY] = temp.substring(0, temp.length - 1);
      this.characters[this.pointerPosY].pop();
    }
  }

  copyNote(){
    let text = "";
    for(let i = 0; i < this.lines.length; i++){
      text += this.lines[i];
    }
    alert(text);
  }

  toggleUnderline(state){
    this.underlineEnabled = state;
    for(let i = 0; i < this.characters.length; i++){
      for(let j = 0; j < this.characters[i].length; j++){
        this.characters[i][j].underlineEnabled = state;
      }
    }
  }

  toggleHighlight(state){
    this.highlightEnabled = state;
    for(let i = 0; i < this.characters.length; i++){
      for(let j = 0; j < this.characters[i].length; j++){
        this.characters[i][j].highlightEnabled = state;
      }
    }
  }

  displayPointer(){
    push();
    translate(windowWidth/2-this.MAX_SIZE/2, TOP_MENU_HEIGHT/2);
    rectMode(CORNER);
    if (frameCount % 120 < 60 || this.keyIsTyped){
      fill(this.textColor);
      if (frameCount % 120 < 60){
        this.keyIsTyped = false;
      }
    }else{
      noFill();
    }
    rect(this.pointerPosX * MAX_NOTE_SIZE/CHAR_WIDTH, this.pointerPosY * MAX_NOTE_SIZE/CHAR_HEIGHT, 3, MAX_NOTE_SIZE/CHAR_HEIGHT);
    pop();
  }

  display(){
    push();
    translate(windowWidth/2-this.MAX_SIZE/2, TOP_MENU_HEIGHT/2);
    rectMode(CORNER);
    fill(this.bgColor);
    stroke(this.bgColor);
    strokeWeight(32);
    rect(0, 0, this.MAX_SIZE, this.MAX_SIZE);

    noStroke();
    textFont(this.font);
    for(let i = 0; i < this.characters.length; i++){
      for(let j = 0; j < this.characters[i].length; j++){
        this.characters[i][j].display(this.bgColor, this.textColor);
      }
    }
    pop();
    this.displayPointer()
  }
}
