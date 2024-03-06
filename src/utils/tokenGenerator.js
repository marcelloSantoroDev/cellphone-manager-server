const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const tokenGenerator = (user) => {
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return token;
};

module.exports = tokenGenerator;