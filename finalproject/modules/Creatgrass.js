var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Creatgrass extends LiveForm {
	constructor(x, y) {
		super(x,y);
		this.energy = 20;
		this.multiply = 0;
		this.directions = [];
	}
	getNewDirections() {
		this.directions = [
			[this.x, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x, this.y + 1]
		];
	}
	chooseCell(t) {
        this.getNewDirections();
        return super.chooseCell(t);
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
				matrix[y][x] = 3;
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
			for (var i in grassEaterArr) {
				if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
					grassEaterArr.splice(i, 1);
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
