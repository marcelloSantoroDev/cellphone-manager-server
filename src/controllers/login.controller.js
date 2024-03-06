const { loginService } = require('../services');
const tokenGenerator  = require('../utils/tokenGenerator');

const logUser = async (req, res) => {
    const { email, password } = req.body;
    const { type, message } = await loginService.logUser({ email, password });

    if (type) {
        return res.status(400).json(message);
    }

    const token = tokenGenerator(email);

    return res.status(200).json({ type: null, message: token });

};

module.exports = {
    logUser,
};