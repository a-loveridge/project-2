"use strict";

// pet class
class Pet {
    constructor(hunger, happiness, energy) {
        this.hunger = hunger;
        this.happiness = happiness;
        this.energy = energy;
    }

    // changing stat by identifying name (called later)
    changeStat(statName, amount) {
        if (statName == "hunger") {
            this.hunger += amount;
        } else if (statName == "happiness") {
            this.happiness += amount;
        } else if (statName == "energy") {
            this.energy += amount;
        }

        // i have to make sure that the stats do not go outside their range of 0 - 100
        // i did this using Math.Min/Math.Max (C# has similar concepts with Mathf) - https://www.geeksforgeeks.org/javascript/how-to-limit-a-number-between-a-min-max-value-in-javascript/
        this.hunger = Math.min(100, Math.max(0, this.hunger));
        this.happiness = Math.min(100, Math.max(0, this.happiness));
        this.energy = Math.min(100, Math.max(0, this.energy));

        this.updateDisplay();
    }

    // update text
    updateDisplay() {
        document.getElementById("hunger").textContent = this.hunger;
        document.getElementById("happiness").textContent = this.happiness;
        document.getElementById("energy").textContent = this.energy;
    }
}

// action class
class Action {
    constructor(action, effects, message) {
        this.action = action;
        this.effects = effects;
        this.message = message;
    }

    // do the action based on the button and return the message for player to see
    doAction(pet) {
        this.effects.forEach((effect) => {
            pet.changeStat(effect.stat, effect.amount);
        })

        return this.message;
    }
}

// special action (give a treat!)
class SpecialAction extends Action {
    constructor(action, effects, message, specialMessage) {
        super(action, effects, message);
        this.specialMessage = specialMessage;
    }

    // basically the same, but overrides by adding a special message to the end
    doAction(pet) {
        const baseMessage = super.doAction(pet);
        return baseMessage + " " + this.specialMessage;
    }
}

// game class - easier than initialising all of this outside
class Game {
    // establishing properties in constructor - edited in methods
    constructor() {
        this.pet = null;
        this.actions = [];
    }

    // create pet at start of game
    startGame() {
        this.pet = new Pet(50, 50, 50);
        this.pet.updateDisplay();
    }

    // create actions to call for the buttons
    createActions() {
        const feedPet = new Action(
            "Feed Pet", 
            [
                {stat: "hunger", amount: 30},
                {stat: "energy", amount: -5}
            ], 
            "Your pet enjoyed the meal!" 
        );
        this.actions.push(feedPet);

        const play = new Action(
            "Play With Pet", 
            [
                {stat: "happiness", amount: 25},
                {stat: "hunger", amount: -15},
                {stat: "energy", amount: -20}
            ], 
            "Your pet had a lot of fun!"
        );
        this.actions.push(play);

        const rest = new Action(
            "Let Pet Rest", 
            [
                {stat: "hunger", amount: -10},
                {stat: "energy", amount: 40}
            ], 
            "Your pet had a lot of fun!"
        );
        this.actions.push(rest);

        const treat = new SpecialAction(
            "Play With Pet", 
            [
                {stat: "happiness", amount: 30},
                {stat: "hunger", amount: 30},
                {stat: "energy", amount: 10}
            ], 
            "Special treat!",
            "Your pet loves it! And you of course..."
        );
        this.actions.push(treat);
    }

    // set up button events 
    setUpButtons() {
        const buttons = document.querySelectorAll(".action");

        // learned more about forEach methods from MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach (they are almost identical to C#/Python)
        // needed to access each individual button from all selected
        buttons.forEach((button, index) => {
            button.addEventListener("click", (evt) => {
                evt.preventDefault();
                this.handleAction(index, evt);
            })
        })
    }

    // handling each button click and printing to console for reference
    handleAction(actionIndex, evt) {
        const action = this.actions[actionIndex];
        const message = action.doAction(this.pet);

        const messageText = document.querySelector(".message");
        messageText.textContent = message;

        console.log("Button clicked:", evt.target.textContent);
    }
}

// starting the game
let game = new Game();
game.startGame();
game.createActions();
game.setUpButtons();

