export default class Sound {
    constructor(list) {
        this.list = list;
        this.addSRC();
        // this.volume = 1; //0-1
        this.createSlider();
    }
    addSRC() {
        Object.keys(this.list).forEach(name => {
            let src = `./sounds/${name}.wav`;
            this.list[name].src = src;
        });
    }

    changeVolume() {
        let volume = document.getElementById("soundSlider").value;
        let sound = window.sounds
        Object.keys(sound.list).forEach(name => {
            sound.list[name].volume = volume;
        });
    }


    /* --------------------- temp function for sound slider --------------------- */
    createSlider() {
        let container = document.createElement("div");
        container.setAttribute("class", "soundContainer")

        // slider
        let slider = document.createElement('input');
        slider.setAttribute("type", "range");
        slider.setAttribute("min", "0")
        slider.setAttribute("max", "1")
        slider.setAttribute("step", "0.1")
        slider.setAttribute("value", "1")
        slider.setAttribute("class", "soundSlider")
        slider.setAttribute("id", "soundSlider")

        container.appendChild(slider)
        gameContainer.appendChild(container)

        slider.addEventListener("mouseup", this.changeVolume)

    }
}