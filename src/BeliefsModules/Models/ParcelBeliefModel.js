/**
 * Instance of a belief on a parcel.
 */
class ParcelBelief {
    constructor(id,x,y,carriedBy,reward,time,probability) {
        this.id = id;
        this.carriedBy = carriedBy;
        this.position = {
            x: x,
            y: y
        };
        this.time = time;
        this.reward = reward;
        this.probability = probability;
    }
}

export default ParcelBelief;