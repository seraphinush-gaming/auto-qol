class AutoInspect {

  constructor(parent) {

    this.parent = parent;

    this.parent.hook('S_ANSWER_INTERACTIVE', 2, {}, (e) => {
      if (this.parent.settings.enableInspect) {
        if (this.parent.mod.majorPatchVersion >= 85) {
          this.parent.mod.send('C_REQUEST_USER_PAPERDOLL_INFO', 2, {
            unk: true,
            name: e.name
          });
        } else {
          this.parent.mod.send('C_REQUEST_USER_PAPERDOLL_INFO', 1, {
            name: e.name
          });
        }
      }
    });

  }

  destructor() {
    this.parent = undefined;
  }

}

module.exports = AutoInspect;