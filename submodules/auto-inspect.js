class AutoInspect {

  constructor(parent) {

    this.parent = parent;

    this.parent.hook('S_ANSWER_INTERACTIVE', 2, {}, (e) => {
      if (this.parent.settings.enableInspect) {
        this.parent.mod.send('C_REQUEST_USER_PAPERDOLL_INFO', 2, {
          unk: false,
          name: e.name
        });
      }
    });

  }

  destructor() {
    this.parent = undefined;
  }

}

module.exports = AutoInspect;