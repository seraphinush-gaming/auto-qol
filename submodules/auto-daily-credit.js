class AutoDailyCredit {

  constructor(parent) {

    this.parent = parent;

    this.enable = true;

    this.parent.hook('S_LOGIN', 'raw', () => {
      if (this.enable) {
        let _ = this.parent.mod.trySend('C_REQUEST_RECV_DAILY_TOKEN', 1, {});
        if (!_) {
          this.enable = false;
          this.parent.mod.log('Unmapped protocol packet \<C_REQUEST_RECV_DAILY_TOKEN\>.');
        }
      }
    });

  }

  destructor() {
    this.parent = undefined;
  }

}

module.exports = AutoDailyCredit;