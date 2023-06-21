/**
 * current beliefs about agents.
 * @type {[{id: string, name: string, position: { x: number, y: number }, score: number, direction: string}]}
 */
let agent_data = [];


/**
 * retrieve all the current beliefs on agents.
 * @returns {[{id: string, name: string, position: { x: number, y: number }, score: number, direction: string}]}
 */
function getAllAgentsBeliefs() {
    return agent_data;
}


/**
 * retrieve the current belief of an agent by id.
 * @returns {{id: string, name: string, position: {x: number, y: number}, score: number, direction: string} | undefined}
 * @param {string} id
 */
function getAgentBeliefsById(id){
    return agent_data.find((v) => v.id === id);
}


/**
 * retrieve the current belief of an agent by name.
 * @returns {{id: string, name: string, position: {x: number, y: number}, score: number, direction: string} | undefined}
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
    agent_data.push({
        id : agent.id,
        name : agent.name,
        position : {
            x : agent.x,
            y : agent.y
        },
        score : agent.score,
        direction: "unknown"
    });
}


/**
 *  update the beliefs of a single agent passed as parameter.
 *  @param {{id: string, name: string, x: number, y: number, score: number}} agent
 */
function updateAgentBeliefs(agent){
    let i = agent_data.findIndex((v) => v.id === agent.id);

    if(i === -1){
        setAgentBeliefs(agent);
        return;
    }

    let old_belief = agent_data[i];

    if(old_belief.position.x !== agent.x){
        agent_data[i].direction = old_belief.position.x < agent.x ? "left" : "right"
    } else if (old_belief.position.y !== agent.y){
        agent_data[i].direction = old_belief.position.y < agent.y ? "down" : "up"
    }

    agent_data[i].position.x = agent.x;
    agent_data[i].position.y = agent.y;
    agent_data[i].score = agent.score;
}


/**
 *  update the beliefs of the agents passed as parameter.
 *  @param {[{id: string, name: string, x: number, y: number, score: number}]} agents
 */
function updateAgentsBeliefs(agents){
    if(!Array.isArray(agents)){
        updateAgentBeliefs(agents);
        return;
    }
    agents.forEach(updateAgentBeliefs);
}


export default Object.freeze({
    getAgentBeliefsById,
    getAllAgentsBeliefs,
    getAgentBeliefsByName,
    updateAgentsBeliefs,
    updateAgentBeliefs,
    setAgentBeliefs
});