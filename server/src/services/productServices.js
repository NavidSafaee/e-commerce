const fs = require('fs');

const createError = require('http-errors');

const orderService = require('../services/orderService'); 
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// for creating products (will be removed)!
const path = require('path');



async function getAll(query) {
    const { category } = query;
    const currentPage = +query.page || 1;
    const limit = +query.limit || 10;
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
        currentPage,
        lastPage: Math.ceil(totalItems / limit),
        totalItems
    }
}



async function getById(productId) {
    const product = await Product.findById(productId);
    if (!product) throw createError(404, 'Product not found');

    return product;
}




async function create(reqBody, images) {
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

    const order = await orderService.getById(orderId);

    if (!order.isDelivered) throw createError(400, 'Order not delivered yet'); 

    const isInOrder = order.items.some(item => item._id.toString() === itemId);
    if (!isInOrder) throw createError(400, 'This product is not in specified order'); 

    const isInStock = order.items.some(item => item._id.toString() === itemId && item.isInStock);
    if (isInStock) throw createError(400, 'Order item is already added to stock'); 

    let product;
    let orderItem = order.items.find(item => item._id.toString() === itemId);

    if (productId) {
        product = await Product.findById(productId);
        if (!product) throw createError(404, 'No product was found with the given id'); 

        product.quantity += orderItem.quantity;

    } else {
        if (!images) throw createError(400, 'The product should at leas have one image'); 

        const imageUrls = images.map(image => {
            const imageUrl = 'public/images/products' + image.filename;
            return imageUrl;
        });

        if (title !== orderItem.product.title) 
            throw createError(400, 'Product title must be equal to order item title'); 

        if (+quantity !== orderItem.quantity)
            throw createError(400, 'Product quantity must be equal to order item quantity') 

        let date;
        let discountObj;

        if (+discount) {
            date = new Date();
            date.setDate(date.getDate() + 190);

            discountObj = {
                percentage: discount,
                expirationDate: date
            }
        }

        product = new Product({
            title,
            quantity: +quantity,
            price: +price,
            category,
            imageUrls,
            description,
            maxQuantityAllowedInCart: +maxQuantityAllowedInCart,
            discount: discountObj
        });
    }

    orderItem.isInStock = true;
    await product.save();
    await order.save();
    return product;
}




async function getAllCount() {
    const count = await Product.countDocuments();
    return { count };
}

async function getAllCategories() {
    const products = await Product.find().select('category');
    categories = products.map(product => product.category);
    categoriesSet = [...new Set(categories)];
    return categoriesSet;
}


async function getAllTitle() {
    const products = await Product.find().select('title');
    productsTitle = products.map(product => product.title);
    return productsTitle;
}




async function update(productId, reqBody, newImages) {
    const product = await getById(productId);

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


async function search(searchTerm, category) {
    if (category) return Product.find({ title: { $regex: searchTerm, $options: 'i' }, category });
    return Product.find({ title: { $regex: searchTerm, $options: 'i' } });
}


// function roundToHalf(num) {
//     return Math.round(num * 2) / 2;
// }

module.exports = {
    getAll,
    getById,
    create,
    update,
    getAllCount,
    getAllCategories,
    getAllTitle,
    search
}