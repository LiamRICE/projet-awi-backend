function toTechdoc(data){
    let header = {
        id:data[0].id,
        name:data[0].name,
        header:data[0].header,
        author:data[0].author,
        responsable:data[0].responsable,
        category:data[0].category,
        nbserved:data[0].nbserved,
        default:data[0].def,
        usecharges:data[0].usecharges,
        assaisonemments:data[0].assaisonemments,
        steps:[]
    };
    let listOfStepIds = [];
    for(let i=0; i<data.length; i++) {
        if (data[i].stepid != null) {
            if (!listOfStepIds.includes(data[i].stepid)) {
                header.steps.push({
                    stepid: data[i].stepid,
                    title: data[i].title,
                    description: data[i].description,
                    time: data[i].time,
                    rank: data[i].rank,
                    ingredients: []
                });
                listOfStepIds.push(data[i].stepid);
            }
        }
    }
    for(let i=0; i<header.steps.length; i++){
        for(let j=0; j<data.length; j++){
            if(data[j].stepid != null) {
                if (data[j].stepid == header.steps[i].stepid) {
                    if(data[j].code != null) {
                        header.steps[i].ingredients.push({
                            code: data[j].code,
                            libelle: data[j].libelle,
                            quantity: data[j].quantity,
                            unit: data[j].unit,
                            unitprice: data[j].unitprice,
                            allergen: data[j].allergene,
                        })
                    }
                }
            }
        }
    }
    return header;
}

function toTechdocList(data){
    let listOfTechDocIds = []
    for(let i=0; i<data.length; i++){
        if(!listOfTechDocIds.includes(data[i].id)){
            listOfTechDocIds.push(data[i].id);
        }
    }
    let listOfTechdocs = []
    listOfTechDocIds.forEach((id) => {
        let list = []
        for(let i=0; i<data.length; i++){
            if(id == data[i].id){
                list.push(data[i]);
            }
        }
        listOfTechdocs.push(toTechdoc(list));
    });
    return listOfTechdocs;
}

function makeUniqueId(ids){
    let max = 0;
    ids.forEach((id) => {
        if(id >= max){
            max = id;
        }
    });
    return max+1;
}

function toTicketList(data){
    let listOfTicketsIds= []
    for(let i=0; i<data.length; i++){
        if(!listOfTicketsIds.includes(data[i].id)){
            listOfTicketsIds.push(data[i].id);
        }
    }
    let listOfTickets= []
    listOfTicketsIds.forEach((id) => {
        let list = []
        for(let i=0; i<data.length; i++){
            if(id == data[i].id){
                list.push(data[i]);
            }
        }
        listOfTickets.push(toTicket(list));
    });
    return listOfTickets;
}

function toTicket(data){
     let header = {
        id:data[0].id,
        name:data[0].name,
        ingredients:[]
    };
    for(let i=0; i<data.length; i++) {
        if (data[i].code != null) {
            header.ingredients.push({
              code: data[i].code,
              libelle: data[i].libelle,
              stocks: data[i].stocks,
              unitprice: data[i].unitprice,
              allergene: data[i].allergene,
              quantite: data[i].quantite
            });
        }
    }
    return header;
}

module.exports = {
    toTechdoc,
    toTechdocList,
    makeUniqueId,
    toTicketList,
    toTicket,
}