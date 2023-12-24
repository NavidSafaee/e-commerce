const validator = require('../utils/validator');
const {
    getMe,
    changePersonalInfo,
    getCustomersCount,
    getUsers
} = require('../services/userService');

const { signup } = require('../services/authService');

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
        const response = await changePersonalInfo(req.userId, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetCustomersCount(req, res, next) {
    try {
        const response = await getCustomersCount();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetUsers(req, res, next) {
    try {
        validator(req);
        const role = req.query.role;
        const response = await getUsers(role);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


async function httpSignupUser(req, res, next) {
    try {
        validator(req);
        const response = await signup(req);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpGetMe,
    httpChangePersonalInfo,
    httpGetCustomersCount,
    httpGetUsers,
    httpSignupUser
}