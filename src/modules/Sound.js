export default class Sound {
    constructor(effects, background) {
        this.list = effects;
        this.background = background;
        this.soundVolume = 0.2; //0-1
        this.backgroundVolume = 0.1; //0-1
        this.initSounds();
        this.initBackground();
        this.activated = false;
    }
    activate(){
        this.activated = true;
        this.background.play();
    }
    initSounds() {
        Object.keys(this.list).forEach(name => {
            let src = `./sounds/${name}.wav`;
            this.list[name].src = src;
            this.list[name].volume = this.soundVolume;
        });
        this.list["type"].loop = true;
    }
    initBackground() {
    this.background.src = "./sounds/background.wav"
    this.background.volume = this.backgroundVolume;
    this.background.loop = true;
    }
    increaseSoundVol(){
        this.soundVolume = Math.min(this.soundVolume + 0.1, 1);
        Object.keys(this.list).forEach(name => {
            this.list[name].volume = this.soundVolume;
        });
        this.setSoundVol();
    }
    decreaseSoundVol(){
        this.soundVolume = Math.max(this.soundVolume-0.1, 0)
        Object.keys(this.list).forEach(name => {
            this.list[name].volume = this.soundVolume;
        });
        this.setSoundVol();
    }
    increaseBackgroundVol(){
        this.backgroundVolume = Math.min(this.backgroundVolume + 0.1, 1);
        this.background.volume = this.backgroundVolume;
        this.setBackgroundVol();
    }
    decreaseBackgroundVol(){
        this.backgroundVolume = Math.max(this.backgroundVolume-0.1, 0)
        this.background.volume = this.backgroundVolume;
        this.setBackgroundVol();
    }
    setSoundVol(){
        document.querySelector("#soundVolume").innerHTML = Math.round(this.soundVolume * 10)
    }
    setBackgroundVol(){
        document.querySelector("#backgroundVolume").innerHTML = Math.round(this.backgroundVolume * 10)
    }
    renderVolume(){
       this.setBackgroundVol();
       this.setSoundVol(); 
    }
}