'use strict';

const fs = require('fs');
const path = require('path');

class auto_qol {

  constructor(mod) {

    this.m = mod;
    this.c = mod.command;
    this.g = mod.game;
    this.s = mod.settings;
    this.hooks = [];
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

    // command
    this.c.add('qol', {
      'daily': () => {
        this.s.enable_daily = !this.s.enable_daily;
        this.send(`auto-daily ${this.s.enable_daily ? 'en' : 'dis'}abled`);
      },
      'inspect': () => {
        this.s.enable_inspect = !this.s.enable_inspect;
        this.send(`auto-inspect ${this.s.enable_inspect ? 'en' : 'dis'}abled`);
      },
      'skip': () => {
        this.s.enable_cutscene = !this.s.enable_cutscene;
        this.send(`auto-cutscene ${this.s.enable_cutscene ? 'en' : 'dis'}abled`);
      },
      '$default': () => {
        this.send(`Invalid argument. uasge : qol [daily|inspect|skip]`);
      }
    });

  }

  destructor() {
    this.unload();
    this.c.remove('qol');
    
    for (let submodule in this.submodules) {
      this.submodules[submodule].destructor();
      delete this[submodule];

      this.m.log(`.. Unloaded submodule [${submodule}]`);
    }
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

          this.m.log(`.. Loaded submodule [${submodule}]`);
        }
        catch (e) {
          delete this[submodule];

          this.m.warn(`Unable to load submodule [${submodule}] .. \n - ${e}\n`);
        }
      }
    }
  }

  // code
  hook() {
    this.hooks.push(this.m.hook(...arguments));
  }

  unload() {
    if (this.hooks.length) {
      for (let h of this.hooks)
        this.m.unhook(h);
      this.hooks = [];
    }
  }

  send() { this.c.message(': ' + [...arguments].join('\n - ')); }

  // reload
  saveState() {}

  loadState() {}

}

module.exports = auto_qol;