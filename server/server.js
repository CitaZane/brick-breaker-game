/* ---------------- main entery point for starting the server --------------- */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const highscoresRouter = require("./routes/highscores.js");

/* ------------------ "use" works as middleware. as a stack ----------------- */
app.use(express.json()); //This method is used to parse the incoming requests with JSON.
app.use(bodyParser.urlencoded({extended:true})); // for accessing req.body

app.use(express.static('../src')); // sering our main src folder for game
app.use('/highscores', highscoresRouter); // route for accessing highscore information

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

 app.listen(PORT, () => {
    console.log(`Game server is listening on port ${PORT}`)
});


// Rescource - > https://blog.logrocket.com/build-rest-api-node-express-mysql/