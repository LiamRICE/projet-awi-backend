const router = require('express').Router();
const database = require('../database/database');

router.get('/', (req, res, next) => {
    database.query(`SELECT * FROM ingredients`, (result)=>{
        res.status(200).send(result);
    })
})

router.get('/ingredient/:ingredientId', (req, res, next) => {
    database.query(`SELECT * FROM ingredients WHERE code=${req.params.ingredientId}`, (result)=>{
        res.status(200).send(result);
    })
})

module.exports = router;