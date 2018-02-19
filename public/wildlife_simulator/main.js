$(function() {
    var world = new LifelikeWorld(plan, {"#": Wall,
        "~": Plant, "8": SmartPlantEater, "@": Predator});
    $("#gameworld").html(world.toString());
    var animate = (speed) => {

        return setInterval(function() {
            world.turn();
            $("#gameworld").html(world.toString());
        }, speed);
    };
    var stop = 0;
    var isRunning = false;
    var clear = (int) => {
        isRunning = false;
        clearInterval(stop);
    };
    $("#start").click(()=>{
        if (!isRunning) {
            isRunning = true;
            stop = animate(100);
        };
    });
    $("#stop").click(clear);
});


var plan = [
    "######################################################################",
    "# ~~~~~~~~ ## ~~~~~~~~~~~~~~~~~~~~~~          #    #~~~~~~~~~~~~~~~ ##",
    "#          ~~ ## ~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~   ~           #",
    "#           8          ##    ~~~~~~~~~~~~~~~~~~~~~~           ~~~    #",
    "#      @               ##      ~~~~~                               ~ #",
    "#  ~        #####           8        ##        ~~~~~       8         #",
    "##    88   #  ~ #     ##           ##                                #",
    "###      ##                                      ##      # ~~        #",
    "# ~~               ##                                         #      #",
    "#   ####             ##  888888888        ~~~~~       @              #",
    "#    ##                  ~~~~~~~~~~   ##         ~~                  #",
    "# 8  #  ~~~    88              ##               ~~~~             ### #",
    "# 8  #  ~~~    88              ##             ~~~~~~~~           ### #",
    "# 8  #  ~~~    88              ##           ~~~~~~~~~~~~         ### #",
    "# 8  #  ~~~    88              ##          ~~~~~~~~~~~~~~        ### #",
    "#                   ~                ##          ~~~                 #",
    "#    #        8      ##            @             ~ ~                 #",
    "#    #            ~~   ##               ~~~~~                ~~~~~   #",
    "#  ~ #~~~~~~~~~~~~~~ ## ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ #",
    "###################################################################### "];
    /**
    * @param x
    */
function Location(x, y) {
    this.x = x;
    this.y = y;
}
Location.prototype.plus = function(other) {
    return new Location(this.x + other.x, this.y + other.y);
};

var grid = ["top left", "top middle", "top right",
    "bottom left", "bottom middle", "bottom right"];

function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(location) {
    return location.x >= 0 && location.x < this.width &&
                   location.y >= 0 && location.y < this.height;
};
Grid.prototype.get = function(location) {
    return this.space[location.x + this.width * location.y];
};
Grid.prototype.set = function(location, value) {
    this.space[location.x + this.width * location.y] = value;
};
Grid.prototype.forEach = function(f, context) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var value = this.space[x + y * this.width];
            if (value != null) {
                f.call(context, value, new Location(x, y));
            }
        }
    }
};

var directions = {
    "n": new Location( 0, -1),
    "ne": new Location( 1, -1),
    "e": new Location( 1, 0),
    "se": new Location( 1, 1),
    "s": new Location( 0, 1),
    "sw": new Location(-1, 1),
    "w": new Location(-1, 0),
    "nw": new Location(-1, -1),
};

function elementFromChar(legend, character) {
    if (character == " ") {
        return null;
    }
    var element = new legend[character]();
    element.originChar = character;
    return element;
}

function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(line, y) {
        for (var x = 0; x < line.length; x++) {
            grid.set(new Location(x, y),
                elementFromChar(legend, line[x]));
        }
    });
}

function charFromElement(element) {
    if (element == null) {
        return " ";
    } else {
        return element.originChar;
    }
}

World.prototype.toString = function() {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Location(x, y));
            if (element) {
                output += "<span class =\"" + element.constructor.name.toLowerCase() + "\">";
                output += charFromElement(element);
                output += "</span>";
            } else output += charFromElement(element);
        }
        output += "<br>";
    }
    return output;
};

function Wall() {}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
    this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != " ") {
        this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
};


World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter, location) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, location);
        }
    }, this);
};

World.prototype.letAct = function(critter, location) {
    var action = critter.act(new View(this, location));
    if (action && action.type == "move") {
        var dest = this.checkDestination(action, location);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(location, null);
            this.grid.set(dest, critter);
        }
    }
};

World.prototype.checkDestination = function(action, location) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = location.plus(directions[action.direction]);
        if (this.grid.isInside(dest)) {
            return dest;
        }
    }
};

function View(world, location) {
    this.world = world;
    this.location = location;
}
View.prototype.look = function(dir) {
    var target = this.location.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
    } else {
        return "#";
    }
};
View.prototype.findAll = function(character) {
    var found = [];
    for (var dir in directions) {
        if (this.look(dir) == character) {
            found.push(dir);
        }
    }
    return found;
};
View.prototype.find = function(character) {
    var found = this.findAll(character);
    if (found.length == 0) return null;
    return randomElement(found);
};
