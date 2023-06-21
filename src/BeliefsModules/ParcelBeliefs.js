/**
 * current beliefs about parcels.
 * @type {{id: string, position: {x: number, y: number}, carriedBy: string, reward: number}[]}
 */
let parcels_data = [];


/**
 * retrieve all the current beliefs on parcels.
 * @returns {{id: string, position: {x: number, y: number}, carriedBy: string, reward: number}[]}
 */
function getAllParcelsBeliefs(){
    return parcels_data;
}


/**
 * add the beliefs for a new parcel passed as parameter.
 * @param {{id: string, x: number, y: number, carriedBy: string, reward: number}} parcel
 */
function setParcelBelief(parcel){
    parcels_data.push({
        id : parcel.id,
        position : {
            x: parcel.x,
            y: parcel.y
        },
        carriedBy : parcel.carriedBy,
        reward : parcel.reward
    });
}

/**
 * update the beliefs of a single parcel passed as parameter.
 * @param {{id: string, x: number, y: number, carriedBy: string, reward: number}} parcel
 */
function updateParcelBeliefs(parcel){
    let i = parcels_data.findIndex((v) => v.id === parcel.id);

    if(i === -1){
        setParcelBelief(parcel);
        return;
    }

    parcels_data[i].position.x = parcel.x;
    parcels_data[i].position.y = parcel.y;
    parcels_data[i].carriedBy = parcel.carriedBy;
    parcels_data[i].reward = parcel.reward;
}


/**
 * update the beliefs of the parcels passed as parameter.
 * @param {{id: string, x: number, y: number, carriedBy: string, reward: number}[]} parcels
 */
function updateParcelsBeliefs(parcels){
    if(!Array.isArray(parcels)){
        updateParcelBeliefs(parcels);
        return;
    }
    parcels.forEach(updateParcelBeliefs);
}


export default Object.freeze({
    getAllParcelsBeliefs,
    updateParcelsBeliefs,
    updateParcelBeliefs,
    setParcelBelief
});