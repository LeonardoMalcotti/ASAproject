import AgentBelief from "./Models/AgentBeliefModel.js";

//{[{id: string, name: string, position: { x: number, y: number }, score: number, direction: string, time: number, probability: number}]}

/**
 * current beliefs about agents.
 * @type {AgentBelief[]}
 */
let agent_data = [];


/**
 * retrieve all the current beliefs on agents.
 * @returns {AgentBelief[]}
 */
function getAllAgentsBeliefs() {
    return agent_data;
}


/**
 * retrieve the current belief of an agent by id.
 * @returns {AgentBelief}
 * @param {string} id
 */
function getAgentBeliefsById(id){
    return agent_data.find((v) => v.id === id);
}


/**
 * retrieve the current belief of an agent by name.
 * @returns {AgentBelief}
 * @param {string} name
 */
function getAgentBeliefsByName(name){
    return agent_data.find((v) => v.name === name);
}


/**
 *  add the beliefs for a new agent passed as parameter.
 *  @param {{id: string, name: string, x: number, y: number, score: number}} agent
 */
function setAgentBeliefs(agent) {
    agent_data.push(new AgentBelief(
        agent.id,
        agent.name,
        agent.x,
        agent.y,
        agent.score,
        "unknown",
        0,
        1)
    );
}


/**
 *  update the beliefs of a single agent passed as parameter.
 *  @param {{id: string, name: string, x: number, y: number, score: number}} agent
 * @param {number} probability
 */
function updateAgentBeliefs(agent, probability){
    let i = agent_data.findIndex((v) => v.id === agent.id);

    if(i === -1){
        setAgentBeliefs(agent);
        return;
    }

    let old_belief = agent_data[i];

    if(old_belief.position.x !== agent.x){
        agent_data[i].direction = old_belief.position.x < agent.x ? "left" : "right";
    } else if (old_belief.position.y !== agent.y){
        agent_data[i].direction = old_belief.position.y < agent.y ? "down" : "up";
    }

    agent_data[i].position.x = agent.x;
    agent_data[i].position.y = agent.y;
    agent_data[i].score = agent.score;
    agent_data[i].probability = probability;
}


/**
 *  update the beliefs of the agents passed as parameter.
 *  @param {[{id: string, name: string, x: number, y: number, score: number}]} agents
 */
function updateAgentsBeliefs(agents){
    if(!Array.isArray(agents)){
        updateAgentBeliefs(agents, 1);
        return;
    }
    agents.forEach((a) => updateAgentBeliefs(a,1));
}


export default Object.freeze({
    getAgentBeliefsById,
    getAllAgentsBeliefs,
    getAgentBeliefsByName,
    updateAgentsBeliefs,
    updateAgentBeliefs,
    setAgentBeliefs
});