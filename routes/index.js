module.exports = (app) => {
    app.use('/ingredients', require('./ingredients'));
    app.use('/technicaldoc', require('./techdoc'));
}