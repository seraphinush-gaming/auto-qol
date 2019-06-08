class AutoCutscene {

  constructor(parent) {

    this.parent = parent;

    // command
    this.parent.cmd.add('skip', {
      '$none': () => {
        this.parent.settings.enableCutscene = !this.parent.settings.enableCutscene;
        this.send(`auto-cutscene ${this.parent.settings.enableCutscene ? 'en' : 'dis'}abled`);
      }
    });

    this.parent.hook('S_PLAY_MOVIE', 1, (e) => {
      if (this.parent.settings.enableCutscene) {
        this.parent.mod.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
        return false;
      }
    });

  }

  destructor() {
    this.parent.cmd.remove('skip');

    this.parent = undefined;
  }

  send(msg) { this.parent.cmd.message(`: ` + msg); }

}

module.exports = AutoCutscene;