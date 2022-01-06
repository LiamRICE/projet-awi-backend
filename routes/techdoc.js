const router = require('express').Router();
const database = require('../database/database');
const bodyParser = require('body-parser');
const techdocService = require('../services/techdoc');

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

router.get('/get/all', (req, res, next) => {
    database.query(
        `SELECT * FROM 
(SELECT * FROM technicaldoc LEFT OUTER JOIN stepsindoc ON stepsindoc.docid = technicaldoc.id) AS header 
LEFT OUTER JOIN 
(SELECT id AS bstepid, title, description, time, quantity, code, libelle, unit, unitprice, stocks, stockvalue, allergene FROM
(SELECT * FROM step LEFT OUTER JOIN stepusesingredient ON stepusesingredient.stepid = step.id) AS body 
LEFT OUTER JOIN 
(SELECT * FROM ingredients) AS detail
ON body.ingredientcode = detail.code) AS bottom
ON header.stepid = bottom.bstepid ORDER BY rank ASC;`
        , (result)=>{
            res.status(200).send(techdocService.toTechdocList(result));
        })
})

router.get('/get/:techdocId', (req, res, next) => {
    // doesn't yet return specific meal
    database.query(
        `SELECT * FROM (
SELECT * FROM 
(SELECT * FROM technicaldoc LEFT OUTER JOIN stepsindoc ON stepsindoc.docid = technicaldoc.id) AS header 
LEFT OUTER JOIN 
(SELECT id AS bstepid, title, description, time, quantity, code, libelle, unit, unitprice, stocks, stockvalue, allergene FROM
(SELECT * FROM step LEFT OUTER JOIN stepusesingredient ON stepusesingredient.stepid = step.id) AS body 
LEFT OUTER JOIN 
(SELECT * FROM ingredients) AS detail
ON body.ingredientcode = detail.code) AS bottom
ON header.stepid = bottom.bstepid) AS full
WHERE full.id=${req.params.techdocId} ORDER By rank ASC;`
        , (result)=>{
            res.status(200).send(techdocService.toTechdoc(result));
        })
})

// requires input form with input names : id, name, description, author, responsable, nbserved
router.post('/post/header', function (req, res){
    let techdoc = req.body;
    database.query(`INSERT INTO technicaldoc VALUES (${techdoc.id},"${techdoc.name}","${techdoc.description}","${techdoc.author}","${techdoc.responsable}",${techdoc.nbserved}, 0, 0);`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc header has been added successfully.');
    });
});

// requires input form with input names : id, title, description, time
router.post('/post/step', function (req, res){
    let step = req.body;
    database.query(`INSERT INTO step VALUES (${step.id},"${step.title}","${step.description}",${step.time});`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc step has been added successfully.');
    });
});

// requires input form with input names : docid, stepid
router.post('/post/stepinheader', function (req, res){
    let sih = req.body;
    database.query(`INSERT INTO stepsindoc VALUES (${sih.docid},${sih.stepid},${sih.rank});`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc step has been added successfully to header.');
    });
});

// requires input form with input names : stepid, ingredientcode, quantity
router.post('/post/ingredientinstep', function (req, res){
    let sui = req.body;
    database.query(`INSERT INTO stepusesingredient VALUES (${sui.stepid},${sui.ingredientcode},${sui.quantity});`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc header has been added successfully.');
    });
});

router.put('/put/header', function (req, res){
    let techdoc = req.body;
    database.query(`UPDATE technicaldoc SET name="${techdoc.name}", header="${techdoc.description}", author="${techdoc.author}", responsable="${techdoc.responsable}", nbserved=${techdoc.nbserved}, default=${techdoc.default}, usecharges=${techdoc.usecharges} WHERE id=${techdoc.id};
    INSERT INTO technicaldoc VALUES (,"","","","",, 0, 0);`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc header has been updated successfully.');
    });
});

// requires input form with input names : id, title, description, time
router.put('/put/step', function (req, res){
    let step = req.body;
    // TODO - replace queries
    database.query(`INSERT INTO step VALUES (${step.id},"${step.title}","${step.description}",${step.time});`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc step has been added successfully.');
    });
});

// requires input form with input names : docid, stepid
router.put('/put/stepinheader', function (req, res){
    let sih = req.body;
    // TODO - replace queries
    database.query(`INSERT INTO stepsindoc VALUES (${sih.docid},${sih.stepid},${sih.rank});`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc step has been added successfully to header.');
    });
});

// requires input form with input names : stepid, ingredientcode, quantity
router.put('/put/ingredientinstep', function (req, res){
    let sui = req.body;
    // TODO - replace queries
    database.query(`INSERT INTO stepusesingredient VALUES (${sui.stepid},${sui.ingredientcode},${sui.quantity});`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc header has been added successfully.');
    });
});

module.exports = router;