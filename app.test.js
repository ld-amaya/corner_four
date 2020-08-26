it('should return player1 if red is in play in getPlayer()', () => {
	const player = document.querySelector('#player');
	player.textContent = 'Red';
	expect(getPlayer()).toEqual('player1');
	player.textContent = 'Blue';
	expect(getPlayer()).toEqual('player2');
});

it('should return next player color in nextPlayer()', () => {
	const player = document.querySelector('#player');
	player.textContent = 'Red';
	expect(nextPlayer()).toEqual('Blue');
	player.textContent = 'Blue';
	expect(nextPlayer()).toEqual('Red');
});

// it('should return horizontal win combo in checkHorizontalCombo()', () => {
// 	boards = [
// 		[null, null, null, 'Blue', 'Blue', 'Blue', 'Blue'],
// 		[null, null, null, null, null, null, null],
// 		[null, null, 'Red', 'Red', 'Red', 'Red', null],
// 		[null, 'Red', 'Red', 'Red', 'Red', null, null],
// 		['Blue', 'Blue', 'Blue', 'Blue', null, null, null],
// 		[null, null, null, null, null, null, null]
// 	];
// 	expect(checkHorizontalCombo('Blue', 0)).toEqual(true);
// 	expect(checkHorizontalCombo('Red', 2)).toEqual(true);
// 	expect(checkHorizontalCombo('Red', 3)).toEqual(true);
// 	expect(checkHorizontalCombo('Blue', 4)).toEqual(true);
// });

// it('should return vertical win combo in checkVerticalCombo()', () => {
// 	boards = [
// 		['Blue', null, null, null, 'Blue', null, null],
// 		['Blue', 'Red', null, 'Blue', 'Blue', null, null],
// 		['Blue', 'Red', 'Red', 'Blue', 'Blue', null, null],
// 		['Blue', 'Red', 'Red', 'Blue', 'Blue', null, null],
// 		[null, 'Red', 'Red', 'Blue', null, null, null],
// 		[null, null, 'Red', null, null, null, null]
// 	];
// 	expect(checkVerticalCombo('Blue', 0)).toEqual(true);
// 	expect(checkVerticalCombo('Red', 1)).toEqual(true);
// 	expect(checkVerticalCombo('Red', 2)).toEqual(true);
// 	expect(checkVerticalCombo('Blue', 3)).toEqual(true);
// 	expect(checkVerticalCombo('Blue', 4)).toEqual(true);
// });