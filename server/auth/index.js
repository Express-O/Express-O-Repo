const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.get('/users', async (req, res, next) => {
  if (!req.user.isAdmin) { res.json("Must be logged-in Admin to access") }
  try {
    const users = await User.findAll()
    res.json(users)
  }
  catch (error) { next(error) }
})

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  }
  catch (error) { next(error) }
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.patch('/editProfile', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await User.update(req.body, {
      where: { id: req.body.id },
      returning: true,
      plain: true
    })
    res.json(affectedRows)
  }
  catch (error) { next(error) }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/product/all')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.delete('/:id', async (req, res, next) => {
  if (req.user.id !== req.params.id && req.user.isAdmin === false) { res.json('must be the logged in user or admin to delete') }
  try {
    const user = await User.destroy({ where: { id: req.params.id } })
    res.status(202).json("Account Deleted")
  }
  catch (error) { next(error) }
})

router.use('/google', require('./google'))
