const router = require('express').Router()
const User = require('../db/models/user')
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

router.delete('/', async (req, res, next) => {
  try {
    const deleted = await User.destroy({ where: { id: req.body.id } })
    res.status(202).json("Account Deleted")
  }
  catch (error) { next(error) }
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
