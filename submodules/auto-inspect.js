class AutoCutscene {

    constructor(parent) {
        this.parent = parent;
        this.parent.initialize("auto-inspect");

        this.installHooks();
    }

    destructor() {
        this.parent = undefined;
    }

    installHooks() {
        this.parent.hook('S_ANSWER_INTERACTIVE', 2, (e) => {
            this.parent.send('C_REQUEST_USER_PAPERDOLL_INFO', 1, { name: e.name });
        });
    }

}

module.exports = AutoCutscene;