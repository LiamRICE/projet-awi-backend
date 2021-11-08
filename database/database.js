var mysql = require('mysql');

exports.connect = (done) => {
    done(null);
}

var connectionPool = null;

function getConnection() {
    if(!connectionPool){
        connectionPool = mysql.createPool({
            conectionLimit:10,
            host:"mysql-rice.alwaysdata.net",
            user:"rice",
            password:"Communism42_",
            database:"rice_projet_awi"
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
