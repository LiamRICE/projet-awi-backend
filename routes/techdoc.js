const router = require('express').Router();
const database = require('../database/database');

router.get('/', (req, res, next) => {
    database.query(
        `SELECT * 
        FROM technicaldoc, stepsindoc, step, stepusesingredient, ingredients 
        WHERE stepsindoc.docname = technicaldoc.name AND stepsindoc.steptitle = step.title AND stepusesingredient.steptitle = step.title AND stepusesingredient.ingredientcode = ingredients.code;`
        , (result)=>{
        res.status(200).send(result);
    })
})

router.post('/input/', async function(req, res, next) {
    try {
        res.json(await techdoc.create(req.body));
    } catch (err) {
        console.error(`Error while creating technical doc`, err.message);
        next(err);
    }
});

// curl -i -X POST -H 'Accept: application/json' \ -H 'Content-type: application/json' http://localhost:3000/technicaldoc/input/ \ --data '{"name":"Document", "header":"Header","author":"Meeee","responsable":"Also Meeee","nbserved":4}'
// could not resolve host application?

module.exports = router;