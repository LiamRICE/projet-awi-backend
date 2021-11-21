const router = require('express').Router();
const database = require('../database/database');

router.get('/all', (req, res, next) => {
    database.query(`SELECT * FROM ingredients`, (result)=>{
        res.status(200).send(result);
    })
})

router.get('/:ingredientId', (req, res, next) => {
    database.query(`SELECT * FROM ingredients WHERE code=${req.params.ingredientId};`, (result)=>{
        res.status(200).send(result);
    })
})

// requires input names code, libelle, unit, unitprice, stocks, stockvalue and allergene - make sure stocks are up to date (ie. current + new)
router.post('/post', function (req, res){
    let ingredient = req.body;
    database.query(`INSERT INTO ingredients VALUES (${ingredient.code},"${ingredient.libelle}","${ingredient.unit}",${ingredient.unitprice},${ingredient.stocks},${ingredient.stockvalue},${ingredient.allergene});`, function(err, result){
        if(err) throw err;
        console.log("Insert complete.");
    });
    res.status(200).send('Ingredient has been added successfully.');
});

module.exports = router;