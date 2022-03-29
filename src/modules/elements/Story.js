export default class Story{
    constructor(list){
        this.list = list;
        this.current = 0;
        this.active = true; //Is story mode active or finished
    }
    show(){
        document.querySelector(".storyContainer").classList.remove("hide");
        this.type(0);
    }
    next(){
        sounds.list.confirm.play();
        if(this.current == this.list.length-1){
            this.active = false;
            this.hide();
            return
        }
        this.current++
        this.type(this.current)
    }
    hide(){
        document.querySelector(".storyContainer").classList.add("hide")
    }

    currentFinished(){
        if(document.querySelector("#storyText").innerHTML.length == this.list[this.current].length){
            return true
        }
        return false
    }
 /* ------------------- typewriting kind of thing for story ------------------ */
    type(storyCount){
        let timerId
        let fastForward = false;
        let charPos = 7;//Offset for not typing out character name
        let speed = 40; //controll the typing speed
        let msg = this.list[storyCount];
        let msgBuffer= msg.slice(0, charPos);
        let textBox =  document.querySelector("#storyText");
        sounds.list.type.play()
        function startTyping(){
            /* ------------------ detect if player wants to fastForward ----------------- */
            if(keysPressed.wasPressed(" ")){
                sounds.list.type.pause()
                fastForward=true
                keysPressed.clear();
            }
            if(fastForward){
                textBox.innerHTML = msg;
                clearTimeout(timerId);
                return
            }else if(charPos <=msg.length){
            /* ------------------------ type character one by one ----------------------- */
                msgBuffer = msgBuffer + msg.charAt(charPos);
                textBox.innerHTML = msgBuffer+ "_";
                charPos++;
                timerId=setTimeout(startTyping, speed)
            }else{
                textBox.innerHTML = msg;
                sounds.list.type.pause()
            }
            
        }
        startTyping();

    }
}
