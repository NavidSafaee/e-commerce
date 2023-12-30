const validator = require('../utils/validator');

const {
    addReview,
    getReviews,
    getMyReviews,
    changeValidationStatus,
    getPendingReviews,
    getPendingReviewsCount
} = require('../services/reviewService');


async function httpAddReview(req, res, next) {
    try {
        validator(req);
        const productId = req.params.productId;

        const response = await addReview(req.body, productId, req.userId);
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}


async function httpGetReviews(req, res, next) {
    try {
        const productId = req.params.productId;
        const response = await getReviews(productId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetMyReviews(req, res, next) {
    try {
        const response = await getMyReviews(req.userId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpChangeValidationStatus(req, res, next) {
    try {
        validator(req);
        const reviewId = req.params.reviewId;
        
        await changeValidationStatus(reviewId, req.body.validationStatus);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

async function httpGetPendingReviews(req, res, next) {
    try {
        const response = await getPendingReviews();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetPendingReviewsCount(req, res, next) {
    try {
        const response = await getPendingReviewsCount();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpAddReview,
    httpGetReviews,
    httpGetMyReviews,
    httpChangeValidationStatus,
    httpGetPendingReviews,
    httpGetPendingReviewsCount
}