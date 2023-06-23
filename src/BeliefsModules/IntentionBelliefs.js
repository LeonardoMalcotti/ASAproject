import IntentionBelief from "./Models/IntentionBeliefModel.js";

/**
 * Beliefs on the intentions of other agents.
 * @type {{agent: string, intentions: IntentionBelief[]}[]}
 */
let intention_data = [];


/**
 * retrieve all the believed intentions of other agents.
 * @returns {{agent: string, intentions: IntentionBelief[]}[]}
 */
function getAllIntentionBeliefs(){
    return intention_data;
}


/**
 * retrieve the intentions of a single agent.
 * @param agent
 * @returns {{agent: string, intentions: IntentionBelief[]}}
 */
function getIntentionOfAgent(agent){
    return intention_data.find((v) => v.agent === agent);
}


/**
 * get all the intention list that contain an intention of the specified type.
 * @param {"pick_up" | "go_to" | "reach_destination" } type
 * @returns {{agent: string, intentions: IntentionBelief[]}[]}
 */
function getAllIntentionWithType(type){
    return intention_data.filter((v) => v.intentions.findIndex((i) => i.type === type));
}


/**
 * Add a new intention to an agent.
 * @param {string} agent
 * @param {"pick_up" | "go_to" | "reach_destination" } type
 * @param {any} metadata
 * @param {number} time
 * @param {number} probability
 */
function addNewIntention(agent, type, metadata, time, probability){
    let i = intention_data.findIndex((v) => v.agent === agent);

    if(i === -1){
        intention_data.push({
            agent: agent,
            intentions : [new IntentionBelief(0,type,metadata,time,probability)]
        });
    } else {
        intention_data[i].intentions.push(new IntentionBelief(intention_data[i].intentions.length,type,metadata,time,probability));
    }
}


/**
 * remove a specific intention for an agent.
 * @param {string} agent
 * @param {number} id
 */
function removeIntentionOfAgent(agent, id){
    let i = intention_data.findIndex((v) => v.agent === agent);
    if(i !== -1){
        intention_data[i].intentions = intention_data[i].intentions.filter((i) => i.id !== id);
    }
}


export default Object.freeze({
    getAllIntentionBeliefs,
    getIntentionOfAgent,
    getAllIntentionWithType,
    addNewIntention,
    removeIntentionOfAgent
});