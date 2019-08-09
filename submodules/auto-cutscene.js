class AutoCutscene {

  constructor(parent) {

    this.parent = parent;

    this.parent.hook('S_PLAY_MOVIE', 1, (e) => {
      if (this.parent.settings.enableCutscene) {
        this.parent.mod.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
        return false;
      }
    });

  }

  destructor() {
    this.parent = undefined;
  }

}

module.exports = AutoCutscene;