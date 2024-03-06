const { emailSchema } = require('./schemas')

const validateEmail = (email) => {
    const { error } = emailSchema.validate(email);

    if (error) {
        return { type: 'INVALID_EMAIL', message: 'Invalid fields' };
    }

    return { type: null, message: '' };
};

module.exports = validateEmail;