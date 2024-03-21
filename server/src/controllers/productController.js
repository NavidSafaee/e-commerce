const fs = require('fs');

const {
    getAllProducts,
    getProductById,
    createProduct,
    getAllProductsCount,
    getAllProductsTitle,
    editProduct,
    searchProduct
} = require('../services/productServices');
const productService = require('../services/productServices');
const validator = require('../utils/validator');



async function getAll(req, res, next) {
    try {
        const result = await getAllProducts(req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const productId = req.params.productId;
        const response = await getProductById(productId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        validator(req);
        const response = await createProduct(req.body, req.files);
        res.status(201).json(response);
        
    } catch (error) {
        if (req. files) {
            req.files.forEach(image => fs.unlink(image.path, (err) => { if (err) throw err }));
        }
        next(error);
    }
}

async function getAllCount(req, res, next) {
    try {
        const response = await getAllProductsCount();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function getAllCategories(req, res, next) {
    try {
        const response = await productService.getAllCategories();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function getAllTitle(req, res, next) {
    try {
        const response = await getAllProductsTitle();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        validator(req);
        const productId = req.params.productId;
        await editProduct(productId, req.body, req.files);
        res.status(204);
    } catch (error) {
        next(error);
    }
}


async function search(req, res, next) {
    try {
        const searchTerm = req.query.searchTerm;
        const category = req.query.category;
        const response = await searchProduct(searchTerm, category);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
} 


module.exports = {
    getAll,
    getById,
    create,
    getAllCount,
    getAllCategories,
    getAllTitle,
    update,
    search
}