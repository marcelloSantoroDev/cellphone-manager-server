const existingUserCheck = require("../utils/existingUserCheck");
const validateEmail = require("../utils/validateEmail");
const validatePassword = require("../utils/validatePassword");

const logUser = async ({email, password}) => {

    if (!email || !password) {
        return { type: 'INVALID_FIELDS', message: 'Some required fields are missing' };
    }

    if (password.length < 6) {
        return {
            type: 'INVALID_PASSWORD',
            message: '"password" length must be at least 6 characters long'
        };
    }
    
    const checkInvalidEmail = validateEmail(email);

    if (checkInvalidEmail.type) {
        return checkInvalidEmail;
    }

    const checkUser = await existingUserCheck(email);

    if (checkUser.type) {
        return checkUser;
    }

    const checkPassword = validatePassword(password, checkUser.message);

    if (checkPassword.type) {
        return checkPassword;
    }

    return { type: null, message: '' };
}

module.exports = { logUser };