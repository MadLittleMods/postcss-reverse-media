
import { test } from './utility/helpers';




// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Pseudo-BNF_(for_those_of_you_that_like_that_kind_of_thing)



test(
	'Transform `max-width`',
	'@media reverse (max-width: 150px) { /*...*/ }',
	'@media (min-width: 150.001px) { /*...*/ }'
);

test(
	'Transform `min-width`',
	'@media reverse (min-width: 150px) { /*...*/ }',
	'@media (max-width: 149.999px) { /*...*/ }'
);

test(
	'Transform `min-width` with logic at end',
	'@media (min-width: 50px) and reverse (min-width: 150px) { /*...*/ }',
	'@media (min-width: 50px) and (max-width: 149.999px) { /*...*/ }'
);

test(
	'Transform `max-width` with logic at end',
	'@media (max-width: 300px) and reverse (max-width: 150px) { /*...*/ }',
	'@media (max-width: 300px) and (min-width: 150.001px) { /*...*/ }'
);

test(
	'Transform `min-width` with logic at start',
	'@media reverse (min-width: 150px) and (min-width: 50px) { /*...*/ }',
	'@media (max-width: 149.999px) and (min-width: 50px) { /*...*/ }'
);



// Custom keyword

test(
	'Custom keyword `not` and Transform `max-width`',
	'@media not (max-width: 150px) { /*...*/ }',
	'@media (min-width: 150.001px) { /*...*/ }',
	{
		keyword: 'not'
	}
);

test(
	'Custom keyword `not` and Transform `min-width`',
	'@media not (min-width: 150px) { /*...*/ }',
	'@media (max-width: 149.999px) { /*...*/ }',
	{
		keyword: 'not'
	}
);

test(
	'Custom keyword `not` and does not mangle `not all`',
	'@media not all { /*...*/ }',
	'@media not all { /*...*/ }',
	{
		keyword: 'not'
	}
);


// Does not mangle
// -----------------------------------------
test(
	'Does not mangle `max-width`',
	'@media (max-width: 150px) { /*...*/ }',
	'@media (max-width: 150px) { /*...*/ }'
);

test(
	'Does not mangle `min-width`',
	'@media (min-width: 150px) { /*...*/ }',
	'@media (min-width: 150px) { /*...*/ }'
);

test(
	'Does not mangle `min-width`',
	'@media grid { /*...*/ }',
	'@media grid { /*...*/ }'
);

test(
	'Does not mangle complex mq',
	'@media handheld and (grid) and (max-width: 15em) { /*...*/ }',
	'@media handheld and (grid) and (max-width: 15em) { /*...*/ }'
);

test(
	'Does not mangle `not all` param',
	'@media not all and (max-width: 15em) { /*...*/ }',
	'@media not all and (max-width: 15em) { /*...*/ }'
);


