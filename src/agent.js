import { DeliverooApi, timer } from "@unitn-asa/deliveroo-js-client";
import config from "../config.js";
import AgentsBeliefs from "./AgentsBeliefs.js";
import MapKnowledge from "./MapKnowledge.js";


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

// at the start read map values and store them as belief
client.onMap((width, height, tiles) => {
	MapKnowledge.initializeMapKnowledge(width,height,tiles);
});

client.onAgentsSensing(agents => {
	AgentsBeliefs.updateAgentsBeliefs(agents);
})


var directions = [ 'up', 'right', 'down', 'left' ];

async function agentLoop () {

	var direction = 0;


}




agentLoop();