/**
 * Unknown - Description
 *
 * @param {type} name   Description
 * @param {type} method Description
 *
 * @return {type} Description
 */
invoker = (name, method) => (target, ...args) => {
    if (!existy(target)) console.log('fail');
    let targetMethod = target[name];
    return doWhen((existy(targetMethod) && method == targetMethod),
        () => targetMethod.call(target, ...args));
};
/**
 * Always returns a function that always returns the initial parameter
 *
 * @param {*} value Any value to always return
 *
 * @return {*} Same as value
 */
always = (value) => () => value;
/**
 * iterateUntil creates an array by iterating through a funtion until a check
 *  has been met
 *
 * @param {function} fun   Description
 * @param {function} check Description
 * @param {*} init  Initial value
 *
 * @return {array} Filled array
 */
iterateUntil = (fun, check, init) => {
    let ret = [];
    let result = fun(init);
    while (check(result)) {
        ret.push(result);
        result = fun(result);
    }
    return ret;
};

/**
 * Returns an array filled with the result of foo
 *
 * @param {int} times Length of array
 * @param {function} foo Function
 *
 * @return {array} Description
 */
repeatedly = (times, foo) => Array(times).fill().map(foo);
/**
 * Repeat returns an array filled with value
 *
 * @param {int} times Number of times to repeat
 * @param {*} value Object or primitive to fill the array with
 *
 * @return {array} Description
 */
repeat = (times, value) => Array(times).fill().map(e => value);
/**
 * Best - A tighter version of finder. Finds the best value in a collection
 * given a function
 *
 * @param {function} fun  Unwraps and compares elements
 * @param {array} coll Collection to compare
 *
 * @return {*} Best element from collection
 */
best = (fun, coll) => coll.reduce((x, y) => fun(x, y) ? x : y);

/**
 * finder - takes two functions and determines the best value in a collection
 *
 * @param {function} valueFun Makes a comparable value from an object
 * @param {function} bestFun  Compares two values
 * @param {array} coll     Array of objects
 *
 * @return {*} Best value from the collection
 */
finder = (valueFun, bestFun, coll) => coll.reduce((best, current) => {
    let bestValue = valueFun(best);
    let currentValue = valueFun(current);
    return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
});


/**
 * plucker - Takes a key into an array or object and returns the value at the
 * key
 *
 * @param {integer|string} field key
 * @param {array|object} obj Any associative structure
 *
 * @return {type} Value at the given field
 */
plucker = (field) => (obj) => obj && obj[field];

let people = [{
    name: 'Fred',
    age: 65,
}, {
    name: 'Lucy',
    age: 36,
}];

/**
 * Restrict - Filters a table using a predicate
 *
 * @param {array} table Table like array
 * @param {function} pred  Predicate
 *
 * @return {array} Table like array
 */
restrict = (table, pred) => table.reduce((newTable, obj) => {
    if (truthy(pred(obj))) return newTable;
    else return _.without(newTable, obj);
}, table);

let library = [{
        title: 'SICP',
        isbn: '0262010771',
        ed: 1,
    },
    {
        title: 'SICP',
        isbn: '0262510871',
        ed: 2,
    },
    {
        title: 'Joy of Clojure',
        isbn: '1935182641',
        ed: 1,
    },
];

/**
 * Rename all objects in a table like array
 *
 * @param {array} table    Collection of simmilar objects
 * @param {obj} newNames Key values of new names
 *
 * @return {array} Renamed collection
 */
as = (table, newNames) => table.map(obj => rename(obj, newNames));

/**
 * Renames properties of an object
 *
 * @param {obj} obj      Original Object
 * @param {obj} newNames Key values of new names
 *
 * @return {obj} Object with new names
 */
rename = (obj, newNames) => Object.keys(newNames).reduce((o, nu, i) => {
    if (obj.hasOwnProperty(nu)) {
        o[newNames[nu]] = obj[nu];
        return o;
    } else return o;
}, _.omit(...construct(obj, _.keys(newNames))));

/**
 * @param {array} table A table like array of objects
 * @param {array} keys Keys to filter from the objects
 * @return {array} An array containing only the keys and their values
 */
project = (table, keys) => table.map(obj => _.pick(...construct(obj, keys)));


/**
 * @param {string} inter String to insert between elements
 * @param {array} coll  Collection in which to insert strings
 *
 * @return {array} Collection with interposed strings
 */
interpose = (inter, coll) => {
    return butLast(mapcat(e => construct(e, [inter]), coll));
};


/**
 * butLast - Returns all but the last element of the collection
 *
 * @param {type} coll Collection to remove the last element
 *
 * @return {type} New collection
 */
butLast = (coll) => Array.from(coll).slice(0, -1);


/**
 * Runs a function on each element of the collection and concats the results
 *
 * @param {type} fun  Description
 * @param {type} coll Description
 *
 * @return {type} Description
 */
mapcat = (fun, coll) => cat(...coll.map(fun));


/**
 * Create an array from the head and tail, tail is an array
 *
 * @param {obj} head Element to place at the begining of the collection
 * @param {array} tail End of the collection
 *
 * @return {array} New collection
 */
construct = (head, tail) => cat([head], Array.from(tail));

// Concatenate the argumetn arrays
cat = (...arr) => {
    if (existy([...arr][0])) return [].concat(...arr);
    else return [];
};

// Return the opposite of the predicate
complement = (pred) => {
    return (...n) => {
        return !pred(...n);
    };
};


/**
 * Excecute the name if it exists on the target
 *
 * @param {object} target Description
 * @param {string} name   Description
 *
 * @return {*} Result of the operation or undefined
 */
executeIfHasField = (target, name) => {
    return doWhen(existy(target[name]), () => {
        let result = _.result(target, name);
        console.log(`The result is ${result}`);
        return result;
    });
};


/**
 * Return the truthyness of the parameter
 *
 * @param {*} x Parameter
 *
 * @return {bool} Truthiness of parameter
 */
truthy = (x) => (x != false) && existy(x);


/**
 * Return if the parameter exists
 *
 * @param {*} x Anything
 *
 * @return {bool} The existance of the parameter
 */
existy = (x) => x != null;

/**
 * Do an action if the condition is true
 *
 * @param {*} cond
 * @param {function} action
 *
 * @return {*}
 */
doWhen = (cond, action) => {
    if (truthy(cond)) return action();
    else return undefined;
};
