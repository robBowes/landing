/**
* A tile on the snakes and ladders game board
*/
class Tile {
    /**
    * @param x integer the location on the x axis
    */
    constructor(x, y, wh, index, next) {
        this.x = x;
        this.y = y;
        this.wh = wh;
        this.index = index;
        this.next = next;
        this.snakeOrLadder = 0;
        if (index % 2 == 0) this.color = 200;
        else this.color = 100;
    }

    show(tiles) {
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.wh, this.wh);

        // fill(0);
        // textSize(32);
        //text(this.index + '->' + this.next, this.x, this.y + this.wh)
    }

    getCenter() {
        let cx = this.x + this.wh/2;
        let cy = this.y + this.wh/2;
        return [cx, cy];
    }
    drawSnakesLadders() {
        if (this.snakeOrLadder != 0) {
            let thisCenter = this.getCenter();
            let nextCenter = tiles[this.index+this.snakeOrLadder].getCenter();
            strokeWeight(4);
            if (this.snakeOrLadder<0) stroke(255, 0, 0, 200);
            else stroke(0, 255, 0, 200);
            line(thisCenter[0], thisCenter[1], nextCenter[0], nextCenter[1])
        }
    }
}
