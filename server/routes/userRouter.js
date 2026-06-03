const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();

userRouter.get('/authenticate/me', userController.userAuthenticateActiveSession);
userRouter.post('/log-in', userController.logInPost);
userRouter.post('/log-out', userController.logOutPost);
userRouter.post('/sign-up', userController.signUpPost);

module.exports = userRouter;
