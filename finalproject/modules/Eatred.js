var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Eatred extends LiveForm {
	constructor(x, y) {
		super(x,y);
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
		this.getNewCoordinates();
        return super.chooseCell(t);
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