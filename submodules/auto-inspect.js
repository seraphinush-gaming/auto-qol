'use strict';

class auto_inspect {

  constructor(parent) {

    this.parent = parent;

    this.parent.hook('S_ANSWER_INTERACTIVE', 2, {}, (e) => {
      if (this.parent.s.enable_inspect) {
        this.parent.m.send('C_REQUEST_USER_PAPERDOLL_INFO', 2, {
          unk: false,
          name: e.name
        });
      }
    });

  }

  destructor() {}

}

module.exports = auto_inspect;