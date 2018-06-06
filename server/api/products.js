const router = require('express').Router()
const { Product } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  }
  catch (err) {
    next(err)
  }
})

// GET a product by id
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) { next(error) }
})

// POST new product
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      inventory: req.body.inventory,
      photo: req.body.photo,
      category: req.body.category
    })
    res.status(201).json(newProduct)
  } catch (error) { next(error) }
})

// PUT updated product info for one product
router.put('/:productId', async(req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)

    if (!product) {
      return res.sendStatus(404)
    }

    await product.update(req.body)
    res.status(200).json(product)
  } catch (error) { next(error) }
})

// DELETE a product
router.delete('/:productId', async(req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(200)
  } catch (error) { next(error) }
})

module.exports = router
