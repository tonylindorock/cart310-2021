// user object to store user data
class User {
  constructor() {
    this.info = {
      level: 1,
      coins: 0,
      xp: 0,
      keyStrokes: 0,
      checkBoxes: 0,
      efficiency: 0,
      doneChallenges: 0,
      magnets: [],
      days: 0
    };
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
