const router = require('express').Router();
const database = require('../database/database');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

router.get('/techdoc-get', (req, res, next) => {
    database.query(
        `SELECT * 
        FROM technicaldoc, stepsindoc, step, stepusesingredient, ingredients 
        WHERE stepsindoc.docname = technicaldoc.name AND stepsindoc.steptitle = step.title AND stepusesingredient.steptitle = step.title AND stepusesingredient.ingredientcode = ingredients.code;`
        , (result)=>{
        res.status(200).send(result);
    })
})

router.get('/techdocs-get', function (req, res){
    return res.json(techdocs);
});

// requires input form with input names : name, description, author, responsable, nbserved
router.post('/techdocput', function (req, res){
    var techdoc = req.body;
    database.query(`INSERT INTO technicaldoc VALUES ("${techdoc.name}","${techdoc.description}","${techdoc.author}","${techdoc.responsable}",${techdoc.nbserved});`, function(err, result){
        if(err) throw err;
        console.log("Insert complete.")
    });
    res.send('User has been added successfully.');
});

module.exports = router;