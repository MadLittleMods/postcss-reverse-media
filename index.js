import objectAssign from 'object-assign';

import postcss from 'postcss';
import valueParser from 'postcss-value-parser';






let paramRe = (/((?:^|and|,)\s*)((?:(\w+)\s*(?=(?:\(|\s+)[\-_a-zA-Z0-9]+))?\(?\s*([\-_a-zA-Z0-9]+)(?:\s*:\s*([\-_a-zA-Z0-9]+))?\s*\)?)/i);


let parseParam = function(paramstring) {
	let matches = paramstring.match(paramRe);

	if(!matches && matches.length === 4) {
		return false;
	}

	// paramObject
	return {
		qualifier: matches[3],
		feature: matches[4],
		value: matches[5]
	};
};

let stringifyParam = function(paramObject) {
	let qualifierPiece = paramObject.qualifier ? `${paramObject.qualifier} ` : '';
	let expressionPiece = paramObject.value ? `(${paramObject.feature}: ${paramObject.value})` : `${paramObject.feature}`;
	return `${qualifierPiece}${expressionPiece}`;
};



// Increment/decrement value
let crementValue = function(value, sign, opts) {
	let options = objectAssign({}, {
		increment: 0.001
	}, opts);

	let valueResults = valueParser.unit(value);
	let newValue = objectAssign({}, valueResults, {
		number: Number.parseFloat(valueResults.number) + (options.increment * Math.sign(sign))
	});

	return `${newValue.number}${newValue.unit}`;
};

let reverseParam = function(paramObject, opts) {
	let isMax = (/^max/i).test(paramObject.feature);
	let sign = Math.sign(isMax ? 1 : -1);

	try {
		return objectAssign({}, paramObject, {
			// We reversed it, so remove the qualifier
			qualifier: '',
			// Swap the feature prefix
			feature: paramObject.feature.replace(/^max|min/i, () => isMax ? 'min' : 'max'),
			// Increment/decrement value slightly to avoid overalp
			value: crementValue(paramObject.value, sign, opts)
		});
	}
	catch(err) {
		// swallow
	}

	return paramObject;
};

let applyReverseKeyword = function(params, opts) {
	return params.replace(new RegExp(paramRe.source, `${paramRe.flags || ''}g`), (match, operator, param) => {
		let newParam = param;

		let paramObject = parseParam(param);
		if(paramObject.qualifier === opts.keyword) {
			newParam = stringifyParam(reverseParam(paramObject, opts));
		}

		return `${operator}${newParam}`;
	});
};


const defaults = {
	keyword: 'reverse',
	increment: 0.001
};
module.exports = postcss.plugin('postcss-reverse-media', (options) => {
	let opts = objectAssign({}, defaults, options);

	return function (css/*, result*/) {

		css.walkAtRules((rule) => {
			rule.params = applyReverseKeyword(rule.params, opts);
		});
	};
});
