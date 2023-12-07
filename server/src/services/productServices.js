const Product = require('../models/productModel');

// for creating products (will be removed)!
const path = require('path');

async function getAllProducts(query) {
    const { category } = query;
    const currentPage = +query.page || 1;
    const limit = 8;
    let products;

    if (category) {
        products = await Product.find({ category }).skip((currentPage - 1) * limit).limit(limit);
    } else {
        products = await Product.find().skip((currentPage - 1) * limit).limit(limit);
    }

    const totalItems = await Product.find().countDocuments();

    return {
        products,
        lastPage: Math.ceil(totalItems / limit),
        totalItems
    }
}

async function getProductById(productId) {
    const product = await Product.findById(productId);
    if (!product) {
        const error = new Error('Product Not Found');
        error.statusCode = 404;
        throw error;
    }

    return product;
}


async function createProduct(reqBody, images) {
    // if (!images) {
    //     const error = new Error('the product should at leas have one image');
    //     error.statusCode = 400;
    //     throw error;
    // }
    let paths;

    if (images) {
        paths = images.map(image => {
            const imageUrl = 'public/' + image.path.replace('\\', '/');
            return imageUrl;
        });
    }

    const {
        title,
        price,
        category,
        discount,
        description
    } = reqBody;
    
    let date;
    if (discount) {
        date = new Date();
        date.setDate(date.getDate() + 190);
    }

    const product = new Product({
        title,
        price,
        category,
        imageUrls: paths,
        discount,
        description,
        discountExpiresAt: date
    });

    // calcDiscountedPrice(product);

    await product.save();
    return product;
}

// function roundToHalf(num) {
//     return Math.round(num * 2) / 2;
// }

// function calcDiscountedPrice(product) {
//     if (product.discount) {
//         product.newPrice = (product.price * (1 - product.discount)).toFixed(2);
//     }
//     return product;
// }

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
}