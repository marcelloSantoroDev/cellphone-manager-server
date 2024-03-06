const bcrypt = require('bcrypt');

const validatePassword = (password, user) => {
const {password: userPassword} = user;
    const passwordValid = bcrypt.compareSync(password, userPassword);

    if (!passwordValid) {
        return { type: 'INVALID_PASSWORD', message: 'Invalid fields' };
    }
    
    return { type: null, message: '' };
}

module.exports = validatePassword;