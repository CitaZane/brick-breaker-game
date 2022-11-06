# Brick-breaker game / WIP

Simple single player game based on rules/ funcionality of such arcade games as - "Arkanoid" and "Breakout". Created as a project for learning new tools, languages and concepts.

You can try to check it out [here](https://agile-waters-68855.herokuapp.com/) 
Unfortunately highscores are broken, so enjoy what you can and please ignore the rest!

## Description

The projcets theme goes like this ->
"THE YOUNG ASPIRING PIRATE IS HEADING OUT TO HIS VERY FIRST TARGET - THE CITY OF SILLAMAE (located near the Gulf of Finland, Estonia).
FROM TALES AS OLD AS THE TIME, HE HEARD THAT PIRATES ARE SUPPOSED TO TAKE ADVANTAGE
OF THE PROPERTY OF THE FELLOW CITIZENS OF THIS WORLD. THE YOUNG PIRATE IS PLANNING TO
TAKE OVER THIS CITY, BUT THERE SEEM TO BE SOME OBSTACLES IN THE WAY."

The game is created to be simply enjoyed.

- Player can move around in the game using arrows / space/ esc keys.
- For full screen mode press `f11`

## Getting Started

### Dependencies

- node.js
- npm
- express
<!-- - sqlite3 -->
- body-parser

### Installing

- Navigate to the project folder and install required packages

```
npm install
```

### Executing program

- Start the server

```
npm run start
```

- Open the browser -> `localhost:3000`

## Author

CitaZane

## Acknowledgments

- [Audio resources](https://www.freesfx.co.uk/Default.aspx)
- [Dynamic typing for story](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_typewriter)
- [Awesome pixelart - self created](https://www.behance.net/zanekrmia)
- [Bitmasking to autotile bricks](https://gamedevelopment.tutsplus.com/tutorials/how-to-use-tile-bitmasking-to-auto-tile-your-level-layouts--cms-25673)
- [Great course about Break-Out game from CS50 / Introduction to Game Development](https://www.youtube.com/watch?v=F86edI_EF3s&t=5993s)
- [sqlite and node.js communication](https://www.scriptol.com/sql/sqlite-async-await.php)

## What I learned

- JS language -> concept of classes and modules, DOM manipulation
- node.js / express -> starting a simple server and creating endpoints
- Using JSON -> storing level blueprints and fetching them.
<!-- - SQLITE/SQL -> creating a database and comunication. Basic queries. -->
- Using/creating tilesets.
- Concept of sprite sheets.
- Concept of State Machine in gaming.
- Manipulation of DOM.
- Adding sound to website.
- Improved artistic capability "hopefully"

## To be improved

- Make brick and ball colision more responsive on corners
- Make ball / paddle collision more precise on corners
- Show players place in leaderboard
- Autofill players name after first game
- Create typewriting stop on pause menu
- Make powerup stacking more smooth
- For simple deploy for score handling used GET request. Should use POST
