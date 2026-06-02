const { validationResult, matchedData, body } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const db = require('../db/queries');

const userAuthenticateActiveSession = async (req, res) => {
    // console.log(req.user);

    if (req.user) {
        const { password, ...responseToUser } = req.user;
        return res.json({ user: responseToUser });
    } else {
        return res.json({
            user: { id: 1, user_name: 'kafolan_ruy' },
        });

        // return res.status(401).json({ user: null });
    }
};

module.exports = {
    userAuthenticateActiveSession,
};
