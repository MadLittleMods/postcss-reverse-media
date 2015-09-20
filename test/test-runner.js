import { argv } from 'yargs';
import through from 'through2';
import str from 'string-to-stream';

import { exec } from 'child_process';

import tapSpec from 'tap-spec';


// grep
// 	`npm run test -- --grep "Transform and logic at end"`
// unformatted
// 	`npm run test -- --unformatted`


let noop = through.obj(function(chunk, enc, done) {
	this.push(chunk);
	done();
});


// Get around the `; exit 0;` trick because we need to be able to pass custom arguments
// see: https://docs.npmjs.com/cli/run-script
let argString = Object.keys(argv).reduce((prevResult, key) => {
	let value = argv[key];

	if(key === '$0' || key === '_') {
		return prevResult;
	}

	return `${prevResult} --${key} "${value}"`;
}, '');
let child = exec(`babel-tape-runner test/test.js ${argString}`, function(error, stdout, stderr) {
	if(error) {
		console.log(error);
	}
	if(stderr) {
		console.log(stderr);
	}

	str(stdout)
		.pipe(argv.unformatted ? noop : tapSpec())
		.pipe(process.stdout);
});

child.on('exit', function (exitCode) {
	if(exitCode !== 0) {
		console.log(`Child exited with code: ${exitCode}`);
	}
	process.exitCode = 0;
});

