const { getMe } = require('../services/userService');

async function httpGetMe(req, res, next) {
    try {
        const result = await getMe(req.userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpGetMe
}