import { DeliverooApi } from "@unitn-asa/deliveroo-js-client";
import config from "../config.js";
import AgentsBeliefs from "./AgentsBeliefs.js";
import MapKnowledge from "./MapKnowledge.js";
import ParcelBeliefs from "./ParcelBeliefs.js";


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
client.onMap(function (width, height, tiles){
	MapKnowledge.initializeMapKnowledge(width,height,tiles);
});

client.onAgentsSensing(function (agents){
	AgentsBeliefs.updateAgentsBeliefs(agents);
});

client.onParcelsSensing(function (parcels){
	ParcelBeliefs.updateParcelsBeliefs(parcels);
});

client.onTile((tile)=> console.log(tile));

client.onNotTile((tile)=> console.log(tile));

//let directions = [ "up", "right", "down", "left" ];

async function agentLoop () {


}




agentLoop();