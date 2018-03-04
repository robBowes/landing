
let tiles = [];
let player;

let rolls = [];
let index = 0;
let averageRolls = 0;

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('sketch-holder');
    rolls[index] = 0;
    let resolution = 40;
    let cols = width /resolution;
    let rows = height / resolution;
    let x = 0;
    let y = (rows-1)*resolution;
    let dir = 1;
    for (let i = 0; i < cols*rows; i++) {
        let tile = new Tile(x, y, resolution, i, i+1);
        tiles.push(tile);
        x = x + resolution * dir;
        if (x >= width || x <= -resolution) {
            dir *=-1;
            x+=resolution*dir;
            y-=resolution;
        }
    }
    for (let i = 0; i < 10; i++) {
        tiles[Math.ceil(Math.random()*90)].snakeOrLadder = Math.ceil((Math.random()*20)-10);
    }


    player = new Player();
}



function draw() {
    frameRate(5);
    background(51);
    for (let tile of tiles) {
        tile.show(tiles);
    }
    for (let tile of tiles) {
        tile.drawSnakesLadders(tiles);
    }
    player.roll(tiles);
    rolls[index]++;
    $('#rollsThisGame').text(rolls[index]);
    let gameOver = false;
    if (player.spot>= tiles.length-1) {
        player.spot = tiles.length-1;
        console.log('game over');
        gameOver = true;
    }

    if (gameOver) {
        let sum = 0;
        sum = rolls.reduce((a, b)=>(a+b));
        let avg = sum / (rolls.length);
        $('#avgRolls').text(avg);
        player.reset();
        index++;
        rolls[index] = 0;
    }
    player.show(tiles);

}
