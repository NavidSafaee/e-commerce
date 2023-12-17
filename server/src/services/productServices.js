const fs = require('fs');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

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

    products = products.map(product => {
        return product.toJSON();
    })

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

    const order = await Order.findById(reqBody.orderId);
    if (!order) {
        const error = new Error('No order was found with the given id');
        error.statusCode = 404;
        throw error;
    }

    if (!order.isDelivered) {
        const error = new Error('Order not delivered yet');
        error.statusCode = 400;
        throw error;
    }

    if (!images) {
        const error = new Error('the product should at leas have one image');
        error.statusCode = 400;
        throw error;
    }

    const {
        _id,
        title,
        price,
        category,
        quantity,
        discount,
        description,
        maxQuantityAllowedInCart,
        imageUrls
    } = reqBody;

    if (images) {
        imageUrls = images.map(image => {
            const imageUrl = 'public/' + image.path.replace('\\', '/');
            return imageUrl;
        });
    }

    let date;
    if (discount) {
        date = new Date();
        date.setDate(date.getDate() + 190);
    }


    const isInOrder = order.items.some(item => item.product.title === title && item.quantity === quantity);
    if (!isInOrder) {
        const error = new Error('This product is not in specified order');
        error.statusCode = 400;
        throw error;
    }


    if (_id) {
        const product = await Product.findById(_id);

        if (!product) {
            const error = new Error('No product was found with the given id');
            error.statusCode = 404;
            throw error;
        }

        if (title !== product.title || price !== product.price || category !== product.category ||
            description !== product.description || discount !== product.discount ||
            maxQuantityAllowedInCart !== product.maxQuantityAllowedInCart || areUrlsMatch(product)) {
            const error = new Error('product id and given info doesn\'t match');
            error.statusCode = 400;
            throw error;
        }

        product.quantity += quantity;
        await product.save();
        return product;
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

async function getAllProductsCount() {
    const count = await Product.countDocuments();
    return { count };
}


async function editProduct(productId, reqBody, newImages) {
    const product = await Product.findById(productId);

    if (!product) {
        const error = new Error('Product not found!');
        error.statusCode = 404;
        throw error;
    }

    if (newImages) {
        reqBody.imageUrls = newImages.map(newImage => {
            const imageUrl = 'public/' + newImage.path.replace('\\', '/');
            return imageUrl;
        });
    }

    if (!areUrlsMatch(product)) {
        const oldProduct = await Product.findById(productId).select('imageUrls');
        oldProduct.imageUrls.forEach(async imageUrl => {
            fs.unlink(imageUrl, err => {
                if (err) {
                    throw err;
                }
            });
        });
    }

    // TODO what about _id?
    await Product.findByIdAndUpdate(productId, reqBody);
}


// async function deleteOldProductImageFiles(productId) {
//     const oldProduct = await Product.findById(productId).select('imageUrls');
//     oldProduct.imageUrls.forEach(async imageUrl => {
//         fs.unlink(imageUrl, err => {
//             if (err) {
//                 throw err;
//             }
//         });
//     });
// }


function areUrlsMatch(product) {
    if (imageUrls.length !== product.imageUrls.length) {
        for (let i = 0; i < imageUrls.length; i++) {
            if (imageUrls[i] !== product.imageUrls[i]) {
                return false;
            }
        }
    } 
    return true;
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
    createProduct,
    getAllProductsCount,
    editProduct
}