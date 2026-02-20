import { Pet } from "./Pet.js";
import { Action } from "./Action.js";
import { SpecialAction } from "./SpecialAction.js";

export class Game {
    // establishing properties in constructor - edited in methods
    constructor() {
        this.pet = null;
        this.actions = [];
    }

    // error exception addition: pet name
    handleNameInput() {
        const input = document.getElementById("petName");
        const errorText = document.querySelector(".error");

        try {
            const name = input.value.trim();

            if (name === "") {
                throw new Error("Error: Your pet must have a name!");
            }
            if (name.length > 15) {
                throw new Error("Error: Your pet's name can't be more than 15 characters");
            }
            if (!/^[a-zA-Z]+$/.test(name)) {
                throw new Error("Error: Your pet's name can only contain letters")
            }

            document.getElementById("displayName").textContent = name;
            this.petName = name;
            document.getElementById("nameSetup").style.display = "none";
            document.getElementById("gameArea").style.display = "block";

            this.startGame();
            this.createActions();
            this.setUpButtons();
        }
        catch (e) {
            errorText.textContent = e.message;
            console.log("There is an error with the name you chose. Check the website!");
        }
    }

    // create pet at start of game
    startGame() {
        this.pet = new Pet(50, 50, 50);
        this.pet.updateDisplay();
        document.querySelector(".message").textContent = `Take care of ${this.petName}!`;
    }

    // create actions to call for the buttons
    createActions() {
        const feedPet = new Action(
            "Feed Pet", 
            [
                {stat: "hunger", amount: 30},
                {stat: "energy", amount: -5}
            ], 
            `${this.petName} enjoyed the meal!`
        );
        this.actions.push(feedPet);

        const play = new Action(
            "Play With Pet", 
            [
                {stat: "happiness", amount: 25},
                {stat: "hunger", amount: -15},
                {stat: "energy", amount: -20}
            ], 
            `${this.petName} had a lot of fun!`
        );
        this.actions.push(play);

        const rest = new Action(
            "Let Pet Rest", 
            [
                {stat: "hunger", amount: -10},
                {stat: "energy", amount: 40}
            ], 
            `${this.petName} had a great nap!`
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
            `${this.petName} loves it! And you of course...`
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