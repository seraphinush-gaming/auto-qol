// Version 2.00 r:00
'use strict';

class AutoQol {

    constructor(mod) {
        this.mod = mod;
        this.cmd = mod.command || mod.require.command;
        this.config = require('./config.json');
        this.submodules = {};

    }

    destructor() {
        this.mod = undefined;
        this.cmd = undefined;
        this.config = undefined;
        this.submodules = undefined;
    }

    initialize(submodules) {
        if (typeof submodules === 'string')
            submodules = [submodules];

        for (let submodule of submodules) {
            if (!this.loadedSubmodules[submodule]) {
                try {
                    let req = require(`./submodules/${submodule}`);
                    this.loadedSubmodules[submodule] = new req(this);
                    this[submodule] = this.loadedSubmodules[submodule];
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