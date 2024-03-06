const { authService } = require('../services')

const authUser = async (req, res) => {
    const token = req.header('Authorization');
    const { type } = await authService.authUser(token);

    if(!type) return res.status(200).json({ type: 'VALID_TOKEN', message: 'Valid Token' });

    return res.status(200).json({ type: 'INVALID_TOKEN', message: 'Invalid Token' });
}

module.exports = { authUser };