const UserDiscount = require('../models/userDiscountModel'); 

async function getDiscountPercentage(discountCode) {
    const userDiscount = await UserDiscount.findOne({ code: discountCode });

    if (!userDiscount) {
        const error = new Error('No discount information found for this code');
        error.statusCode = 404;
        throw error;  
    }

    if (userDiscount.expiration < new Date()) {
        const error = new Error('Discount expired');
        error.statusCode = 410;
        throw error;  
    }

    return { discountPercentage: userDiscount.percentage };
}


module.exports = {
    getDiscountPercentage
}