const express = require('express');

// Controllers
const {
    createConsole,
    getAllConsoles,
    updateConsole,
    deleteConsole,
    assignGameToConsole
} = require('../controllers/consoles.controller');

const { consoleExists } = require('../middlewares/consoles.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const consolesRouter = express.Router();

consolesRouter.post('/assign-game', assignGameToConsole);

consolesRouter
    .route('/')
    .post(protectSession, createConsole)
    .get(getAllConsoles);

consolesRouter
    .use('/:id', consoleExists)
    .use('/:id', protectSession)
    .route('/:id')
    .patch(updateConsole)
    .delete(deleteConsole);

module.exports = { consolesRouter };
