
var bardz = 30;
var layn = 60;
var side = 20;
var matrix = [];
var grassArr = [];
var eatArr = [];
var redArr = [];
var creatArr = [];
var chessArr = [];

for (var i = 0; i < bardz; i++) {
    matrix.push([]);
    for (var l = 0; l < layn; l++) {
        matrix[i].push(0);
    }
}
function setup() {
    let arr = [810, 420, 200, 180, 10];

    for (var n = 0; n < arr[0]; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
    }
    for (n = 0; n < arr[1]; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (n = 0; n < arr[2]; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }
    for (n = 0; n < arr[3]; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }
    for (n = 0; n < arr[4]; n++) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }
    frameRate(15);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gg = new Eatgrass(x, y);
                eatArr.push(gg);
            }
            else if (matrix[y][x] == 3) {
                var gf = new Eatred(x, y);
                redArr.push(gf);
            }
            else if (matrix[y][x] == 4) {
                var rf = new Creatgrass(x, y);
                creatArr.push(rf);
            }
            else if (matrix[y][x] == 5) {
                var rr = new chess(x, y);
                chessArr.push(rr);
            }
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("aqua");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (var i in redArr) {
        redArr[i].eat();
    }
    for (var i in creatArr) {
        creatArr[i].eat();
    }
    for (var i in chessArr) {
        chessArr[i].eat();
    }
}
