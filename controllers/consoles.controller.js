// Models
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');
const { GamesInConsole } = require('../models/gamesInConsole.model');

const { AppError } = require('../utils/appError.util');

const { catchAsync } = require('../utils/catchAsync.util');

const createConsole = catchAsync(async (req, res, next) => {
    const { name, company } = req.body;

    const newConsole = await Console.create({
        name,
        company,
    });

    res.status(201).json({
        status: 'success',
        newConsole,
    });
});

const getAllConsoles = catchAsync(async (req, res, next) => {
    const consoles = await Console.findAll({
        include: [
            { model: Game },
        ],
    });

    res.status(200).json({
        status: 'success',
        consoles,
    });
});

const updateConsole = catchAsync(async (req, res, next) => {
    const { console } = req;
    const { name } = req.body;

    await console.update({ name });

    res.status(204).json({ status: 'success' });
});

const deleteConsole = catchAsync(async (req, res, next) => {
    const { console } = req;

    await console.update({ status: 'inactive' });

    res.status(204).json({ status: 'success' });
});

const assignGameToConsole = catchAsync(async (req, res, next) => {
    const { gameId, consoleId } = req.body;

    const game = await Game.findOne({ where: { id: gameId } });
    const console = await Console.findOne({ where: { id: consoleId } });

    if (!console) return next(new AppError('Console not found', 404));
    if (!game) return next(new AppError('Game not found', 404));

    const gamesInConsole = await GamesInConsole.create({ gameId, consoleId });

    res.status(201).json({
        status: 'success',
        gamesInConsole,
    });
});

module.exports = {
    createConsole,
    getAllConsoles,
    updateConsole,
    deleteConsole,
    assignGameToConsole
};
