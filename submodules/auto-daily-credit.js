class AutoDailyCredit {

    constructor(parent) {

        this.parent = parent;

        this.enable = true;

        this.parent.mod.game.on('enter_game', () => {
            let _ = this.parent.mod.trySend('C_REQUEST_RECV_DAILY_TOKEN', 1, {});
            if (!_)
                console.log('Unmapped protocol packet \<C_REQUEST_RECV_DAILY_TOKEN\>.');
        });

    }

    destructor() {
        this.parent = undefined;
    }

}

module.exports = AutoDailyCredit;