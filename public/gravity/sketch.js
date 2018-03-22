let solarSystem = [];
const G = 6.674 * Math.pow(10, -11);


setup = () => {
    let canvas = createCanvas(1000, 800);
    canvas.parent('sketch-holder');
    solarSystem.push(new Planet({
        'mass': Math.pow(10, 12),
        'acc': createVector(0, 6),
        'radius': 15,
        'dir': createVector(0, 0),
        'loc': createVector(width / 2 + 50, height / 2),
    }));
    solarSystem.push(new Planet({
        'mass': 3 * Math.pow(10, 13),
        'acc': createVector(0, 0),
        'radius': 25,
        'dir': createVector(0, 0),
        'loc': createVector(width / 2, height / 2),
    }));
    // solarSystem.push(new Planet({
    //     'mass': Math.pow(10, 9),
    //     'acc': createVector(0, 0),
    //     'radius': 12,
    //     'dir': createVector(0, -3),
    //     'loc': createVector(350, height / 2),
    // }));
    // solarSystem.push(new Planet({
    //     'mass': Math.pow(10, 8),
    //     'acc': createVector(0, 0),
    //     'radius': 10,
    //     'dir': createVector(0, -5),
    //     'loc': createVector(330, height / 2),
    // }));
    // solarSystem.push(new Planet({
    //     'mass': Math.pow(10, 8),
    //     'acc': createVector(0, 0),
    //     'radius': 10,
    //     'dir': createVector(0, -5),
    //     'loc': createVector(320, height / 2),
    // }));
};

draw = () => {
    // translate(solarSystem[1].loc.x - width / 2, solarSystem[1].loc.y - height / 2)
    frameRate(30);
    background(0);
    showPlanets(solarSystem);
    solarSystem = updateSolarSystem(solarSystem);
    console.log(solarSystem[0].dir.mag());
};


let showPlanets = (solarSystem) => {
    stroke(255);
    solarSystem.forEach(planet => {
        ellipse(planet.loc.x, planet.loc.y, planet.radius);
    });
};

let updateSolarSystem = (solarSystem) => {
    return solarSystem.map((planet, index, arr) => {
        planet.loc = p5.Vector.add(planet.loc, planet.dir);
        planet.dir = p5.Vector.add(planet.dir, planet.acc);
        planet.acc = totalForce(arr, planet);
        return planet;
    });
};

let totalForce = (arr, body) => {
    return arr.filter(el => {
            return el.loc.x != body.loc.x;
        })
        .map(el => graviationalForce(el, body))
        .reduce((a, b) => p5.Vector.add(a, b)) //.div(arr.length);
};

let graviationalForce = (body1, body2) => {
    let f = (-G * body1.mass / Math.pow(p5.Vector.dist(body1.loc, body2.loc), 2));
    let x = (body2.loc.x - body1.loc.x) / p5.Vector.dist(body1.loc, body2.loc);
    let y = (body2.loc.y - body1.loc.y) / p5.Vector.dist(body1.loc, body2.loc);
    return createVector(f * x, f * y);
};
