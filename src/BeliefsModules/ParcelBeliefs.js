import ParcelBelief from "./Models/ParcelBeliefModel.js";

/**
 * current beliefs about parcels.
 * @type {ParcelBelief[]}
 */
let parcels_data = [];


/**
 * retrieve all the current beliefs on parcels.
 * @returns {ParcelBelief[]}
 */
function getAllParcelsBeliefs(){
    return parcels_data;
}


/**
 * add the beliefs for a new parcel passed as parameter.
 * @param {{id: string, x: number, y: number, carriedBy: string, reward: number}} parcel
 */
function setParcelBelief(parcel){
    parcels_data.push(new ParcelBelief(parcel.id,parcel.x,parcel.y,parcel.carriedBy,parcel.reward,0,1));
}

/**
 * update the beliefs of a single parcel passed as parameter.
 * @param {{id: string, x: number, y: number, carriedBy: string, reward: number}} parcel
 * @param {number} probability
 */
function updateParcelBeliefs(parcel, probability){
    let i = parcels_data.findIndex((v) => v.id === parcel.id);

    if(i === -1){
        setParcelBelief(parcel);
        return;
    }

    parcels_data[i].position.x = parcel.x;
    parcels_data[i].position.y = parcel.y;
    parcels_data[i].carriedBy = parcel.carriedBy;
    parcels_data[i].reward = parcel.reward;
    parcels_data[i].probability = probability;
}


/**
 * update the beliefs of the parcels passed as parameter.
 * @param {{id: string, x: number, y: number, carriedBy: string, reward: number}[]} parcels
 */
function updateParcelsBeliefs(parcels){
    if(!Array.isArray(parcels)){
        updateParcelBeliefs(parcels,1);
        return;
    }
    parcels.forEach((p) => updateParcelBeliefs(p,1));
}


export default Object.freeze({
    getAllParcelsBeliefs,
    updateParcelsBeliefs,
    updateParcelBeliefs,
    setParcelBelief
});