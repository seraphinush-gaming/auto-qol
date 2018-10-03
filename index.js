// Version 1.00 r:00
'use strict';

const config = require('./config.json');

module.exports = function AutoQol(m) {
	const cmd = m.command || m.require.command;

	// config
	let enableSkipMovie = config.enableSkipMovie;

	// command
	cmd.add('skip', { // skip movie toggle
		$none() {
			enableSkipMovie = !enableSkipMovie;
			send(`auto-cutscene ${enableSkipMovie ? 'en' : 'dis'}abled`);
		}
	});

	// code
	m.hook('S_PLAY_MOVIE', 1, (e) => {
		if (!enableSkipMovie) return
		m.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
		return false
	});

	m.hook('S_ANSWER_INTERACTIVE', 2, (e) => {
		m.send('C_REQUEST_USER_PAPERDOLL_INFO', 1, { name: e.name });
	});

	function send(msg) { cmd.message(`: ` + msg); }

}