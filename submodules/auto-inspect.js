class AutoInspect {

    constructor(parent) {

        this.parent = parent;

        this.installHooks();

    }

    destructor() {
        this.parent = undefined;
    }

    installHooks() {
        this.parent.mod.hook('S_ANSWER_INTERACTIVE', 2, (e) => {
            this.parent.mod.send('C_REQUEST_USER_PAPERDOLL_INFO', 1, { name: e.name });
        });
    }

}

module.exports = AutoInspect;