const tokenValidator = require('../utils/tokenValidator');

const authUser = async (token) => {
    const { type } = await tokenValidator(token);

    if(!type) {
        return { type: null, message: '' }
    }

    return { type: 'INVALID', message: 'Invalid token' }
}

module.exports = { authUser };