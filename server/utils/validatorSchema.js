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

module.exports = { userNameValidatorSchema, passwordValidatorSchema };
