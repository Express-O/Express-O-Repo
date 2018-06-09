const router = require('express').Router()
const { Product, Order, LineItem } = require('../db/models')

// api/cart
router.get('/', (req, res, next) => {
  try {
    const cart = req.session.cart
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/submit', async (req, res, next) => {
  if (!req.user) { res.json("You must be logged in to submit an order") }
  try {
    const order = await Order.create()
    req.body.orderId = order.id
    //if there's an array of items from the cart we need to map over and do this.
    const item = await LineItem.create(req.body)
    res.json("success!")
  } catch (err) {
    next(err)
  }
})

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

//PUT: update old cart with newCart from frontend
router.put('/newCart', (req, res, next) => {
  try {
    const newCart = req.body
    let oldCart = req.session.cart
    oldCart = newCart
    const updatedCart = oldCart;
    console.log("updated Cart in the backend api route =====> ", updatedCart)
    res.status(200).send(updatedCart)
  } catch (err) {
    next(err)
  }
})

// api/cart
// Empty Cart
router.delete('/', (req, res, next) => {
  try {
    req.session.cart = []
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})


// api/cart/productId
// DELETE (Remove) product from cart
router.delete('/:productId', (req, res, next) => {
  try {
    const productToRemoveId = +req.params.productId
    const cartCopy = req.session.cart.slice()
    const filteredCart = cartCopy.filter(product => {
      return product.id !== productToRemoveId
    })

    req.session.cart = filteredCart
    res.status(200).json(filteredCart)
  } catch (error) { next(error) }
})

module.exports = router
