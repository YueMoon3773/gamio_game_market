const express = require('express');

const gameController = require('../controller/gameController');

const gameRouter = express.Router();

gameRouter.post('/add-game', gameController.addGameToUserCartPost);
gameRouter.post('/remove-game', gameController.removeGameFromUserCartPost);
gameRouter.post('/check-if-game-in-cart', gameController.checkIfGameInUserCart);
gameRouter.get('/get-games-in-cart', gameController.getAllGamesInUserCart);

module.exports = gameRouter;
