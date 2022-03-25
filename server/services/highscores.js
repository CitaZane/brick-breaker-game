const db = require('./db.js');
const helper = require('../helper.js');
const config = require('../config.js');

/* --------------------- geting multiple results from db -------------------- */
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT name, score 
    FROM highscores LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
/* ------------------------- insert new score in db ------------------------- */
async function addNew(highscore){
    const result = await db.query(
        `INSERT INTO highscores(name, score) VALUES ('${highscore.name}', ${highscore.score})`
    )
    let message = 'Error in adding new highscore';

    if (result.affectedRows) {
    message = 'High score addedsuccessfully';
    return {message};
  }
}

module.exports = {
  getMultiple,
  addNew
}
/* ----------------------- query for creating siple db table ---------------------- */
/*
Create table for highscores
function createTable(){
    let query = 'CREATE TABLE highscores(id int not null auto_increment primary key, name varchar(255), score int)';
    db.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
    });
}
*/