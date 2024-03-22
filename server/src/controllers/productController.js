const fs = require('fs');

const productService = require('../services/productServices');
const validator = require('../utils/validator');

async function getAll(req, res, next) {
    try {
        const result = await productService.getAll(req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const productId = req.params.productId;
        const response = await productService.getById(productId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        validator(req);
        const response = await productService.create(req.body, req.files);
        res.status(201).json(response);

    } catch (error) {
        if (req.files) {
            req.files.forEach(image => fs.unlink(image.path, (err) => { if (err) throw err }));
        }
        next(error);
    }
}

async function getAllCount(req, res, next) {
    try {
        const response = await productService.getAllCount();
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
        const response = await productService.getAllTitle();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        validator(req);
        const productId = req.params.productId;
        await productService.update(productId, req.body, req.files);
        res.status(204);
    } catch (error) {
        next(error);
    }
}


async function search(req, res, next) {
    try {

        const response = await productService.search(req.query);
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