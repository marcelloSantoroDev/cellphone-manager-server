const { userService } = require('../services');
const tokenGenerator = require('../utils/tokenGenerator');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const {type, message} = await userService.createUser({ name, email, password });

    if (type === 'INVALID_PASSWORD') return res.status(400).json(message);
    if (type === 'INVALID_EMAIL') return res.status(400).json(message);
    if (type === 'INVALID_NAME') return res.status(400).json(message);
    if (type === 'CONFLICT') return res.status(400).json(message);

    const token = tokenGenerator(email);

    res.status(201).json({ type: null, message: token });
}

module.exports = {
    createUser,
};