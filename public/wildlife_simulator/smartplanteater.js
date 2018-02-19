function SmartPlantEater() {
    this.energy = 20;
    this.direction = "n";
}
SmartPlantEater.prototype.act = function(view) {
    var space = view.find(" ");
    if (this.energy > 50 && space) {
        return {type: "reproduce", direction: space};
    }
    if (view.find("~")!=null && this.energy > 55) {
        var coin = Math.random();
        if (coin > 0.5) {
            if (space) {
                this.direction = space;
                return {type: "move", direction: space};
            }
        }
        return;
    }
    var plant = view.find("~");
    if (plant && this.energy < 60) {
        return {type: "eat", direction: plant};
    }
    if (view.look(this.direction) == " ") {
        return {type: "move", direction: this.direction};
    }
    if (space) {
        this.direction = space;
        return {type: "move", direction: space};
    }
};
