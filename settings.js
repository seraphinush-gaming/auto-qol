'use strict';

const DefaultSettings = {
  "enable_cutescene": true,
  "enable_daily": true,
  "enable_inspect": true
};

function MigrateSettings(from_ver, to_ver, settings) {
  if (from_ver === undefined) {
    return Object.assign(Object.assign({}, DefaultSettings), settings);
  }
  else if (from_ver === null) {
    return DefaultSettings;
  }
  else {
    if (from_ver + 1 < to_ver) {
      settings = MigrateSettings(from_ver, from_ver + 1, settings);
      return MigrateSettings(from_ver + 1, to_ver, settings);
    }

    switch (to_ver) {
      case 3:
        settings.enable_cutescene = settings.enableCutscene;
        settings.enable_daily = settings.enableDaily;
        settings.enable_inspect = settings.enableInspect;
        delete settings.enableCutscene;
        delete settings.enableDaily;
        delete settings.enableInspect;
        break;
    }

    return settings;
  }
}

module.exports = MigrateSettings;