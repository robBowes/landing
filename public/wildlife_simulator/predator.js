/**
*   The predator will eat others
*
*
*/
function Predator() {
    this.energy = 30;
    this.direction = "n";
};
Predator.prototype.act = function(view) {
    var space = view.find(" ");
    var prey = view.find("8");
    if (this.energy > 90 ) {
        return {type: "reproduce", direction: space};
    }
    if (prey) {
        return {type: "eat", direction: prey};
    }
    if (view.look(this.direction) == " ") {
        return {type: "move", direction: this.direction};
    }
    if (space) {
        this.direction = space;
        return {type: "move", direction: space};
    }
};
