import { Action } from "./Action.js";

export class SpecialAction extends Action {
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