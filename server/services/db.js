const sqlite3 = require('sqlite3').verbose();
let db
exports.db = db

exports.open=function(path) {
    return new Promise(function(resolve) {
    this.db = new sqlite3.Database(path, 
        function(err) {
            if(err) reject("Open error: "+ err.message)
            else    resolve(path + " opened")
        }
    )   
    })
}
/* --------------------- any query: insert/delete/update -------------------- */
exports.run=function(query) {
    return new Promise(function(resolve, reject) {
        this.db.run(query, 
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })    
}
 /* ---------------------------- set of rows read ---------------------------- */
exports.all=function(query, params) {
    return new Promise(function(resolve, reject) {
        if(params == undefined) params=[]

        this.db.all(query, params, function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(rows)
            }
        })
    }) 
}
/* ------------------------ close database connectio ------------------------ */
exports.close=function() {
    return new Promise(function(resolve, reject) {
        this.db.close()
        resolve(true)
    }) 
}
