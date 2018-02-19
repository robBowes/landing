function PlantEater() {
    this.energy = 20;
}
PlantEater.prototype.act = function(view) {
    console.log(this);
    var space = view.find(" ");
    if (this.energy > 60 && space) {
        return {type: "reproduce", direction: space};
    }
    var plant = view.find("~");
    if (plant) {
        return {type: "eat", direction: plant};
    }
    if (space) {
        return {type: "move", direction: space};
    }
};
