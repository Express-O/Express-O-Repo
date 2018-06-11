const router = require('express').Router()
const { Order, LineItem } = require('../db/models')

router.post('/', async (req, res, next) => {
  //if (!req.user) { res.json("You must be logged in to submit an order") }
  try {
    const order = await Order.create()
    req.body.orderId = order.id
    //if there's an array of items from the cart we need to map over and do this.
    const item = await LineItem.create(req.body)
    res.json("success!")
  } catch (err) {
    next(err)
  }
  //for decrementing the inventory, create a method on the model and then call it with number of items to decrements, should be a failsafe in the method to prevent negative numbers in inventory
})


//todo: remember to add this to index
//todo: remember to change this in the component
//if time: the hashing should be done on the original cart in the thunk so that we dont have to keep writing this
