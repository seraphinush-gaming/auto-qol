// Version 2.00 r:03
'use strict';

class AutoQol {

    constructor(mod) {

        this.mod = mod;
        this.cmd = mod.command || mod.require.command;
        this.config = require('./config.json');
        this.submodules = {};

        if (this.config.autoCutscene) { this.initialize("auto-cutscene"); }
        if (this.config.autoInspect) { this.initialize("auto-inspect"); }

    }

    destructor() {
        for(let submodule in this.submodules) {
            this.submodules[submodule].destructor();
            delete this[submodule];
        }

        this.submodules = undefined;
        this.config = undefined;
        this.cmd = undefined;
        this.mod = undefined;
    }

    initialize(submodules) {
        if (typeof submodules === 'string') {
            submodules = [submodules];
        }

        for (let submodule of submodules) {
            if (!this.submodules[submodule]) {
                try {
                    let req = require(`./submodules/${submodule}`);
                    this.submodules[submodule] = new req(this);
                    this[submodule] = this.submodules[submodule];
                }
                catch (e) {
                    console.log(`[auto-qol] Unable to load submodule ${submodule}: ${e}`);
                }
            }
        }
    }

}

module.exports = function AutoQolLoader(mod) {
    return new AutoQol(mod)
}