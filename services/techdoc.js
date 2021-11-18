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

module.exports = {
    getMultiple,
    create
}