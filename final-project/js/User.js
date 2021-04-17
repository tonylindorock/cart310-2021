// user object to store user data
class User {
  constructor() {
    this.info = {
      points: 0,
      keyStrokes: 0,
      checkBoxes: 0,
      efficiency: 0,
      pointsEarned: 0,
      magnets: [],
      notes: [],
      startDay: 1,
      startMonth: 3,
      startYear: 2021,
      todayUsed: false,
      themesObtained: [],
      gifts: [0, 1]
    };
  }
  // load from local storage
  loadData() {
    let data = getItem('user');
    if (data != null) {
      for (let k in data) {
        this.info[k] = data[k];
      }
      return true;
    }
    return false;
  }

  saveData() {
    // empty arrays
    this.info.notes = [];
    this.info.magnets = [];
    this.info.gifts = [];
    // save notes
    for (let i = 0; i < noteContainer.length; i++) {
      let noteData = {};
      noteData['id'] = noteContainer[i].id;
      noteData['theme'] = noteContainer[i].theme;
      noteData['bgColor'] = noteContainer[i].bgColor;
      noteData['textColor'] = noteContainer[i].textColor;
      noteData['lines'] = noteContainer[i].lines;
      noteData['markup'] = [];
      // markup and checkboxes
      if (noteContainer[i].characters[0][0] != null) {
        let markup = [];
        for (let a = 0; a < noteContainer[i].characters.length; a++) {
          for (let b = 0; b < noteContainer[i].characters[a].length; b++) {
            // underline
            if (noteContainer[i].characters[a][b].underline) {
              markup.push([a, b, 0, noteContainer[i].characters[a][b].underlineColor]);
            }
            // highlight
            if (noteContainer[i].characters[a][b].highlight) {
              if (noteContainer[i].theme === 1) {
                markup.push([a, b, 1, noteContainer[i].textColor]);
              } else {
                markup.push([a, b, 1, noteContainer[i].characters[a][b].highlightColor]);
              }
            }
            // checkbox
            if (noteContainer[i].characters[a][b].button != null) {
              markup.push([a, b, 2, noteContainer[i].characters[a][b].char]);
            }
          }
        }
        noteData['markup'] = markup;
      }
      // save note thumbnail position
      for (let j = 0; j < noteThumbnailContainer.length; j++) {
        if (noteData['id'] === noteThumbnailContainer[j].id) {
          noteData['pos'] = [noteThumbnailContainer[j].posX, noteThumbnailContainer[j].posY];
        }
      }
      this.info.notes.push(noteData);
      //console.log(noteData);
    }
    // save magnets
    for (let i = 0; i < magnetContainer.length; i++) {
      let magnet = {};
      magnet['bgColor'] = magnetContainer[i].bgColor;
      magnet['id'] = magnetContainer[i].id;
      magnet['iconId'] = magnetContainer[i].iconId;
      magnet['pos'] = [magnetContainer[i].posX, magnetContainer[i].posY];
      this.info.magnets.push(magnet);
    }
    // gift shop
    if (!giftShop.item0Sold) {
      this.info.gifts.push(giftShop.item0Id);
    } else {
      this.info.gifts.push(-1);
    }
    if (!giftShop.item1Sold) {
      this.info.gifts.push(giftShop.item1Id);
    } else {
      this.info.gifts.push(-1);
    }

    storeItem('user', this.info);
    //console.log(this.info);
  }
  // get usage duration
  getDuration() {
    let thisDay, thisMonth, thisYear
    thisDay = day();
    thisMonth = month() - 1;
    thisYear = year();
    var thisDate = new Date(thisYear, thisMonth, thisDay);
    var startDate = new Date(int(this.info.startYear), int(this.info.startMonth), int(this.info.startDay));
    let difference = (thisDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;
    return difference;
  }
  // spend points
  usePoints(amount) {
    if (this.info.points >= amount) {
      this.info.points -= amount;
      return true;
    }
    return false;
  }
  // add points
  addPoints(amount) {
    this.info.points += amount;
    this.info.pointsEarned += amount
    if (this.info.points > 99) {
      this.info.points = 99;
      notification.update("Your points bank is full. Spend it!");
    }
  }
}
