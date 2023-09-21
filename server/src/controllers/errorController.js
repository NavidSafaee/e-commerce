function errorHandler(error, req, res, next) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({ message });
}

module.exports = { errorHandler };