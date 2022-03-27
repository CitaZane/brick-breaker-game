export default class Sound {
    constructor(effects, background) {
        this.list = effects;
        this.background = background;
        this.initSounds();
        this.initBackground();
        this.soundVolume = 0.5; //0-1
        this.backgroundVolume = 0.3; //0-1
        // this.createSlider();
    }
    initSounds() {
        Object.keys(this.list).forEach(name => {
            let src = `./sounds/${name}.wav`;
            this.list[name].src = src;
            this.list[name].volume = this.soundVolume;
        });
    }
        initBackground() {
        this.background.src = "./sounds/background.wav"
        this.background.volume = this.backgroundVolume;
        this.background.loop = true;
        this.background.autoplay = true;
        this.background.muted = true;
    }

    changeSoundVolume(volume) {
        Object.keys(this.list).forEach(name => {
            this.list[name].volume = volume;
        });
    }
    changeBackgroundVolume(volume) {
        this.background.volume = volume;
    }


    /* --------------------- temp function for sound slider --------------------- */
    // createSlider() {
    //     let container = document.createElement("div");
    //     container.setAttribute("class", "soundContainer")

    //     // slider
    //     let slider = document.createElement('input');
    //     slider.setAttribute("type", "range");
    //     slider.setAttribute("min", "0")
    //     slider.setAttribute("max", "1")
    //     slider.setAttribute("step", "0.1")
    //     slider.setAttribute("value", "1")
    //     slider.setAttribute("class", "soundSlider")
    //     slider.setAttribute("id", "soundSlider")

    //     container.appendChild(slider)
    //     gameContainer.appendChild(container)

    //     slider.addEventListener("mouseup", this.changeVolume)

    // }
}