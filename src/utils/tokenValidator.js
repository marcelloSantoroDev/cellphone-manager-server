const jwt = require('jsonwebtoken');
const existingUserCheck = require('./existingUserCheck');

const secret = process.env.JWT_SECRET;

const tokenValidator = async (token) => {

    if (!token) {
        return { type: "TOKEN_NOT_FOUND", message: 'Token not found' };
    }

    try {
        const { data } = jwt.verify(token, secret);
        const {type} = await existingUserCheck(data)

        if (type) {
            return { type: 'EXPIRED_INVALID', message: 'Expired or invalid token' };
        }

        return { type: null, message: '' };

    } catch (error) {
        return { type: 'EXPIRED_INVALID', message: 'Expired or invalid token' };
    }
};

module.exports = tokenValidator;