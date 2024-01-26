const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

function errorHandler(error, req, res, next) {
    error.statusCode = error.statusCode || 500;
    // if (error instanceof mongoose.Error.CastError) {
    //     error.statusCode = 400;
    //     error.message = 'invalid objectId';
    // }

    if (error instanceof jwt.JsonWebTokenError) {
        error.statusCode = 401;
    }

    console.log(error);

    const statusCode = error.statusCode || 500;
    const message = error.message;
    if (message === "") {
        return res.sendStatus(statusCode);
    }
    res.status(statusCode).json({ message });
}

module.exports = { errorHandler };