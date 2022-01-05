const router = require('express').Router();
const database = require('../database/database');
const bodyParser = require('body-parser');

router.get('/get', (req, res, next) => {
    database.query(
        `SELECT fluides, personnel FROM couts;`
        , (result)=>{
            res.status(200).send(result[0]);
        })
})

router.put('/set', (req, res, next) => {
    let body = req.body;
    database.query(`UPDATE couts SET fluides=${body.fluides}, personnel=${body.personnel} WHERE id=0;`, function(result){
        res.status(200).send('Costs have been updated successfully.');
    });
})

module.exports = router;
