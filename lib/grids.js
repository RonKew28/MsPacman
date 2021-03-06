
class Grids {
	constructor() {
		this.LEVEL_ONE_GRID =
		[
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
		[5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6],
		[1, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, -1],
		[1, 0, 7, 9, 9, 8, 0, 7, 9, 9, 9, 8, 0, 10, 10, 0, 7, 9, 9, 9, 8, 0, 7, 9, 9, 8, 0, -1],
		[1, 0, 10, 98, 98, 10, 0, 10, 98, 98, 98, 10, 0, 10, 10, 0, 10, 98, 98, 98, 10, 0, 10, 98, 98, 10, 0, -1],
		[1, 0, -7, 9, 9, -8, 0, -7, 9, 9, 9, -8, 0, -7, -8, 0, -7, 9, 9, 9, -8, 0, -7, 9, 9, -8, 0, -1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
		[1, 0, 7, 9, 9, 8, 0, 7, 8, 0, 7, 9, 9, 9, 9, 9, 9, 8, 0, 7, 8, 0, 7, 9, 9, 8, 0, -1],
		[1, 0, -7, 9, 9, -8, 0, 10, 10, 0, -7, 9, 9, 8, 7, 9, 9, -8, 0, 10, 10, 0, -7, 9, 9, -8, 0, -1],
		[1, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, -1],
		[-5, -2, -2, -2, -2, 8, 0, 10, -7, 9, 9, 8, 97, 10, 10, 97, 7, 9, 9, -8, 10, 0, 7, -2, -2, -2, -2, -6],
		[98, 98, 98, 98, 98, 1, 0, 10, 7, 9, 9, -8, 97, -7, -8, 97, -7, 9, 9, 8, 10, 0, -1, 98, 98, 98, 98, 98],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, 97, 97, 97, "B", "C", 97, 97, 97, 97, 10, 10, 0, -1, 98, 98, 98, 98, 98],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, 7, -2, -2, "C", "C", -2, -2, 8, 97, 10, 10, 0, -1, 98, 98, 98, 98, 98],
		[2, 2, 2, 2, 2, -8, 0, -7, -8, 97, -1, 99, 99, "C", "C", 99, 99, 1, 97, -7, -8, 0, -7, 2, 2, 2, 2, 2],
		[97, 97, 97, 97, 97, 97, 0, 97, 97, 97, -1, "I", 97, "E", "C", "N", 97, 1, 97, 97, 97, 0, 97, 97, 97, 97, 97, 97],
		[-2, -2, -2, -2, -2, 8, 0, 7, 8, 97, -1, 99, 99, 99, 99, 99, 99, 1, 97, 7, 8, 0, 7, -2, -2, -2, -2, -2],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, -7, 2, 2, 2, 2, 2, 2, -8, 97, 10, 10, 0, -1, 98, 98, 98, 98, 98],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, 97, 97, 97, "P", 97, 97, 97, 97, 97, 10, 10, 0, -1, 98, 98, 98, 98, 98],
		[98, 98, 98, 98, 98, 1, 0, 10, 10, 97, 7, 9, 9, 9, 9, 9, 9, 8, 97, 10, 10, 0, -1,98, 98, 98, 98, 98],
		[5, 2, 2, 2, 2, -8, 0, -7, -8, 97, -7, 9, 9, 8, 7, 9, 9, -8, 97, -7, -8, 0, -7, 2, 2, 2, 2, 6],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
		[1, 0, 7, 9, 9, 8, 0, 7, 9, 9, 9, 8, 0, 10, 10, 0, 7, 9, 9, 9, 8, 0, 7, 9, 9, 8, 0, -1],
		[1, 0, -7, 9, 8, 10, 0, -7, 9, 9, 9, -8, 0, -7, -8, 0, -7, 9, 9, 9, -8, 0, 10, 7, 9, -8, 0, -1],
		[1, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, -1],
		[11, 9, 8, 0, 10, 10, 0, 7, 8, 0, 7, 9, 9, 9, 9, 9, 9, 8, 0, 7, 8, 0, 10, 10, 0, 7, 9, 13],
		[12, 9, -8, 0, -7, -8, 0, 10, 10, 0, -7, 9, 9, 8, 7, 9, 9, -8, 0, 10, 10, 0, -7, -8, 0, -7, 9, 14],
		[1, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, -1],
		[1, 0, 7, 9, 9, 9, 9, -8, -7, 9, 9, 8, 0, 10, 10, 0, 7, 9, 9, -8, -7, 9, 9, 9, 9, 8, 0, -1],
		[1, 0, -7, 9, 9, 9, 9, 9, 9, 9, 9, -8, 0, -7, -8, 0, -7, 9, 9, 9, 9, 9, 9, 9, 9, -8, 0, -1],
		[1, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, -1],
		[-5, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -6],
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
		[97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97],
	];
}
}

module.exports = Grids;
