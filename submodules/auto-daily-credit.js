'use strict';

class auto_daily_credit {

  constructor(parent) {

    this.parent = parent;

    this.parent.m.hookOnce('S_LOGIN', 'event', () => {
      if (this.parent.s.enable_daily) {
        let _ = this.parent.m.trySend('C_REQUEST_RECV_DAILY_TOKEN', 1, {});
        !_ ? this.parent.m.log('Unmapped protocol packet \<C_REQUEST_RECV_DAILY_TOKEN\>.') : null;
      }
    });

  }

  destructor() {}

}

module.exports = auto_daily_credit;