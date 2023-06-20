/**
 * current beliefs about agents.
 * @type {[{id: string, name: string, position: { x: number, y: number }, score: number}]}
 */
let agent_data = [{}]

/**
 * retrieve all the current beliefs on agents.
 * @returns {[{id: string, name: string, position: { x: number, y: number }, score: number}]}
 */
function getAllAgentsBeliefs() {
    return agent_data;
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

    for (let i = 0; i < agents.length; i ++){
        updateAgentBeliefs(agents[i]);
    }
}

/**
 *  update the beliefs of a single agent passed as parameter.
 *  @param {{id: string, name: string, x: number, y: number, score: number}} agent
 */
function updateAgentBeliefs(agent){
    let i = agent_data.findIndex((value) => value.id.equals(agent.id));

    if(i === -1){
        setAgentBeliefs(agent);
        return;
    }

    let old_belief = agent_data[i];

    // do stuff? TODO

    agent_data[i].position.x = agent.x;
    agent_data[i].position.y = agent.y;
    agent_data[i].score = agent.score;
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
        score : agent.score
    })
}

export default {
    getAllAgentsBeliefs,
    updateAgentsBeliefs,
    updateAgentBeliefs,
    setAgentBeliefs
}