// State bouilerplate and manager
export default class StateMachine {

    constructor(states) {
        this.states = states;

        // F-n boilerplate
        this.empty = {
            update: function () { },
            enter: function () { },
            exit: function () { },
        };
        this.current = this.empty;
    }

    // Change state ->  
    //gracefull exit current and enter next state
    change(state, params) {
        this.current.exit();
        this.current = this.states[state];
        this.current.enter(params);
        this.update();
    }

    // Update current state ->Call update accordingly
    update(delta) {
        this.current.update(delta)
    }
}

/*
state boilerplate

export default class GameState {
    enter() {}
    update() {}
    exit() {}
} 
*/