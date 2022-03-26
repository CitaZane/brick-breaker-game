import {GAME_CONTAINER, URL} from "../Constants.js";
import {getHtml, removeChildElements} from "../utils.js";

export default class HighscoreState {
    constructor(){
        this.page = 1;
    }
    enter() {
        /* ----------------------- fetch data and create table ---------------------- */
        fetch(`${URL}/highscores`)
        .then((res)=>res.json())
        .then((data)=> this.generateTable(data))

    }
    update() {
        if (keysPressed.wasPressed("Escape")) {
            stateMachine.change("menu");
        }
        if(keysPressed.wasPressed("ArrowRight")){
            keysPressed.clear();
            this.page++
            fetch(`${URL}/highscores?page=${this.page}`)
            .then((res)=>res.json())
            .then((data)=>{
                if(data.data.length>0){
                    this.clearTable();
                    console.log(data.data)
                    this.generateTable(data)
                }else{
                   this.page-- 
                };
            })
        }
        if(keysPressed.wasPressed("ArrowLeft")){
            keysPressed.clear();
            if(this.page>1){
                this.page--
                fetch(`${URL}/highscores?page=${this.page}`)
                .then((res)=>res.json())
                .then((data)=>{
                    if(data.data.length>0){
                        this.clearTable();
                        this.generateTable(data);
                    } 
                })
            }
        }
    }
    exit() {
        // clear leaderboard
        removeChildElements(["highscoreContainer"])
        keysPressed.clear();
    }
    /* ---------------------------- helper functions ---------------------------- */
    generateTable(inp){
        getHtml("./configs/highscore.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=>{
                const table = document.getElementById("scoreTableBody");
                this.container = document.querySelector(".highscoreContainer")
                let counter = 1
                inp.data.forEach(player => {
                    let row = document.createElement("tr");
                    let place = document.createElement("td");
                    place.innerHTML = (inp.meta.page - 1) *10 + counter;
                    counter++;
                    let name = document.createElement("td");
                    name.innerHTML = player.name;
                    let score = document.createElement("td");
                    score.innerHTML = player.score;
                    row.appendChild(place);
                    row.appendChild(name);
                    row.appendChild(score);
                    table.appendChild(row)
                });
            })

    }
    clearTable(){
        removeChildElements(["highscoreContainer"])
    }
} 