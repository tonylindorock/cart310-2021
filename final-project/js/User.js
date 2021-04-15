// user object to store user data
class User {
  constructor() {
    this.info = {
      coins: 0,
      keyStrokes: 0,
      checkBoxes: 0,
      efficiency: 0,
      coinsSpent: 0,
      magnets: [],
      notes: [],
      startDay: 1,
      startMonth: 4,
      startYear: 2021,
      gifts: []
    };
  }

  loadData(){
    let data = getItem('user');
    if (data != null){
      for(let k in data){
        this.info[k] = data[k];
      }
      return true;
    }
    return false;
  }

  saveData(){
    this.info.notes = [];
    this.info.magnets = [];
    for(let i = 0; i < noteContainer.length; i++){
      let noteData = {};
      noteData['id'] = noteContainer[i].id;
      noteData['theme'] = noteContainer[i].theme;
      noteData['bgColor'] = noteContainer[i].bgColor;
      noteData['textColor'] = noteContainer[i].textColor;
      noteData['lines'] = noteContainer[i].lines;
      let markup = [];
      for (let a = 0; a < noteContainer[i].characters.length; a++) {
        for (let b = 0; b < noteContainer[i].characters[a].length; b++) {
          if (noteContainer[i].characters[a][b].underline){
            markup.push([a, b, 0]);
          }
          if (noteContainer[i].characters[a][b].highlight){
            markup.push([a, b, 1]);
          }
        }
      }
      noteData['markup'] = markup;
      for(let j = 0; j < noteThumbnailContainer.length; j++){
        if(noteData['id'] === noteThumbnailContainer[j].id){
          noteData['pos'] = [noteThumbnailContainer[j].posX, noteThumbnailContainer[j].posY];
        }
      }
      this.info.notes.push(noteData);
      console.log(noteData);
    }
    for(let i = 0; i < magnetContainer.length; i++){
      let magnet = {};
      magnet['bgColor'] = magnetContainer[i].bgColor;
      magnet['id'] = magnetContainer[i].id;
      magnet['iconId'] = magnetContainer[i].iconId;
      magnet['pos'] = [magnetContainer[i].posX, magnetContainer[i].posY];
      this.info.magnets.push(magnet);
    }
    storeItem('user', this.info);
    //console.log(this.info);
  }

  getDuration(){

  }

  update(key, value) {
    if (key in this.info) {
      this.info[key] = value;
    }
  }

  useCoins(amount){
    if (this.info.coins >= amount){
      this.info.coins -= amount;
      return true;
    }
    return false;
  }
}
