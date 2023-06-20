import { DeliverooApi, timer } from "@unitn-asa/deliveroo-js-client";
import config from "../config.js";


const client = new DeliverooApi( config.host, config.token )

client.on("connect", () => {
	console.log( "socket connect", client.socket.id );
});

client.on("disconnect", () => {
	console.log( "socket disconnect", client.socket.id );
});

//
// Beliefs
//

// keeps track of the tiles information
// 0 : default, normal tile
// 1 : destination tile
//-1 : wall tile
var map = new Array(Array(10))


// at the start read map values and store them as belief
client.onMap((width, height, tiles) => {
	console.log(tiles)

	// so, fill() it's terrible to create a multidimensional array
	// https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element

	map = new Array(height);
	for(var i = 0; i< height; i++){
		map[i] = new Array(width);
		for(var j = 0; j<width; j++){
			map[i][j] = 'x';
		}
	}

	for(var i = 0; i < tiles.length; i++){

		if(tiles[i].delivery){
			map[tiles[i].y][tiles[i].x] = 'd';
		} else {
			map[tiles[i].y][tiles[i].x] = 'o';
		}
	}

	console.log(" ")
	var out = "";
	for(let line = 0; line < map.length; line ++){
		console.log(map[line].join("  "));
	}
});



var other_agents = []
client.onAgentsSensing(agents => {

})


var directions = [ 'up', 'right', 'down', 'left' ];

async function agentLoop () {

	var direction = 0;


}




agentLoop();