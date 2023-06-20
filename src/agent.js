import { DeliverooApi, timer } from "@unitn-asa/deliveroo-js-client";
import config from "../config.js";
import {containsAgent} from "./utils.js";
import AgentsBeliefs from "./AgentsBeliefs.js";


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
// o : default, normal tile
// d : destination tile
// x : wall tile
let map = [[]];

// at the start read map values and store them as belief
client.onMap((width, height, tiles) => {
	let i;
	console.log(tiles)

	// so, fill() it's terrible to create a multidimensional array
	// https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element

	// initialize the matrix using width and height
	map = new Array(height);
	for(i = 0; i< height; i++){
		map[i] = new Array(width);
		for(var j = 0; j<width; j++){
			map[i][j] = 'x';
		}
	}

	for(i = 0; i < tiles.length; i++){
		if(tiles[i].delivery){
			map[tiles[i].y][tiles[i].x] = 'd';
		} else {
			map[tiles[i].y][tiles[i].x] = 'o';
		}
	}
});


let other_agents = [{}];
client.onAgentsSensing(agents => {
	AgentsBeliefs.updateAgentsBeliefs(agents);
})


var directions = [ 'up', 'right', 'down', 'left' ];

async function agentLoop () {

	var direction = 0;


}




agentLoop();