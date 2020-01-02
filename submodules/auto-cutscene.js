'use strict';

class auto_cutscene {

  constructor(parent) {

    this.parent = parent;

    this.parent.hook('S_PLAY_MOVIE', 1, (e) => {
      if (this.parent.s.enable_cutscene) {
        this.parent.m.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
        return false;
      }
    });

  }

  destructor() {}

}

module.exports = auto_cutscene;