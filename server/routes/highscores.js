const express = require('express');
const router = express.Router();
const highscores = require('../services/highscores.js');

 /* ----------------------------- GET highscores. ---------------------------- */
router.get('/', async function(req, res, next) {
  console.log("Hit that Get route")
  try {
    res.json(await highscores.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting highscores `, err.message);
    next(err);
  }
});
/* ----------------------------- POST highscore ---------------------------- */
router.post('/', async function(req, res, next){
  console.log("Hit that post route")
  try {
    res.json(await highscores.addNew(req.body));
  } catch (err) {
    console.log("Erros as suspected")
    console.error(`Error`, err.message);
    next(err);
  }
})


module.exports = router;