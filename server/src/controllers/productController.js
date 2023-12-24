const fs = require('fs');

const {
    getAllProducts,
    getProductById,
    createProduct,
    getAllProductsCount,
    getAllProductsTitle,
    editProduct
} = require('../services/productServices');
const validator = require('../utils/validator');



async function httpGetAllProducts(req, res, next) {
    try {
        const result = await getAllProducts(req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function httpGetProductById(req, res, next) {
    try {
        const productId = req.params.productId;
        const response = await getProductById(productId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpCreateProduct(req, res, next) {
    try {
        validator(req);
        console.log(req.files);
        const response = await createProduct(req.body, req.files);
        res.status(201).json(response);
        
    } catch (error) {
        req.files.forEach(image => fs.unlink(image.path, (err) => { if (err) throw err }));
        next(error);
    }
}

async function httpGetAllProductsCount(req, res, next) {
    try {
        const response = await getAllProductsCount();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpGetAllProductsTitle(req, res, next) {
    try {
        const response = await getAllProductsTitle();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function httpEditProduct(req, res, next) {
    try {
        validator(req);
        const productId = req.params.productId;
        await editProduct(productId, req.body, req.files);
        res.status(204);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    httpGetAllProducts,
    httpCreateProduct,
    httpGetProductById,
    httpGetAllProductsCount,
    httpGetAllProductsTitle,
    httpEditProduct
}