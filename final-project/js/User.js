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

  saveUserData(){
    storeItem("user", this);
  }

  getDuration(){

  }

  update(key, value) {
    if (key in this.info) {
      this.info[key] = value;
    }
  }

  useCoins(amount){
    if (this.coins >= amount){
      this.coins -= amount;
      return true;
    }
    return false;
  }
}
