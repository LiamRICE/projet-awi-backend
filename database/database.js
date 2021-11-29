var mysql = require('mysql');

exports.connect = (done) => {
    done(null);
}

var connectionPool = null;
/*
function getConnection() {
    if(!connectionPool){
        connectionPool = mysql.createPool({
            conectionLimit:10,
            host:"mysql-rice.alwaysdata.net", // process.env.MYSQL_HOST
            user:"rice", // process.env.MYSQL_USER
            password:"Communism42_", // process.env.MYSQL_PASSWORD
            database:"rice_projet_awi" // process.env.MYSQL_DATABASE
        })
    }
    return connectionPool;
}
*/
function getConnection() {
    if(!connectionPool){
        connectionPool = mysql.createPool({
            conectionLimit:10,
            host:process.env.MYSQL_HOST,
            user:process.env.MYSQL_USER,
            password:process.env.MYSQL_PASSWORD,
            database:process.env.MYSQL_DATABASE
        })
    }
    return connectionPool;
}

exports.query = (request,callback) => {
    getConnection().query(request, (err,result) => {
        if(err) console.log(err);
        callback(result);
    });
}
