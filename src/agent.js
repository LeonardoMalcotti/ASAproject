import { DeliverooApi } from "@unitn-asa/deliveroo-js-client";
import config from "../config.js";
import AgentsBeliefs from "./BeliefsModules/AgentsBeliefs.js";
import MapKnowledge from "./BeliefsModules/MapKnowledge.js";
import ParcelBeliefs from "./BeliefsModules/ParcelBeliefs.js";


const client = new DeliverooApi( config.host, config.token );

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
	console.log(AgentsBeliefs.getAgentBeliefsByName("aaa").direction);
});

client.onParcelsSensing(function (parcels){
	ParcelBeliefs.updateParcelsBeliefs(parcels);
	//console.log(ParcelBeliefs.getAllParcelsBeliefs());
});

client.onTile((x,y)=> console.log("tile " + x + " " + y));

client.onNotTile((x,y)=> console.log("not tile " + x + " " + y));

//let directions = [ "up", "right", "down", "left" ];

async function agentLoop () {


}




agentLoop();