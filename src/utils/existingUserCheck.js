const { users } = require('../models');

const existingUserCheck = async (email) => {
    const user = await users.findOne({ where: { email } });

    if (!user) {
        return { type: 'USER_NOT_FOUND', message: 'User not found' };
    }

    return { type: null, message: user };
};

module.exports = existingUserCheck;