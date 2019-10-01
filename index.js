'use strict';

const fs = require('fs');
const path = require('path');

class AutoQol {

  constructor(mod) {

    this.mod = mod;
    this.cmd = mod.command;
    this.game = mod.game;
    this.settings = mod.settings;
    this.hooks = [];
    this.submodules = {};

    this.myGameId = BigInt(0);
    this.myName = '';

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
    this.cmd.add('qol', {
      'daily': () => {
        this.settings.enableDaily = !this.settings.enableDaily;
        this.send(`auto-daily ${this.settings.enableDaily ? 'en' : 'dis'}abled`);
      },
      'inspect': () => {
        this.settings.enableInspect = !this.settings.enableInspect;
        this.send(`auto-inspect ${this.settings.enableInspect ? 'en' : 'dis'}abled`);
      },
      'skip': () => {
        this.settings.enableCutscene = !this.settings.enableCutscene;
        this.send(`auto-cutscene ${this.settings.enableCutscene ? 'en' : 'dis'}abled`);
      },
      '$default': () => {
        this.send(`Invalid argument. uasge : qol [daily|inspect|skip]`);
      }
    });

    // game state
    this.game.on('enter_game', () => {
      this.myGameId = this.game.me.gameId;
      this.myName = this.game.me.name;
    });

  }

  destructor() {
    this.unload();
    this.cmd.remove('qol');
    
    for (let submodule in this.submodules) {
      this.submodules[submodule].destructor();
      delete this[submodule];
    }

    this.myName = undefined;
    this.myGameId = undefined;

    this.submodules = undefined;
    this.hooks = undefined;
    this.settings = undefined;
    this.game = undefined;
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

          this.mod.log(`.. Loaded submodule [${submodule}]`);
        }
        catch (e) {
          delete this[submodule];

          this.mod.warn(`Unable to load submodule [${submodule}] .. \n - ${e}\n`);
        }
      }
    }
  }

  // code
  hook() {
    this.hooks.push(this.mod.hook(...arguments));
  }

  unload() {
    if (this.hooks.length) {
      for (let h of this.hooks)
        this.mod.unhook(h);
      this.hooks = [];
    }
  }

  send() { this.cmd.message(': ' + [...arguments].join('\n\t - ')); }

  // reload
  saveState() {
    return this.myGameId;
  }

  loadState(state) {
    this.myGameId = state;
  }  

}

module.exports = AutoQol;