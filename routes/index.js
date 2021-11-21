module.exports = (app) => {
    app.use('/ingredient', require('./ingredients'));
    app.use('/technicaldoc', require('./techdoc'));
}