const router = require('express').Router()

router.get('/', (req, res, next) => {
  try {
    const cart = req.session.cart
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// POST new product
// router.post('/', async (req, res, next) => {
//   try {
//     const newProduct = await Product.create({
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       inventory: req.body.inventory,
//       photo: req.body.photo,
//       category: req.body.category
//     })
//     res.status(201).json(newProduct)
//   } catch (error) { next(error) }
// })

// PUT update cart with product
router.put('/', (req, res, next) => {
    const product = req.body
    const cart = req.session.cart
    const updatedCart = cart.push(product)
    res.status(200).json(updatedCart)
})

// DELETE a product
// router.delete('/:productId', async(req, res, next) => {
//   try {
//     await Product.destroy({
//       where: {
//         id: req.params.productId
//       }
//     })
//     res.sendStatus(200)
//   } catch (error) { next(error) }
// })

module.exports = router
