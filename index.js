'use strict';

const fs = require('fs');
const path = require('path');

class AutoQol {

    constructor(mod) {

        this.mod = mod;
        this.cmd = mod.command || mod.require.command;
        this.config = require('./config.json');
        this.submodules = {};

        let list = [];
        if (fs.existsSync(path.join(__dirname, 'submodules'))) {
            list = fs.readdirSync(path.join(__dirname, 'submodules'));
        } else {
            fs.mkdirSync(path.join(__dirname, 'submodules'));
        }
        for (let i = 0, n = list.length; i < n; i++) {
            this.initialize(list[i]);
        }

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
                    console.log(`\n[auto-qol] : Unable to load submodule [${submodule}] .. \n - ${e}\n`);
                }
            }
        }
    }

}

module.exports = function AutoQolLoader(mod) {
    return new AutoQol(mod)
}