class Player {
    constructor() {
        this.reset();
    }

    roll(tiles) {
        let r = Math.ceil(Math.random()*3);
        this.spot+=r;
        let tile = tiles[this.spot];
        if (tile) this.spot += tile.snakeOrLadder;

    }
    show(tiles) {
        let current = tiles[this.spot]
        fill(255);
        let center = current.getCenter();
        noStroke();
        ellipse(center[0], center[1], 32);
    }
    reset() {
        this.spot = 0;
    }
}
