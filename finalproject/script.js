function setup() {
    var socket = io();
    var side = 30;
    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCount = document.getElementById("grassCount");
    let grassEaterCount = document.getElementById('grassEaterCount');
    let RedEaterCount = document.getElementById('RedEaterCount');
    let CreatGrassCount = document.getElementById('CreatGrassCount');
    let ChessCount = document.getElementById('ChessCount');
    let weather = document.getElementById('weather');

    socket.on("data", drawCreatures);

    function drawCreatures(data) {

        matrix = data.matrix;
        grassCount.innerText = data.GrassCount;
        grassEaterCount.innerText = data.grassEaterCount;
        RedEaterCount.innerText = data.RedEaterCount;
        CreatGrassCount.innerText = data.CreatGrassCount;
        ChessCount.innerText = data.ChessCount;

        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac');

        if (data.GrassCount < 700) {
            weather.innerText = "the summer";
        }
        else if (data.GrassCount > 700 && data.GrassCount < 2000) {
            weather.innerText = "winter is coming!!!";
        }
        else if (data.GrassCount > 2000) {
            weather.innerText = "winter was end.  summer is coming!!!";
        }

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    if (data.GrassCount > 700 && data.GrassCount < 2000) {
                        fill("white");
                    }
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 4) {
                    fill('blue');
                    if (data.GrassCount > 700 && data.GrassCount < 2000) {
                        fill("#00B3FF");
                    }
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 5) {
                    fill('yellow');
                    if (data.GrassCount > 700 && data.GrassCount < 2000) {
                        let r = random(255);
                        let g = random(255);
                        let b = random(255);
                        fill(r, g, b);
                    }
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}