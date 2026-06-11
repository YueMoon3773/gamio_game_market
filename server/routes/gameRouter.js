const express = require('express');

const gameController = require('../controller/gameController');

const gameRouter = express.Router();

gameRouter.post('/add-game-cart', gameController.addGameToUserCartPost);
gameRouter.post('/remove-game-cart', gameController.removeGameFromUserCartPost);
gameRouter.post('/check-if-game-in-cart', gameController.checkIfGameInUserCart);
gameRouter.get('/get-game-ids-in-cart', gameController.getAllGameIdsInUserCart);
gameRouter.get('/get-games-info-in-cart', gameController.getAllGamesInfoInUserCart);
gameRouter.post('/remove-all-games-in-cart', gameController.removeAllGamesFromUserCart);

gameRouter.post('/add-game-fav', gameController.addUserFavGamePost);
gameRouter.post('/remove-game-fav', gameController.removeUserFavGamePost);
gameRouter.get('/get-fav-game-ids', gameController.getAllUserFavGameIds);

module.exports = gameRouter;
