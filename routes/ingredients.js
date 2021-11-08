const router = require('express').Router();
const database = require('../database/database');

router.get('/', (req, res, next) => {
    database.query(`SELECT * FROM ingredients`, (result)=>{
        res.status(200).send(result);
    })
})



module.exports = router;