// container for an item in the gift shop
class GiftItem {
  constructor(id) {
    this.func = null;
    this.price = 0;
    this.icon = null;
    this.des = "";
    this.NOTE_THEME_NUM = 1;
    this.id = id;
    // note themes
    switch (id) {
      // note playful
      case 0:
        this.icon = ICON_NOTE_PLAYFUL;
        this.des = "Unlock playful note";
        this.func = function() {
          btnPlayful.disabled = false;
          user.info.themesObtained.push(0);
        };
        this.price = 60;
        break;
        // note terminal
      case 1:
        this.icon = ICON_NOTE_TERMINAL;
        this.des = "Unlock terminal note";
        this.func = function() {
          btnTerminal.disabled = false;
          user.info.themesObtained.push(1);
        };
        this.price = 60;
        break;
        // magnets
      case 2:
        this.icon = GIFT_ROCKET;
        this.func = function() {
          addAward(COLOR_RED, AWARD_ROCKET);
        };
        this.des = "Obtain a decorative magnet";
        this.price = 40;
        break;
        // lightbulb
      case 3:
        this.icon = GIFT_LIGHTBULB;
        this.func = function() {
          addAward(COLOR_YELLOW, AWARD_LIGHTBULB);
        };
        this.des = "Obtain a decorative magnet";
        this.price = 40;
        break;
    }
  }
}
