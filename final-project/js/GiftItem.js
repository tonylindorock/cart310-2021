// container for an item in the gift shop
class GiftItem {
  constructor(id) {
    this.func = null;
    this.price = 0;
    this.icon = null;
    this.des = "";
    // note themes
    if (id === 0) {
      let r = int(random(2));
      while (r in user.info.themesObtained) {
        r = int(random(2));
      }
      switch (r) {
        // note playful
        case 0:
          this.func = function() {
            btnPlayful.disabled = false;
          };
          this.icon = ICON_NOTE_PLAYFUL;
          this.des = "Unlock playful note";
          break;
        // note terminal
        case 1:
          this.func = function() {
            btnTerminal.disabled = false;
          };
          this.icon = ICON_NOTE_TERMINAL;
          this.des = "Unlock terminal note";
          break;
      }
      this.price = 60;
      // magnets
    } else {
      let r = int(random(2));
      switch (r) {
        // rocket
        case 0:
          this.icon = GIFT_ROCKET;
          this.func = function() {
            addAward(COLOR_RED, AWARD_ROCKET);
          };
          break;
        // lightbulb
        case 1:
          this.icon = GIFT_LIGHTBULB;
          this.func = function() {
            addAward(COLOR_YELLOW, AWARD_LIGHTBULB);
          };
          break;
      }
      this.des = "Obtain a decorative magnet";
      this.price = 40;
    }
  }
}
