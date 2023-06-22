/**
 * Instance of a belief on an agent.
 */
class AgentBelief {
    constructor(id,name,x,y,score,direction,time,probability) {
        this.id = id;
        this.name = name;
        this.position = {
            x: x,
            y: y
        };
        this.time = time;
        this.score = score;
        this.direction = direction;
        this.probability = probability;
    }
}

export default AgentBelief;