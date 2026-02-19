export class Action {
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