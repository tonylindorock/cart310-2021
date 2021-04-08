class User{
  constructor(){
    this.info = {
      level: 1,
      xp: 0,
      keyStrokes: 0,
      checkBoxes: 0,
      efficiency: 0,
      doneChallenges: 0,
      magnets: [],
      days: 0
    };
  }

  update(key, value){
    if (key in this.info){
      this.info[key] = value;
    }
  }
}
