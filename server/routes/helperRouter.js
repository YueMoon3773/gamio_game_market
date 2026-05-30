const express = require('express');
const helperController = require('../controller/helperController');
const helperRouter = express.Router();

helperRouter.get('/check-health', helperController.checkHealth);

module.exports = helperRouter;
