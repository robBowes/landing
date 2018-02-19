/**
* Create a new world type by calling the World constructor
* @param {Map} map
* @param {legend} legend
*
*
*/
function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

actionTypes.grow = function(critter) {
    critter.energy += 0.5;
    return true;
};

actionTypes.move = function(critter, location, action) {
    let dest = this.checkDestination(action, location);
    if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null) {
        return false;
    }
    critter.energy -= 1;
    this.grid.set(location, null);
    this.grid.set(dest, critter);
    return true;
};

actionTypes.eat = function(critter, location, action) {
    let dest = this.checkDestination(action, location);
    let atDest = dest != null && this.grid.get(dest);
    if (!atDest || atDest.energy == null) {
        return false;
    }
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};

actionTypes.reproduce = function(critter, location, action) {
    let baby = elementFromChar(this.legend,
        critter.originChar);
    let dest = this.checkDestination(action, location);
    if (dest == null || critter.energy <= 2 * baby.energy ||
        this.grid.get(dest) != null) {
        return false;
    }
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};

LifelikeWorld.prototype.letAct = function(critter, location) {
    let action = critter.act(new View(this, location));
    let handled = action &&
    action.type in actionTypes &&
    actionTypes[action.type].call(this, critter,
        location, action);
    if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0) {
            this.grid.set(location, null);
        }
    }
};

function Plant() {
    this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(view) {
    if (this.energy > 15) {
        let space = view.find(' ');
        if (space) {
            return {type: 'reproduce', direction: space};
        }
    }
    if (this.energy < 20) {
        return {type: 'grow'};
    }
};
