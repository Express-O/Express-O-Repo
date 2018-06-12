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

  if (cart[req.body.id]) {
    cart[req.body.id] += req.body.quantity;
  } else {
    cart[req.body.id] = req.body.quantity;
  }
   res.status(200).json(cart);
})

// api/cart
// PUT update cart with product
// router.put('/', (req, res, next) => {
//   try {
//     const product = req.body
//     const cart = req.session.cart
//     cart.push(product)
//     // const updatedCart = cart.push(product)
//     res.status(200).json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

//PUT: update old cart with newCart from frontend
// router.put('/newCart', (req, res, next) => {
//   try {
//     const newCart = req.body
//     // let oldCart = req.session.cart
//     req.session.cart = newCart
//     // const updatedCart = oldCart;
//     console.log("session------------->", req.session.cart)
//     // console.log("updated Cart in the backend api route =====> ", updatedCart)
//     res.status(200).send(req.session.cart)
//   } catch (err) {
//     next(err)
//   }
// })

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