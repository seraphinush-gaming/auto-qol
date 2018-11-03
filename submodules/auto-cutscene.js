class AutoCutscene {

    constructor(parent) {
        this.enable = parent.config.enableSkipCutscene;
        this.parent = parent;
        this.parent.initialize("auto-cutscene");

        this.installCommand();
        this.installHooks();
    }

    destructor() {
        this.enable = undefined;
        this.parent = undefined;
    }

    command() {
        this.parent.cmd.add('skip', { // skip movie toggle
            $none() {
                this.enable = !this.enable;
                send(`auto-cutscene ${this.enable ? 'en' : 'dis'}abled`);
            }
        });
    }

    installHooks() {
        this.parent.hook('S_PLAY_MOVIE', 1, (e) => {
            if (this.enable) return;
            this.parent.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
            return false;
        });
    }

    send(msg) { this.parent.cmd.message(`: ` + msg); }

}

module.exports = AutoCutscene;