const router = require('express').Router()

// api/cart
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

// api/cart
// PUT update cart with product
router.put('/', (req, res, next) => {
  try {
    const product = req.body
    const cart = req.session.cart
    const updatedCart = cart.push(product)
    res.status(200).json(updatedCart)
  } catch (err) {
    next(err)
  }
})

// api/cart/productId
// DELETE (Remove) product from cart
router.delete('/:productId', (req, res, next) => {
  try {
    const productToRemoveId = +req.params.productId
    console.log(productToRemoveId)
    const cartCopy = req.session.cart.slice()
    const filteredCart = cartCopy.filter(product => {
      console.log(product.id, productToRemoveId)
      return product.id !== productToRemoveId
    })

    console.log('productToRemoveId', req.params.productId)
    console.log('equal', cartCopy.length == filteredCart.length)
    console.log('Filtered Cart=====', filteredCart)

    req.session.cart = filteredCart
    res.status(200).json(filteredCart)
  } catch (error) { next(error) }
})

module.exports = router
