const { validationResult, matchedData, body } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const db = require('../db/queries');

const validator = require('../utils/validatorSchema');

const userAuthenticateActiveSession = async (req, res) => {
    // console.log(req.user);

    if (req.user) {
        const { password, ...responseToUser } = req.user;
        return res.json({ user: responseToUser });
    } else {
        // return res.json({
        //     user: { id: 1, user_name: 'kafolan_ruy' },
        // });

        return res.status(401).json({ user: null });
    }
};

const logInPost = [
    validator.userNameValidatorSchema,
    validator.passwordValidatorSchema,
    async (req, res, next) => {
        console.log('===USER LOG IN===');

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const msg = errors.array().map((err) => err.msg);

            return res.status(401).json({ ok: false, msg });
        }

        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);

            if (!user) {
                console.log({ info });
                return res.json({ ok: false, msg: [{ msg: info.message }] });
            }

            req.login(user, (err) => {
                if (err) return next(err);

                console.log(`User logged in successfully.`);
                return res.json({ ok: true, user });
            });
        })(req, res, next);
    },
];

const logOutPost = async (req, res, next) => {
    console.log('===USER LOG OUT===');

    req.logout((err) => {
        if (err) return next(err);

        return res.json({ ok: true, msg: 'Logged out successfully.' });
    });
};

const signUpPost = [
    validator.userNameValidatorSchema,
    validator.passwordValidatorSchema,
    async (req, res, next) => {
        console.log('===USER SIGN UP===');

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const msg = errors.array().map((err) => err.msg);

            return res.json({ ok: false, msg });
        }

        const { userName, pwd } = matchedData(req);
        const avatarColor = req.body.avatarColor ? req.body.avatarColor : '';

        const checkIfUsernameAlreadyInDb = await db.getUserByUserName(userName);

        if (checkIfUsernameAlreadyInDb)
            return res
                .status(422)
                .json({ ok: false, msg: `User name "${userName}" was taken, please choose a different user name.` });

        const hashedPwd = await bcrypt.hash(pwd, 16);

        try {
            await db.insertNewUser(userName, avatarColor, hashedPwd);

            return res.status(201).json({ ok: true, msg: 'Account create successfully. Please log in to continue.' });
        } catch (err) {
            res.status(501).json({ ok: false, msg: 'Failed to create account. Please try again at another time.' });

            console.log('sign up failure: ', err);

            return next(err);
        }
    },
];

module.exports = {
    userAuthenticateActiveSession,
    logInPost,
    logOutPost,
    signUpPost,
};
