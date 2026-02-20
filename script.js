"use strict";

import { Game } from "./Game.js";

// starting the game
document.addEventListener("DOMContentLoaded", () => {
    let game = new Game();

    document.getElementById("startButton").addEventListener("click", () => {
        game.handleNameInput();
    });
});

