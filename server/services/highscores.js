
const helper = require('../helper.js');
const listPerPage = 10;
let highscores = [] //hold {name:"myName", score:3}

/* --------------------- geting multiple results from db -------------------- */
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, listPerPage);
  const meta = {page};
  highscores.sort((a,b) => b.score -a.score)
  let data = highscores.slice(offset,offset+listPerPage)

  return {
    data,
    meta
  }
}
/* ------------------------- insert new score in db ------------------------- */
async function addNew(highscore){
  let data = {name:highscore.name, score:highscore.score}
  highscores.push(data)
}

module.exports = {
  getMultiple,
  addNew
}
