# Brick-breaker game / WIP

Simple single player game based on rules/ funcionality of such arcade games as - "Arkanoid" and "Breakout". Created as a project for learning new tools, languages and concepts.

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
- mysql2 (used to connect to local mysql database))
- body-parser

### Installing

- Navigate to the project folder and install required packages

```
npm install
```

- Navigate into server folder

```
cd server
```

### Executing program

- Start running the mysql database (connection to db still to be researched)
- Start the server

```
node server.js
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

## What I learned

- JS language -> concept of classes and modules, DOM manipulation
- node.js / express -> starting a simple server and creating endpoints
- Using JSON -> storing level blueprints and fetching them.
- MYSQL -> creating a database and comunication. Basic queries.
- Using/creating tilesets.
- Concept of sprite sheets.
- Concept of State Machine in gaming.
- Manipulation of DOM.
- Adding sound to website.
- Improved artistic capability "hopefully"

<!-- {
"level": 1,
"intro": ["first intro line", "second intro line"],
"bricks": {
"0": [
{ "x": 0, "y": 0, "w": 3, "h": 3 },
{ "x": 1, "y": 0, "w": 1, "h": 1 },
{ "x": 2, "y": 0, "w": 2, "h": 1 }
],
"1": [{ "x": 3, "y": 1, "w": 1, "h": 1 }],
"2": [{ "x": 4, "y": 0, "w": 3, "h": 3 }]
}
} -->
