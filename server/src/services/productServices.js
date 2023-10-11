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

// will be removed
async function createProduct(reqBody) {
    const {
        title,
        price,
        category,
        discount,
        rate,
        status
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
        imageUrl: path.join('images', 'products', '7.png'),
        discount,
        rate,
        status,
        discountExpiresAt: date
    });

    calcDiscountedPrice(product);

    await product.save();
    return product;
}

function calcDiscountedPrice(product) {
    if (product.discount) {
        product.newPrice = (product.price * (1 - product.discount)).toFixed(2);
    }
    return product;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
}