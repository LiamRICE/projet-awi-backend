const router = require('express').Router();
const database = require('../database/database');
const bodyParser = require('body-parser');
const techdocService = require('../services/techdoc');

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

router.get('/get/all', (req, res, next) => {
    database.query(
        `SELECT * 
        FROM technicaldoc, stepsindoc, step, stepusesingredient, ingredients 
        WHERE stepsindoc.docid = technicaldoc.id AND stepsindoc.stepid = step.id AND stepusesingredient.stepid = step.id AND stepusesingredient.ingredientcode = ingredients.code;`
        , (result)=>{
            res.status(200).send(techdocService.toTechdocList(result));
        })
})

router.get('/get/:techdocId', (req, res, next) => {
    // doesn't yet return specific meal
    database.query(
        `SELECT * 
        FROM technicaldoc, stepsindoc, step, stepusesingredient, ingredients 
        WHERE stepsindoc.docid = technicaldoc.id AND stepsindoc.stepid = step.id AND stepusesingredient.stepid = step.id AND stepusesingredient.ingredientcode = ingredients.code AND technicaldoc.id=${req.params.techdocId};`
        , (result)=>{
            res.status(200).send(techdocService.toTechdoc(result));
        })
})

// requires input form with input names : id, name, description, author, responsable, nbserved
router.post('/post/header', function (req, res){
    let techdoc = req.body;
    database.query(`INSERT INTO technicaldoc VALUES (${techdoc.id},"${techdoc.name}","${techdoc.description}","${techdoc.author}","${techdoc.responsable}",${techdoc.nbserved});`, function(err, result){
        if(err) throw err;
        console.log("Insert complete.");
    });
    res.status(200).send('Techdoc header has been added successfully.');
});

// requires input form with input names : id, title, description, time
router.post('/post/step', function (req, res){
    let step = req.body;
    database.query(`INSERT INTO step VALUES (${step.id},"${step.title}","${step.description}",${step.time});`, function(err, result){
        if(err) throw err;
        console.log("Insert complete.");
    });
    res.status(200).send('Techdoc step has been added successfully.');
});

// requires input form with input names : docid, stepid
router.post('/post/stepinheader', function (req, res){
    let sih = req.body;
    database.query(`INSERT INTO stepsindoc VALUES (${sih.docid},${sih.stepid});`, function(err, result){
        if(err) throw err;
        console.log("Insert complete.");
    });
    res.status(200).send('Techdoc step has been added successfully to header.');
});

// requires input form with input names : stepid, ingredientcode, quantity
router.post('/post/ingredientinstep', function (req, res){
    let sui = req.body;
    database.query(`INSERT INTO stepusesingredient VALUES (${sui.stepid},${sui.ingredientcode},${sui.quantity});`, function(err, result){
        if(err) throw err;
        console.log("Insert complete.");
    });
    res.status(200).send('Techdoc header has been added successfully.');
});

module.exports = router;