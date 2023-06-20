import { DeliverooApi, timer } from "@unitn-asa/deliveroo-js-client";
import config from "../config.js";


const client = new DeliverooApi( config.host, config.token )

client.on("connect", () => {
    console.log( "socket connect", client.socket.id ); // x8WIv7-mJelg7on_ALbxc
});

client.on("disconnect", () => {
    console.log( "socket disconnect", client.socket.id ); // x8WIv7-mJelg7on_ALbxc
});



var directions = [ 'up', 'right', 'down', 'left' ];

async function agentLoop () {

	var direction = 0;

	while(true){
		
		var status = await client.move(directions[direction])
		if(!status){
			direction = (direction + 1 ) %4;
		}

	}
}




agentLoop();

client.socket.on( 'you', me => console.log(me) ) // {id, name, x, y, score}

client.socket.on( 'agents sensing', aa => console.log(aa) ) // [ {}, {id, x, y, score}]

client.socket.on( 'parcels sensing', pp => console.log(pp) ) // [ {}, {id, x, y, carriedBy, reward}]

client.socket.on( 'tile', (x, y, delivery) => {
    console.log(x, y, delivery)
} )
