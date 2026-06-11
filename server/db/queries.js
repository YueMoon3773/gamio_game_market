const pool = require('./pool');
require('dotenv').config();

const checkHealth = async () => {
    await pool.query('SELECT 1;');
};

const getUserByUserName = async (userName) => {
    const { rows } = await pool.query(
        `
        SELECT * FROM users WHERE user_name = $1;
    `,
        [userName],
    );

    return rows[0];
};

const getUserById = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT * FROM users WHERE id = $1;
    `,
        [userId],
    );

    return rows[0];
};

const insertNewUser = async (userName, avatarColor, pwd) => {
    await pool.query(
        `
        INSERT INTO users (user_name, avatar_color, password) VALUES
            ($1, $2, $3);
    `,
        [userName, avatarColor, pwd],
    );
};

const checkIsGameInUserCart = async (userId, gameId) => {
    const { rows } = await pool.query(
        `
        SELECT * FROM user_game_cart WHERE
            user_id = $1 AND
            game_id = $2;
    `,
        [userId, gameId],
    );

    return rows[0];
};

const insertGameIntoUserCart = async (userId, gameId, gameName, gameImg, gamePrice) => {
    await pool.query(
        `
        INSERT INTO user_game_cart (user_id, game_id, game_name, game_img, game_price) VALUES
            ($1, $2, $3, $4, $5);
    `,
        [userId, gameId, gameName, gameImg, gamePrice],
    );
};

const removeGameFromUserCartByGameId = async (userId, gameId) => {
    await pool.query(
        `
        DELETE FROM user_game_cart
            WHERE user_id = $1 AND
                game_id = $2;
    `,
        [userId, gameId],
    );
};

const getAllGameIdsInUserCartByUserId = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT ARRAY_AGG(game_id ORDER BY game_id) AS game_list 
        FROM user_game_cart
            WHERE user_id = $1;
    `,
        [userId],
    );

    return rows[0];
};

const getAllGamesInUserCartByUserId = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT game_id, game_name, game_img, game_price
        FROM user_game_cart
            WHERE user_id = $1;
    `,
        [userId],
    );

    return rows;
};

const deleteAllGamesInUserCartByUserId = async (userId) => {
    await pool.query(
        `
        DELETE FROM user_game_cart
            WHERE user_id = $1;
    `,
        [userId],
    );
};

const checkIsUserFavGame = async (userId, gameId) => {
    const { rows } = await pool.query(
        `
        SELECT * FROM user_game_fav WHERE
            user_id = $1 AND
            game_id = $2;
    `,
        [userId, gameId],
    );

    return rows[0];
};

const getAllUserFavGameIdsByUserId = async (userId) => {
    const { rows } = await pool.query(
        `
        SELECT ARRAY_AGG(game_id ORDER BY game_id) AS game_list 
        FROM user_game_fav
            WHERE user_id = $1;
    `,
        [userId],
    );

    return rows[0];
};

const insertUserFavGame = async (userId, gameId) => {
    await pool.query(
        `
        INSERT INTO user_game_fav (user_id, game_id) VALUES
            ($1, $2);
    `,
        [userId, gameId],
    );
};

const removeUserFavGameByGameId = async (userId, gameId) => {
    await pool.query(
        `
        DELETE FROM user_game_fav
            WHERE user_id = $1 AND
                game_id = $2;
    `,
        [userId, gameId],
    );
};

module.exports = {
    checkHealth,
    getUserByUserName,
    getUserById,
    insertNewUser,
    checkIsGameInUserCart,
    insertGameIntoUserCart,
    removeGameFromUserCartByGameId,
    getAllGameIdsInUserCartByUserId,
    getAllGamesInUserCartByUserId,
    deleteAllGamesInUserCartByUserId,
    checkIsUserFavGame,
    getAllUserFavGameIdsByUserId,
    insertUserFavGame,
    removeUserFavGameByGameId,
};
