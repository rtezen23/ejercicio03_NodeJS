const express = require('express');

// Controllers
const {
    createGame,
    getAllGames,
    updateGame,
    deleteGame,
    createGameReview,
} = require('../controllers/games.controller');

const { gameExists } = require('../middlewares/games.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter
    .route('/')
    .post(protectSession, createGame)
    .get(getAllGames);

gamesRouter.post('/reviews/:gameId', protectSession, createGameReview);

gamesRouter
    .use('/:id', gameExists)
    .use('/:id', protectSession)
    .route('/:id')
    .patch(updateGame)
    .delete(deleteGame);


module.exports = { gamesRouter };
