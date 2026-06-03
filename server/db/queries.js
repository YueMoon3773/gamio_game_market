const pool = require('./pool');
require('dotenv').config();

const getAllData = async () => {
    const { rows } = await pool.query(`SELECT * FROM ${process.env.DB_TABLE_NAME}`);
    return rows;
};

const getDataByCondition = async (condition) => {
    const { rows } = await pool.query(`SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE id = $1`, [condition]);
    return rows;
};

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

const insertNewUser = async (userName, pwd) => {
    await pool.query(
        `
        INSERT INTO users (user_name, password) VALUES
            ($1, $2);
    `,
        [userName, pwd],
    );
};

// const isert

module.exports = { checkHealth, getAllData, getDataByCondition, getUserByUserName, getUserById, insertNewUser };
