const router = require('express').Router()
const { Product } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = Product.findAll()
    res.json(allProducts)
  }
  catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) { next(error) }
})

module.exports = router
