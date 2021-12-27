

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

function toTechdocList(data){
    let header = {
        "id":data[0].id,
        "name":data[0].name,
        "header":data[0].header,
        "author":data[0].author,
        "responsable":data[0].responsable,
        "nbserved":data[0].nbserved,
        "steps":[]
    };
    /*
    let listOfStepIds = [];
    for(let instance in data){
        if(instance.stepid in listOfStepIds){
            // do nothing
        }else {
            header.steps.append({
                "stepid": instance.stepid,
                "title": instance.title,
                "description": instance.description,
                "time": instance.time,
                "ingredients": []
            });
            listOfStepIds.append(instance.stepid);
        }
    }
    for(let instance in data){
        for(step in header.steps){
            if(instance.stepid == step.stepid){
                step.ingredients.append({
                    "code":instance.code,
                    "libelle":instance.libelle,
                    "quantity":instance.quantity,
                    "unit":instance.unit,
                    "unitprice":instance.unitprice,
                    "allergen":instance.allergene,
                })
            }
        }
    }
     */
    return header;
}

module.exports = {
    create,
    toTechdocList,
}