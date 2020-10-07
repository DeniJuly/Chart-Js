window.randomInt = function (min = 20, max = 100) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
let dataInit = [
	[
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
	],
	[
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
		[randomInt(), randomInt(), randomInt(), randomInt(), randomInt()],
	],
];
