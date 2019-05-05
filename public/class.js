class Grass {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.multiply = 0;
		this.energy = 5;
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]];
	}
	chooseCell(t) {
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == t) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
	mul() {
		this.multiply++;
		var newCell = random(this.chooseCell(0));
		console.log(newCell, this.multiply);
		if (this.multiply >= 3 && newCell) {
			var newGrass = new Grass(newCell[0], newCell[1]);
			grassArr.push(newGrass);
			matrix[newCell[1]][newCell[0]] = 1;
			this.multiply = 0;
		}
	}
}

class Eatgrass {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 20;
		this.multiply = 0;
		this.directions = [];
	}
	newDirections() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}
	chooseCell(t) {
		this.newDirections();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == t) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
	move() {
		var fundCords = this.chooseCell(0);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 2;
			matrix[this.y][this.x] = 0;
			this.x = x;
			this.y = y;
		}
	}
	eat() {
		var fundCords = this.chooseCell(1);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 2;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.energy++;

			for (var i in grassArr) {
				if (x == grassArr[i].x && y == grassArr[i].y) {
					grassArr.splice(i, 1);
				}
			}
			if (this.multiply == 10) {
				this.mul()
				this.multiply = 0;
			}
		}
		else {
			this.move();
			this.energy--;
			if (this.energy < 0) {
				this.die();
			}
		}
	}
	mul() {
		this.multiply++;
		var newCell = random(this.chooseCell(0));
		console.log(newCell, this.multiply);
		if (this.multiply >= 3 && newCell) {
			var newGras = new Eatgrass(newCell[0], newCell[1]);
			eatArr.push(newGras);
			matrix[newCell[1]][newCell[0]] = 2;
			this.multiply = 0;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in eatArr) {
			if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
				eatArr.splice(i, 1);
			}
		}
	}
}

class Eatred {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 10;
		this.multiply = 0;
		this.directions = [];
	}
	newDirections() {
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}
	chooseCell(t) {
		this.newDirections();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == t) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
	move() {
		var fundCords = this.chooseCell(0);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 3;
			matrix[this.y][this.x] = 0;
			this.x = x;
			this.y = y;
		}
	}
	eat() {
		var fundCords = this.chooseCell(2);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 3;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.energy++;

			for (var i in eatArr) {
				if (x == eatArr[i].x && y == eatArr[i].y) {
					eatArr.splice(i, 1);
				}
			}
		}
		if (this.multiply > 2) {
			this.mul();
			this.multiply = 0;
		}
		else {
			this.move();
			this.energy--;
			if (this.energy < 0) {
				this.die();
			}
		}
	}
	mul() {
		this.multiply++;
		var newCell = random(this.chooseCell(0));
		console.log(newCell, this.multiply);
		if (this.multiply >= 3 && newCell) {
			var newGras = new Eatred(newCell[0], newCell[1]);
			redArr.push(newGras);
			matrix[newCell[1]][newCell[0]] = 3;
			this.multiply = 0;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in redArr) {
			if (this.x == redArr[i].x && this.y == redArr[i].y) {
				redArr.splice(i, 1);
			}
		}
	}
}

class Creatgrass {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 20;
		this.multiply = 0;
		this.directions = [];
	}
	newDirections() {
		this.directions = [
			[this.x, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x, this.y + 1]
		];
	}
	chooseCell(t) {
		this.newDirections();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == t) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
	move() {
		var fundCords = this.chooseCell(0);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 4;
			matrix[this.y][this.x] = 0;
			this.x = x;
			this.y = y;
		}
	}
	eat() {
		var fundCords_1 = this.chooseCell(2);
		var fundCords_2 = this.chooseCell(3);
		var fundCords = fundCords_1.concat(fundCords_2);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			if (this.multiply >= 1) {
				matrix[y][x] = 1;
				grassArr.push(new Grass(x, y));

			}
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.energy += 2;

			for (var i in redArr) {
				if (x == redArr[i].x && y == redArr[i].y) {
					redArr.splice(i, 1);
				}
			}
			for (var i in eatArr) {
				if (x == eatArr[i].x && y == eatArr[i].y) {
					eatArr.splice(i, 1);
				}
			}
		}
		if (this.multiply > 3) {
			this.mul();
			this.multiply = 0;
		}
		else {
			this.move();
			this.energy--;
			if (this.energy < 0) {
				this.die();
			}
		}
	}
	mul() {
		this.multiply += 2;
		var newCell = random(this.chooseCell(0));
		console.log(newCell, this.multiply);
		if (this.multiply >= 2 && newCell) {
			var newGras = new Creatgrass(newCell[0], newCell[1]);
			creatArr.push(newGras);
			matrix[newCell[1]][newCell[0]] = 4;
			this.multiply = 0;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in creatArr) {
			if (this.x == creatArr[i].x && this.y == creatArr[i].y) {
				creatArr.splice(i, 1);
			}
		}
	}
}

class chess {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.multiply = 0;
		this.energy = 20;
		this.directions = [];
	}
	newDirections() {
		this.directions = [
			[this.x - 1, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 1],
			[this.x + 2, this.y + 1],
			[this.x - 1, this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x - 2, this.y + 1],
			[this.x - 2, this.y - 1],
		];
	}
	chooseCell(t) {
		this.newDirections();
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == t) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
	move() {
		var fundCords = this.chooseCell(0);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 5;
			matrix[this.y][this.x] = 0;
			this.x = x;
			this.y = y;
		}
	}
	eat() {
		var fundCords_0 = this.chooseCell(1);
		var fundCords_1 = this.chooseCell(2);
		var fundCords_2 = this.chooseCell(3);
		var fundCords_3 = this.chooseCell(4);
		var fundCords = fundCords_0.concat(fundCords_1, fundCords_2, fundCords_3);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 5;
			matrix[this.y][this.x] = 0;

			this.x = x;
			this.y = y;

			this.multiply++;
			this.energy++;

			for (var i in grassArr) {
				if (x == grassArr[i].x && y == grassArr[i].y) {
					grassArr.splice(i, 1);
				}
			}
			for (var i in eatArr) {
				if (x == eatArr[i].x && y == eatArr[i].y) {
					eatArr.splice(i, 1);
				}
			}
			for (var i in redArr) {
				if (x == redArr[i].x && y == redArr[i].y) {
					redArr.splice(i, 1);
				}
			}
			for (var i in creatArr) {
				if (x == creatArr[i].x && y == creatArr[i].y) {
					creatArr.splice(i, 1);
				}
			}
			if (this.multiply > 25) {
				this.mul()
				this.multiply = 0;
			}
		}
		else {
			this.move();
			this.energy--;
			if (this.energy < 0) {
				this.die();
			}
		}
	}
	mul() {
		this.multiply++;
		var newCell = random(this.chooseCell(0));
		console.log(newCell, this.multiply);
		if (this.multiply >= 3 && newCell) {
			var newGrass = new chess(newCell[0], newCell[1]);
			chessArr.push(newGrass);
			matrix[newCell[1]][newCell[0]] = 5;
			this.multiply = 0;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in chessArr) {
			if (this.x == chessArr[i].x && this.y == chessArr[i].y) {
				chessArr.splice(i, 1);
			}
		}
	}
}







