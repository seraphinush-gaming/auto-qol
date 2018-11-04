class AutoCutscene {

    constructor(parent) {

        this.parent = parent;
        this.enable = parent.config.enableCutscene;

        // command
        this.parent.cmd.add('skip', {
            '$none': () => {
                console.log('check');
                this.enable = !this.enable;
                this.send(`auto-cutscene ${this.enable ? 'en' : 'dis'}abled`);
            }
        });

        this.installHooks();

    }

    destructor() {
        this.enable = undefined;
        this.parent = undefined;
    }

    installHooks() {
        this.parent.mod.hook('S_PLAY_MOVIE', 1, (e) => {
            if (this.enable) return;
            this.parent.mod.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
            return false;
        });
    }

    send(msg) { this.parent.cmd.message(`: ` + msg); }

}

module.exports = AutoCutscene;