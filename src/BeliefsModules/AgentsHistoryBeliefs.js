/**
 * History (up to some point) of agents beliefs
 * @type {{id:string, history:{position: { x: number, y: number }, score: number, direction: string}[]}[] }
 */
let agents_history = [];

// the limit of entries for each agent.
let limit = 5;

/**
 * get all the history data on all the agents.
 * @returns {{id: string, history: {position: {x: number, y: number}, score: number, direction: string}[]}[]}
 */
function getAllAgentsHistory() {
    return agents_history;
}


/**
 * get the history data on a specific agent by id.
 * @param {string} id
 * @returns {{id: string, history: {position: {x: number, y: number}, score: number, direction: string}[]} | undefined}
 */
function getHistoryOfAgentById(id){
    return agents_history.find((v) => v.id === id);
}

/**
 * add a new agent to the beliefs' history.
 * @param {{id: string, name: string, position: { x: number, y: number }, score: number, direction: string}} agent
 */
function addAgentHistory(agent) {
    agents_history.push({
        id: agent.id,
        history : [{
            position: agent.position,
            score : agent.score,
            direction : agent.direction
        }]
    });
}

/**
 * update the beliefs' history of a single agent.
 * @param {{id: string, name: string, position: { x: number, y: number }, score: number, direction: string}} agent
 */
function updateAgentHistory(agent) {
    let i = agents_history.findIndex((v) => v.id === agent.id);

    if( i === -1 ){
        addAgentHistory(agent);
        return;
    }

    agents_history[i].history.push({
        position: agent.position,
        score : agent.score,
        direction : agent.direction
    })

    if(agents_history[i].history.length > limit) {
        agents_history[i].history.pop();
    }
}

/**
 * update the beliefs' history of the agents passed as parameter.
 * @param {{id: string, name: string, position: { x: number, y: number }, score: number, direction: string}[]} agents
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