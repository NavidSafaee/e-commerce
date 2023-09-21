const { 
    getAllProducts,
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

async function httpCreateProduct(req, res, next) {
    await createProduct(req.body);
    res.status(201).json({
        message: 'product created successfully'
    })
}


module.exports = {
    httpGetAllProducts,
    httpCreateProduct
}