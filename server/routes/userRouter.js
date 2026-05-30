const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.get('/authenticate/me', userController.userAuthenticateActiveSession);

module.exports = userRouter;
