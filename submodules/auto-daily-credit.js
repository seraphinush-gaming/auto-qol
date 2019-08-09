class AutoDailyCredit {

  constructor(parent) {

    this.parent = parent;

    this.parent.hook('S_LOGIN', 'raw', () => {
      if (this.parent.settings.enableDaily) {
        let _ = this.parent.mod.trySend('C_REQUEST_RECV_DAILY_TOKEN', 1, {});
        if (!_) {
          this.parent.mod.warn('Unmapped protocol packet \<C_REQUEST_RECV_DAILY_TOKEN\>.');
        }
      }
    });

  }

  destructor() {
    this.parent = undefined;
  }

}

module.exports = AutoDailyCredit;