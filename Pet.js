export class Pet {
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