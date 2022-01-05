const router = require('express').Router();
const database = require('../database/database');
const bodyParser = require('body-parser');

router.get('/get', (req, res, next) => {
    database.query(
        `SELECT fluides, personnel FROM couts;`
        , (result)=>{
            res.status(200).send(result);
        })
})
