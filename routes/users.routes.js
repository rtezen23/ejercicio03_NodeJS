const express = require('express');

// Controllers
const {
	createUser,
	login,
	updateUser,
	deleteUser,
	getActiveUsers,
} = require('../controllers/users.controller.js');

// Middlewares
/* const {
	createUserValidators,
} = require('../middlewares/validators.middleware'); */
const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', /* createUserValidators, */ createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter
	.use('/:id', userExists)
	.route('/:id')
	.patch(protectUserAccount, updateUser)
	.delete(protectUserAccount, deleteUser);

usersRouter.get('/', getActiveUsers);

module.exports = { usersRouter };
