import AgentBelief from "./Models/AgentBeliefModel.js";

/**
 * History (up to some point) of agents beliefs
 * @type {{id:string, history:AgentBelief[]}[] }
 */
let agents_history = [];

// the limit of entries for each agent.
let limit = 5;

/**
 * get all the history data on all the agents.
 * @returns {{id:string, history:AgentBelief[]}[] }
 */
function getAllAgentsHistory() {
    return agents_history;
}


/**
 * get the history data on a specific agent by id.
 * @param {string} id
 * @returns {{id:string, history:AgentBelief[]} | undefined}
 */
function getHistoryOfAgentById(id){
    return agents_history.find((v) => v.id === id);
}

/**
 * add a new agent to the beliefs' history.
 * @param {AgentBelief} agent
 */
function addAgentHistory(agent) {
    agents_history.push({
        id: agent.id,
        history : [agent]
    });
}

/**
 * update the beliefs' history of a single agent.
 * @param {AgentBelief} agent
 */
function updateAgentHistory(agent) {
    let i = agents_history.findIndex((v) => v.id === agent.id);

    if( i === -1 ){
        addAgentHistory(agent);
        return;
    }

    agents_history[i].history.push(agent)

    if(agents_history[i].history.length > limit) {
        agents_history[i].history.pop();
    }
}

/**
 * update the beliefs' history of the agents passed as parameter.
 * @param {AgentBelief[]} agents
 */
function updateAgentsHistory(agents){
    if(!Array.isArray(agents)){
        updateAgentHistory(agents);
        return;
    }
    agents.forEach(updateAgentHistory);
}

export default Object.freeze({
    updateAgentsHistory,
    updateAgentHistory,
    addAgentHistory,
    getHistoryOfAgentById,
    getAllAgentsHistory
})