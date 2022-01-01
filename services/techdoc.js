

async function create(techdoc){
    const result = await db.query(
        `INSERT INTO technicaldoc 
    (name, header, author, responsable, nbserved) 
    VALUES 
    (?, ?, ?, ?, ?)`,
        [
            techdoc.name, techdoc.header,
            techdoc.author, techdoc.responsable,
            techdoc.nbserved
        ]
    );

    let message = 'Error in creating technical document';

    if (result.affectedRows) {
        message = 'Technical document created successfully';
    }

    return {message};
}

function toTechdoc(data){
    let header = {
        "id":data[0].id,
        "name":data[0].name,
        "header":data[0].header,
        "author":data[0].author,
        "responsable":data[0].responsable,
        "nbserved":data[0].nbserved,
        "steps":[]
    };
    let listOfStepIds = [];
    for(let i=0; i<data.length; i++) {
        if (data[i].stepid != null) {
            if (data[i].stepid in listOfStepIds) {
                // do nothing
            } else {
                header.steps.push({
                    "stepid": data[i].stepid,
                    "title": data[i].title,
                    "description": data[i].description,
                    "time": data[i].time,
                    "ingredients": []
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
                            "code": data[j].code,
                            "libelle": data[j].libelle,
                            "quantity": data[j].quantity,
                            "unit": data[j].unit,
                            "unitprice": data[j].unitprice,
                            "allergen": data[j].allergene,
                        })
                    }
                }
            }
        }
    }
    return header;
}

function toTechdocList(data){
    listOfTechDocIds = []
    for(let i=0; i<data.length; i++){
        if(data[i].id in listOfTechDocIds){
            // do nothing
        }else{
            listOfTechDocIds.push(data[i].id);
        }
    }
    listOfTechdocs = []
    for(let id in listOfTechDocIds){
        list = []
        for(let i=0; i<data.length; i++){
            if(id == data[i].id){
                list.push(data[i]);
            }
        }
        listOfTechdocs.push(toTechdoc(list));
    }
    return listOfTechdocs;
}

module.exports = {
    create,
    toTechdoc,
    toTechdocList,
}