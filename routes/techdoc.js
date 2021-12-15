const router = require('express').Router();
const database = require('../database/database');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

router.get('/get/all', (req, res, next) => {
    database.query(
        `SELECT * 
        FROM technicaldoc, stepsindoc, step, stepusesingredient, ingredients 
        WHERE stepsindoc.docname = technicaldoc.name AND stepsindoc.steptitle = step.title AND stepusesingredient.steptitle = step.title AND stepusesingredient.ingredientcode = ingredients.code;`
        , (result)=>{
            res.status(200).send(result);
        })
})

router.get('/get/:techdocId', (req, res, next) => {
    database.query(
        `SELECT * 
        FROM technicaldoc, stepsindoc, step, stepusesingredient, ingredients 
        WHERE stepsindoc.docname = technicaldoc.name AND stepsindoc.steptitle = step.title AND stepusesingredient.steptitle = step.title AND stepusesingredient.ingredientcode = ingredients.code;`
        , (result)=>{
            let obj = json.parse(result);
            let finalObj = []
            for(res in obj){
                if(res.name == req.params.techdocId){
                    finalObj.append(res)
                }
            }
            res.status(200).send(finalObj);
        })
})

// requires input form with input names : name, description, author, responsable, nbserved
router.post('/post', function (req, res){
    let techdoc = req.body;
    database.query(`INSERT INTO technicaldoc VALUES ("${techdoc.name}","${techdoc.description}","${techdoc.author}","${techdoc.responsable}",${techdoc.nbserved});`, function(err, result){
        if(err) throw err;
        console.log("Insert complete.");
    });
    res.status(200).send('Techdoc header has been added successfully.');
});

module.exports = router;