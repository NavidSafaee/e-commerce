const validator = require('../utils/validator');
const {
    getMe,
    changePersonalInfo,
} = require('../services/userService');

async function httpGetMe(req, res, next) {
    try {
        const result = await getMe(req.userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function httpChangePersonalInfo(req, res, next) {
    try {
        validator(req);
        await changePersonalInfo(req.userId, req.body);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    httpGetMe,
    httpChangePersonalInfo,
}