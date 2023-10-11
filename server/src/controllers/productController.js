const { 
    getAllProducts,
    getProductById,
    createProduct
 } = require('../services/productServices');



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
    const response = await createProduct(req.body);
    res.status(201).json(response);
}



module.exports = {
    httpGetAllProducts,
    httpCreateProduct,
    httpGetProductById
}