const { getUser } = require('../services/userService');

async function httpGetUser(req, res, next) {
    try {
        const result = await getUser(req.userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpGetUser
}