/**
 * keeps track of the tiles information
 * - o : default, normal tile
 * - d : destination tile
 * - x : wall tile
 * @type {string[][]}
 */
let map_data= null;
let height_data = 0;
let width_data = 0;

/**
 * retrieve information on the map as a matrix of strings.
 * @returns {string[][]}
 */
function getMapKnowledge() {
    return map_data;
}


/**
 * initialize map knowledge if it wasn't already initialized.
 * @param {number} width
 * @param {number} height
 * @param {{x:number, y:number, delivery:boolean}[]} tiles
 */
function initializeMapKnowledge(width, height, tiles) {
    if(map_data !== null){
        console.log("Map already initialized.");
        return;
    }

    width_data = width;
    height_data = height;

    // so, fill() it's terrible to create a multidimensional array
    // https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element
    // but it's apparently necessary if you want to use map to initialize a matrix
    // which is seemingly the only good way counting js style rules (jshint, jslint)

    // initialize the matrix using width and height
    map_data = new Array(height).fill([]).map(() => new Array(width).fill("").map(() => "x"));

    tiles.forEach(function (tile) {
        map_data[tile.y][tile.x] = (tile.delivery ? "d" : "o");
    });

    map_data.forEach((row) => console.log(row.join("  ")));
}


/**
 * check if a tile is walkable by the agent.
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
function isTile(x,y){
    if(x < 0 || x > width_data || y < 0 || y > height_data){
        console.log("Out of map boundaries.");
        return false;
    }

    return map_data[y][x] === "o" || map_data[y][x] === "d";
}


/**
 * check if a tile is a delivery tile.
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
function isDelivery(x,y){
    if(x < 0 || x > width_data || y < 0 || y > height_data){
        console.log("Out of map boundaries.");
        return false;
    }

    return map_data[y][x] === "d";
}


/**
 * check if a tile is a wall.
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
function isWall(x,y){
    if(x < 0 || x > width_data || y < 0 || y > height_data){
        console.log("Out of map boundaries.");
        return false;
    }

    return map_data[y][x] === "x";
}


export default Object.freeze({
    getMapKnowledge,
    initializeMapKnowledge,
    isTile,
    isDelivery,
    isWall
});