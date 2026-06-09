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

const checkIsUserFavGame = async (userId, gameId) => {
    try {
        const isExisted = (await db.checkIsUserFavGame(userId, gameId)) ?? [];

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

const getAllGameIdsInUserCart = async (req, res, next) => {
    console.log('===GET GAMES IN USER CART===');

    const { userId } = req.query;
    // console.log({ userId });

    try {
        const gameList = await db.getAllGameIdsInUserCartByUserId(userId);
        // console.log({ gameList });
        // console.log(gameList);

        return res.status(200).json({
            ok: true,
            msg: 'Games in cart list retrieved.',
            gameList: gameList.game_list ? gameList.game_list : [],
        });
    } catch (err) {
        console.log(err);

        res.status(501).json({ ok: false, msg: 'Failed to retrieve game in cart list.' });

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

const getAllUserFavGameIds = async (req, res, next) => {
    console.log('===GET USER FAV GAMES===');

    const { userId } = req.query;
    // console.log({ userId });

    try {
        const gameList = await db.getAllUserFavGameIdsByUserId(userId);
        // console.log({ gameList });
        // console.log(gameList);

        return res.status(200).json({
            ok: true,
            msg: "User's fav games list retrieved.",
            gameList: gameList.game_list ? gameList.game_list : [],
        });
    } catch (err) {
        console.log(err);

        res.status(501).json({ ok: false, msg: "Failed to retrieve user's fav game list." });

        return next(err);
    }
};

const addUserFavGamePost = [
    validatorSchema.userIdValidatorSchema,
    validatorSchema.gameIdValidatorSchema,
    async (req, res, next) => {
        console.log("===ADD USER'S FAV GAME");

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const msg = errors.array().map((err) => err.msg);

            return res.status(401).json({ ok: false, msg });
        }

        const { userId, gameId } = matchedData(req);

        const userIdToDb = Number(userId);
        const gameIdToDb = Number(gameId);

        // console.log(req.body.gameId);
        // console.log({ userId, gameId });
        // console.log({ userIdToDb, gameIdToDb });

        try {
            const isGameInUserCart = await checkIsUserFavGame(userIdToDb, gameIdToDb);

            if (isGameInUserCart === false) {
                await db.insertUserFavGame(userIdToDb, gameIdToDb);

                return res.status(200).json({ ok: true, msg: 'Favorite game added.' });
            }

            return res.status(200).json({ ok: true, msg: "Game's already in favorite list." });
        } catch (err) {
            console.log(err);

            res.status(501).json({
                ok: false,
                err,
                msg: 'Unable to add favorite game right now. Please try again later.',
            });

            return next(err);
        }
    },
];

const removeUserFavGamePost = [
    validatorSchema.userIdValidatorSchema,
    validatorSchema.gameIdValidatorSchema,
    async (req, res, next) => {
        console.log("===REMOVE USER'S FAVORITE GAME");

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const msg = errors.array().map((err) => err.msg);

            return res.status(401).json({ ok: false, msg });
        }

        const { userId, gameId } = matchedData(req);

        const userIdToDb = Number(userId);
        const gameIdToDb = Number(gameId);

        try {
            await db.removeUserFavGameByGameId(userIdToDb, gameIdToDb);

            return res.status(200).json({ ok: true, msg: 'Favorite game removed.' });
        } catch (err) {
            console.log(err);

            res.status(501).json({
                ok: false,
                err,
                msg: 'Unable to remove this game from favorite right now. Please try again later.',
            });

            return next(err);
        }
    },
];

module.exports = {
    addGameToUserCartPost,
    removeGameFromUserCartPost,
    checkIfGameInUserCart,
    getAllGameIdsInUserCart,
    getAllUserFavGameIds,
    addUserFavGamePost,
    removeUserFavGamePost,
};
