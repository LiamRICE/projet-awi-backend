const router = require('express').Router();
const database = require('../database/database');

router.get('/get/all', (req, res, next) => {
    database.query(`SELECT * FROM ingredients`, (result)=>{
        res.status(200).send(result);
    })
})

router.get('/get/:ingredientId', (req, res, next) => {
    database.query(`SELECT * FROM ingredients WHERE code=${req.params.ingredientId};`, (result)=>{
        res.status(200).send(result);
    })
})

// requires input names code, libelle, unit, unitprice, stocks, stockvalue and allergene - make sure stocks are up to date (ie. current + new)
router.post('/post', function (req, res){
    let ingredient = req.body;
    database.query(`INSERT INTO ingredients VALUES (${ingredient.code},"${ingredient.libelle}","${ingredient.unit}",${ingredient.unitprice},${ingredient.stocks},${ingredient.stockvalue},${ingredient.allergene});`, function(result){
        console.log("Insert complete.");
        res.status(200).send('Ingredient has been added successfully.');
    });
});

// requires input names code, libelle, unit, unitprice, stocks, stockvalue and allergene - make sure stocks are up to date (ie. current + new)
router.put('/put/:ingredientId', function (req, res){
    let ingredient = req.params.ingredientId;
    let update = req.body;
    database.query(`UPDATE ingredients SET libelle="${update.libelle}"unit=,"${update.unit}",unitprice=${update.unitprice},stocks=${update.stocks},stockvalue=${update.stockvalue},allergene=${update.allergene} WHERE code=${ingredient};`, function(err, result){
        if(err) throw err;
        console.log("Update complete.");
        res.status(200).send('Ingredient has been updated successfully.');
    });
});

// requires input names code, libelle, unit, unitprice, stocks, stockvalue and allergene - make sure stocks are up to date (ie. current + new)
router.put('/addstock/:ingredientId', function (req, res){
    let ingredient = req.params.ingredientId;
    let toadd = req.body;
    database.query(`SELECT * FROM ingredients WHERE code=${ingredient};`, (result)=>{
        let previous = result;
        database.query(`UPDATE ingredients SET stocks=${previous.stocks + toadd.stocks},stockvalue=${(previous.stocks + toadd.stocks)*previous.unitprice} WHERE code=${ingredient};`, function(err, result){
            if(err) throw err;
            console.log("Update complete.");
            res.status(200).send('Ingredient has been updated successfully.');
        });
    });

});

module.exports = router;