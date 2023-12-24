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
        return product.restrictInfo();
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
    const {
        orderId,
        itemId,
        productId,
        title,
        quantity,
        price,
        category,
        discount,
        description,
        maxQuantityAllowedInCart
    } = reqBody;

    const order = await Order.findById(orderId);
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

    const isInOrder = order.items.some(item => item._id.toString() === itemId);
    if (!isInOrder) {
        const error = new Error('This product is not in specified order');
        error.statusCode = 400;
        throw error;
    }

    const isInStock = order.items.some(item => item._id.toString() === itemId && item.isInStock);
    if (isInStock) {
        const error = new Error('Order item is already added to stock');
        error.statusCode = 400;
        throw error;
    }

    let date;
    if (discount) {
        date = new Date();
        date.setDate(date.getDate() + 190);
    }

    let product;
    let orderItem = order.items.find(item => item._id.toString() === itemId);
    if (productId) {
        product = await Product.findById(productId);
        if (!product) {
            const error = new Error('No product was found with the given id');
            error.statusCode = 404;
            throw error;
        }

        product.quantity += orderItem.quantity;
    } else {
        if (!images) {
            const error = new Error('the product should at leas have one image');
            error.statusCode = 400;
            throw error;
        }

        const imageUrls = images.map(image => {
            const imageUrl = 'public/images/products' + image.filename;
            return imageUrl;
        });

        if (quantity !== orderItem.quantity) {
            const error = new Error('product quantity must be equal to order item quantity');
            error.statusCode = 400;
            throw error;
        }

        product = new Product({
            title,
            quantity,
            price,
            category,
            imageUrls,
            description,
            maxQuantityAllowedInCart,
            discount,
            discountExpiresAt: date
        });
    }

    orderItem.isInStock = true;
    await product.save();
    await order.save();
    return product;
}




async function getAllProductsCount() {
    const count = await Product.countDocuments();
    return { count };
}


async function getAllProductsTitle() {
    const products = await Product.find().select('title');
    productsTitle = products.map(product => product.title);
    return productsTitle;
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

        const oldProduct = await Product.findById(productId).select('imageUrls');
        oldProduct.imageUrls.forEach(async imageUrl => fs.unlink(imageUrl, err => { if (err) { throw err } }));
    }

    // TODO what about _id?
    await Product.findByIdAndUpdate(productId, reqBody);
}


// function roundToHalf(num) {
//     return Math.round(num * 2) / 2;
// }

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getAllProductsCount,
    getAllProductsTitle,
    editProduct
}