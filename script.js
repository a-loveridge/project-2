"use strict";

import { Game } from "./Game.js";

// starting the game
document.addEventListener("DOMContentLoaded", () => {
    let game = new Game();
    game.startGame();
    game.createActions();
    game.setUpButtons();
});

