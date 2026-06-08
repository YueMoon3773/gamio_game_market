const { validationResult, matchedData, query } = require('express-validator');

const validatorSchema = require('../utils/validatorSchema');
const db = require('../db/queries');

const checkIsGameInUserCart = async (userId, gameId) => {
    try {
        const isExisted = (await db.checkIsGameInUserCart(userId, gameId)) ?? [];

        return isExisted.length <= 0 ? false : true;
    } catch (err) {
        console.log(err);
    }
};

const checkIfGameInUserCart = [
    validatorSchema.userIdValidatorSchema,
    validatorSchema.gameIdValidatorSchema,
    async (req, res, next) => {
        console.log("===CHECK IF GAME IS IN USER'S CART");

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const msg = errors.array().map((err) => err.msg);

            return res.status(401).json({ ok: false, msg });
        }

        const { userId, gameId } = matchedData(req);

        const userIdToDb = Number(userId);
        const gameIdToDb = Number(gameId);

        try {
            const isGameInUserCart = await checkIsGameInUserCart(userIdToDb, gameIdToDb);

            return res.status(200).json({ ok: true, msg: 'Game added to cart.' });
        } catch (err) {
            console.log(err);

            res.status(501).json({
                ok: false,
                err,
                msg: 'Unable to add game to cart right now. Please try again later.',
            });

            return next(err);
        }
    },
];

const getAllGamesInUserCart = async (req, res, next) => {
    console.log('===GET GAMES IN USER CART===');

    const { userId } = req.query;
    // console.log({ userId });

    try {
        const gameList = await db.getAllGamesInUserCartByUserId(userId);
        // console.log({ gameList });
        // console.log(gameList);

        return res
            .status(200)
            .json({ ok: true, msg: 'Games list retrieved.', gameList: gameList.game_list ? gameList.game_list : [] });
    } catch (err) {
        console.log(err);

        res.status(501).json({ ok: false, msg: 'Failed to retrieve game list.' });

        return next(err);
    }
};

const addGameToUserCartPost = [
    validatorSchema.userIdValidatorSchema,
    validatorSchema.gameIdValidatorSchema,
    validatorSchema.gameNameValidatorSchema,
    validatorSchema.gameImgValidatorSchema,
    validatorSchema.gamePriceValidatorSchema,
    async (req, res, next) => {
        console.log("===ADD GAME TO USER'S CART");

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const msg = errors.array().map((err) => err.msg);

            return res.status(401).json({ ok: false, msg });
        }

        const { userId, gameId, gameName, gameImg, gamePrice } = matchedData(req);

        const userIdToDb = Number(userId);
        const gameIdToDb = Number(gameId);
        const gamePriceToDb = Number(gamePrice).toFixed(2);

        // console.log(req.body.gameId);
        // console.log({ userId, gameId, gameName, gameImg, gamePrice });
        // console.log({ userIdToDb, gameIdToDb, gameName, gameImg, gamePriceToDb });

        try {
            const isGameInUserCart = await checkIsGameInUserCart(userIdToDb, gameIdToDb);

            if (isGameInUserCart === false) {
                await db.insertGameIntoUserCart(userIdToDb, gameIdToDb, gameName, gameImg, gamePriceToDb);

                return res.status(200).json({ ok: true, msg: 'Game added to cart.' });
            }

            return res.status(200).json({ ok: true, msg: "Game's already in cart." });
        } catch (err) {
            console.log(err);

            res.status(501).json({
                ok: false,
                err,
                msg: 'Unable to add game to cart right now. Please try again later.',
            });

            return next(err);
        }
    },
];

const removeGameFromUserCartPost = [
    validatorSchema.userIdValidatorSchema,
    validatorSchema.gameIdValidatorSchema,
    async (req, res, next) => {
        console.log("===REMOVE GAME FROM USER'S CART");

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const msg = errors.array().map((err) => err.msg);

            return res.status(401).json({ ok: false, msg });
        }

        const { userId, gameId } = matchedData(req);

        const userIdToDb = Number(userId);
        const gameIdToDb = Number(gameId);

        try {
            await db.removeGameFromUserCartByGameId(userIdToDb, gameIdToDb);

            return res.status(200).json({ ok: true, msg: 'Game removed from cart.' });
        } catch (err) {
            console.log(err);

            res.status(501).json({
                ok: false,
                err,
                msg: 'Unable to remove game from cart right now. Please try again later.',
            });

            return next(err);
        }
    },
];

module.exports = { addGameToUserCartPost, removeGameFromUserCartPost, checkIfGameInUserCart, getAllGamesInUserCart };
