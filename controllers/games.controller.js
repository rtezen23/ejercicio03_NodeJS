// Models
const { Game } = require('../models/game.model');
const { Console } = require('../models/console.model');
const { Review } = require('../models/review.model');

const { catchAsync } = require('../utils/catchAsync.util');

const createGame = catchAsync(async (req, res, next) => {
    const { title, genre } = req.body;

    const newGame = await Game.create({
        title,
        genre,
    });

    res.status(201).json({
        status: 'success',
        newGame,
    });
});

const getAllGames = catchAsync(async (req, res, next) => {

    const games = await Game.findAll({
        include: [
            { model: Console },
            { model: Review },
        ],
    });

    res.status(200).json({
        status: 'success',
        games,
    });
});

const updateGame = catchAsync(async (req, res, next) => {
    const { game } = req;
    const { title } = req.body;

    await game.update({ title });

    res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
    const { game } = req;

    await game.update({ status: 'inactive' });

    res.status(204).json({ status: 'success' });
});

const createGameReview = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { gameId } = req.params;
    const { comment } = req.body;

    console.log(gameId);

    const newReview = await Review.create({
        userId: sessionUser.id,
        gameId: gameId,
        comment
    })

    res.status(201).json({
        status: 'success',
        newReview
    });

});

module.exports = {
    createGame,
    getAllGames,
    updateGame,
    deleteGame,
    createGameReview,
};
