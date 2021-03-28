// Notepad with lines
class CharGrid{
  constructor(theme, bgColor, textColor){
    this.CHAR_WIDTH = 24;
    this.CHAR_HEIGHT = 16;

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

    this.setup();
  }

  setup(){
    if (this.theme === 0){
      this.font = FONT_PLAYFUL;
    }else if (this.theme === 1){
      this.font = FONT_TERMINAL;
    }
  }

  addChar(character){
    if (this.lines[this.pointerPosY].length === CHAR_WIDTH){
      this.pointerPosX = 0;
      if (this.lines.size != CHAR_HEIGHT){
        this.pointerPosY += 1;
        this.lines.push("");
        this.characters.push([]);
      }
    }
    let newChar = new Character(this.pointerPosX, this.pointerPosY, character);
    this.lines[this.pointerPosY] =  this.lines[this.pointerPosY] + character;
    this.characters[this.pointerPosY].push(newChar);
    console.log(character + " New char added at "+ this.pointerPosX + " " + this.pointerPosY);
    if (character === "\n" && this.pointerPosY < CHAR_HEIGHT){
      this.pointerPosY += 1;
      this.pointerPosX = 0;
      this.lines.push("");
      this.characters.push([]);
    }else{
      this.pointerPosX += 1;
    }
  }

  addLine(line){
    for (let j = 0; j < line.length; j++) {
      this.addChar(line.charAt(j));
    }
  }

  display(){
    push();
    translate(windowWidth/2-this.MAX_SIZE/2, windowHeight/2-this.MAX_SIZE/2);
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
        //rect(j * this.MAX_SIZE/this.CHAR_WIDTH, i * this.MAX_SIZE/this.CHAR_HEIGHT, this.MAX_SIZE/this.CHAR_WIDTH, this.MAX_SIZE/this.CHAR_HEIGHT);
      }
    }
    pop();
  }
}
