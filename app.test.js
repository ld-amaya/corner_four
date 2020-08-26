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

it('should return true if there is a horizontal winner in checkWinner()', () => {
	boards[5][0] = 'Blue';
	boards[5][1] = 'Blue';
	boards[5][2] = 'Blue';
	boards[5][3] = 'Blue';
	expect(checkWinner(5, 0)).toEqual(true);
});

it('should return true if there is a vertical winner in checkWinner()', () => {
	boards = [
		[null, null, null, "Red", null, null, null],
		[null, null, null, "Red", null, null, null],
		[null, null, null, "Red", null, null, null],
		[null, null, null, "Red", null, null, null],
		[null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null]
	]
	expect(checkWinner(5, 3)).toEqual(true);
});