const express = require('express');

const {
    httpAddReview,
    httpGetReviews,
    httpGetMyReviews,
    httpChangeValidationStatus,
    httpGetPendingReviewsCount,
    httpGetPendingReviews
} = require('../controllers/reviewController');
const { addReviewValidator, changeReviewStatusValidator } = require('../middlewares/validators/reviewValidator');
const { isAuth, isCustomer, isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/me',isAuth, isCustomer, httpGetMyReviews);
router.get('/pending', isAuth, isAdmin, httpGetPendingReviews);
router.get('/pending/count', isAuth, isAdmin, httpGetPendingReviewsCount);
router.get('/:productId', httpGetReviews);
router.put('/:productId',isAuth, isCustomer, addReviewValidator, httpAddReview);
router.patch('/:reviewId', isAuth, isAdmin, changeReviewStatusValidator, httpChangeValidationStatus);


module.exports = router;