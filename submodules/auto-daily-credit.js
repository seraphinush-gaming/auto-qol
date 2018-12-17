class AutoDailyCredit {

    constructor(parent) {

        this.parent = parent;

        this.parent.mod.game.on('enter_game', () =>
            this.parent.mod.send('C_REQUEST_RECV_DAILY_TOKEN', 1, {})
        );

    }

    destructor() {
        this.parent = undefined;
    }

}

module.exports = AutoDailyCredit;