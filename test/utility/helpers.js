import { argv } from 'yargs';

import tape from 'tape';

import postcss from 'postcss';
import reverseMedia from '../../';


let harness = tape;


let testFilter = argv.grep || argv.g;
let testFilterRe = new RegExp(testFilter);
let shouldRunTest = function(name) {
	if(testFilter) {
		return testFilterRe.test(name);
	}

	return true;
};



export function test(name, actual, expected, opts = {}) {
	if (shouldRunTest(name)) {
		harness(name, (t) => {
			t.plan(1);
			
			let results = postcss([
					reverseMedia(opts)
				])
				.process(actual)
				.css;

			t.equal(results, expected);
		});
	}
}


export { harness };

