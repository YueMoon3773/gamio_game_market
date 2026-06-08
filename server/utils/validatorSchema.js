const { body, query } = require('express-validator');

const userNameMinLength = 3;
const userNameMaxLength = 16;
const passwordMinLength = 8;
const passwordMaxLength = 32;

const userNameValidatorSchema = [
    body('userName')
        .notEmpty()
        .withMessage('User name must be filled.')
        .trim()
        .isLength({ min: userNameMinLength, max: userNameMaxLength })
        .withMessage(`User name must be between ${userNameMinLength} and ${userNameMaxLength} characters.`),
];

const passwordValidatorSchema = [
    body('pwd')
        .notEmpty()
        .withMessage('Password must be filled.')
        .trim()
        .isLength({ min: passwordMinLength, max: passwordMaxLength })
        .withMessage(`Password must be between ${passwordMinLength} and ${passwordMaxLength} characters.`)
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[,.?\/!@#$%^&*\-_=+])[a-zA-Z0-9,.?\/!@#$%^&*\-_=+]+$/)
        .withMessage(
            'Passwrod must contains at least one uppercase, one lowercase, one number, and one symbol (,.?/!@#$%^&*-_=+).',
        ),
];

const userIdValidatorSchema = [
    body('userId').isInt({ min: 1 }).withMessage("User's id must be a decimal and is at least 1."),
];

const gameIdValidatorSchema = [body('gameId').isInt().withMessage("Game's id must be a decimal.")];

const gameNameValidatorSchema = [
    body('gameName').optional({ values: 'falsy' }).trim().notEmpty().withMessage('Game name must be provided.'),
];

const gameImgValidatorSchema = [
    body('gameImg').optional({ values: 'falsy' }).trim().notEmpty().withMessage('Game img must be provided.'),
];

const gamePriceValidatorSchema = [
    body('gamePrice')
        .notEmpty()
        .withMessage('Game price must be provided.')
        .isFloat({ min: 5 })
        .withMessage("Minimum game's price is 5"),
];

module.exports = {
    userNameValidatorSchema,
    passwordValidatorSchema,
    userIdValidatorSchema,
    gameIdValidatorSchema,
    gameNameValidatorSchema,
    gameImgValidatorSchema,
    gamePriceValidatorSchema,
};
