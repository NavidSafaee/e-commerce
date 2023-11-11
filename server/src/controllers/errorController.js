const mongoose = require("mongoose");

function errorHandler(error, req, res, next) {
    error.statusCode = error.statusCode || 500;
    if (error instanceof mongoose.Error.CastError) {
        error.statusCode = 400;
        error.message = 'invalid value in request body';
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