const db = require('./db.js');
const helper = require('../helper.js');
const listPerPage = 10;

/* --------------------- geting multiple results from db -------------------- */
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, listPerPage);
  let data= []
  const meta = {page};
  await db.open('../game.db')
  let sql = `SELECT name, score 
      FROM highscores 
      ORDER BY score DESC
      LIMIT ${offset},${listPerPage}`
    let result = await db.all(sql, []);
    result.forEach(function(row) {
        let res = {name:row.name, score: row.score}
        data.push(res)   
    })
    db.close();
  return {
    data,
    meta
  }
}
/* ------------------------- insert new score in db ------------------------- */
async function addNew(highscore){
  let sql = `INSERT INTO highscores(name, score) VALUES ('${highscore.name}', ${highscore.score})`
  await db.open('../game.db')
  let result = await db.run(sql)
  if(result) console.log("New Score added to leaderboard");
  db.close();
}

module.exports = {
  getMultiple,
  addNew
}
