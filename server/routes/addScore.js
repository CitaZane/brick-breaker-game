const express = require('express');
const router = express.Router();
const highscores = require('../services/highscores.js');


 /* ----------------------------- GET highscores. ---------------------------- */
router.get('/', async function(req, res, next) {
  try {
    let highscore = {name: req.query.name, score:req.query.score}
    res.json(await highscores.addNew(highscore));
  } catch (err) {
    console.error(`Error while saving highscores `, err.message);
    next(err);
  }
});


module.exports = router;