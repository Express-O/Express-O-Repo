const router = require('express').Router()
const { Order, LineItem } = require('../db/models')

// api/cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await req.session.cart
    res.status(200).json(cart)
    // res.set({"Cache-Control": "no-cache"})    // get rid of caching ???
    // res.json(cart)
  } catch (err) {
    next(err)
  }
})

//api/cart
// PUT update cart with product
router.put('/', (req, res, next) => {
  let cart = req.session.cart || {}
    console.log("STARTING CART", cart)
  if (cart[req.body.id]) {
    console.log("in the IF", typeof req.body.quantity, req.body.quantity)
    cart[req.body.id] = +req.body.quantity ;
  } else {
    console.log("in the ELSE")
    cart[req.body.id] = +req.body.quantity;
  }
  console.log("API ROUTE CART=============>", cart);
   res.status(200).json(cart);
})

// api/cart
// Empty Cart
router.delete('/', (req, res, next) => {
  try {
    req.session.cart = {}
    res.json(req.session.cart)
  } catch (err) {
    next(err)
  }
})

// api/cart/productId
// DELETE (Remove) product from cart
router.delete('/:productId', async (req, res, next) => {
  try {
    const cart = await req.session.cart;
    const productToRemoveId = +req.params.productId;
    delete cart[productToRemoveId];

    res.status(200).json(cart);
  } catch (error) { next(error) }
})

module.exports = router;