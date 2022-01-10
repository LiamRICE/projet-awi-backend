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

// peut provoquer soucis
router.get('/get/docid/:stepId', (req, res, next) => {
    database.query(`SELECT docid FROM stepsindoc WHERE stepid=${req.params.stepId};`
        ,(result) => {
            res.status(200).send(result);
        })
})

router.get('/get/stepid', (req, res, next) => {
    database.query(`SELECT stepid FROM stepsindoc;`
        ,(result) => {
            res.status(200).send(result);
        })
})

router.get('/tickets', (req, res, next) => {
  database.query(
        `SELECT technicaldoc.id, technicaldoc.name, ingredients.code, ingredients.libelle, ingredients.stocks, ingredients.unitprice, ingredients.allergene, SUM(stepusesingredient.quantity) AS quantite 
        FROM technicaldoc LEFT OUTER JOIN stepsindoc ON technicaldoc.id = stepsindoc.docid 
        LEFT OUTER JOIN stepusesingredient ON stepusesingredient.stepid = stepsindoc.stepid 
        LEFT OUTER JOIN ingredients ON ingredients.code = stepusesingredient.ingredientcode 
        GROUP BY technicaldoc.id, ingredients.code 
        ORDER BY technicaldoc.id ASC, stepsindoc.rank ASC, ingredients.code ASC;`
    , (result)=>{
      res.status(200).send(techdocService.toTicketList(result));
    })
})

// requires input form with input names : id, name, header, author, responsable, nbserved
router.post('/post/header', function (req, res){
    let techdoc = req.body;
    database.query(`INSERT INTO technicaldoc VALUES (${techdoc.id},"${techdoc.name}","${techdoc.header}","${techdoc.author}","${techdoc.responsable}","${techdoc.category}",${techdoc.nbserved}, 1, 0, ${techdoc.assaisonemments});`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc header has been added successfully.');
    });
});

// requires input form with input names : id, title, header, time
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
    database.query(`UPDATE technicaldoc SET name="${techdoc.name}", header="${techdoc.header}", author="${techdoc.author}", responsable="${techdoc.responsable}", category="${techdoc.category}", nbserved=${techdoc.nbserved}, def=${techdoc.default}, usecharges=${techdoc.usecharges}, assaisonemments=${techdoc.assaisonemments} WHERE id=${techdoc.id};`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc header has been edited successfully.');
    });
});

// requires input form with input names : id, title, header, time
router.put('/put/step', function (req, res){
    let step = req.body;
    database.query(`UPDATE step SET title="${step.title}", description="${step.description}", time=${step.time} WHERE id=${step.stepid};`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc step has been edited successfully.');
    });
});

// requires input form with input names : docid, stepid
router.put('/put/stepinheader', function (req, res){
    let step = req.body;
    database.query(`UPDATE stepsindoc SET rank=${step.rank} WHERE stepid=${step.stepid};`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Techdoc step has been edited successfully to header.');
    });
});

// requires input form with input names : stepid, ingredientcode, quantity
router.put('/put/ingredientinstep', function (req, res){
    let step = req.body;
    database.query(`UPDATE stepusesingredient SET quantity=${step.quantity} WHERE ingredientcode=${step.ingredientcode};`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Ingredient in step has been edited successfully.');
    });
});

router.delete('/delete', function (req, res) {
    let body = req.body;
    database.query(`DELETE FROM technicaldoc WHERE id = ${body.id};`, function (result) {
        console.log("Delete complete.");
        res.status(200).send('Techdoc header has been removed successfully.');
    });
});

router.delete('/delete/step', function (req, res) {
    let body = req.body;
    database.query(`DELETE FROM step WHERE id = ${body.stepid};`, function (result) {
        console.log("Delete complete.");
        res.status(200).send('Step has been removed successfully.');
    });
});

router.delete('/delete/ingredientinstep', function (req, res) {
    let body = req.body;
    database.query(`DELETE FROM stepusesingredient WHERE stepid = ${body.stepid} AND ingredientcode = ${body.ingredientcode};`, function (result) {
        console.log("Delete complete.");
        res.status(200).send('Ingredient has been removed successfully from step.');
    });
})

module.exports = router;
