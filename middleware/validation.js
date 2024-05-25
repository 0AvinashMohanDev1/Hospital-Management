const { check, validationResult } = require('express-validator');

const validationRules = () => {
    return [
        check('name').notEmpty().withMessage('Name is required'),
        check('address').isLength({ min: 10 }).withMessage('Address should be at least 10 characters'),
        check('email').isEmail().withMessage('Email should be valid'),
        check('phone_number').matches(/^\+[1-9]{1}[0-9]{3,14}$/).withMessage('Phone number should be valid with country code'),
        check('password').isLength({ min: 8, max: 15 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/).withMessage('Password should contain one upper character, one lower character, and a number. Max length 15 and min length 8'),
        check('photo').notEmpty().withMessage('Photo is required')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

module.exports = {
    validationRules,
    validate
};
