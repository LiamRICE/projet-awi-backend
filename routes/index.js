module.exports = (app) => {
    app.use('/ingredients', require('./ingredients'));
}