const router = require('express').Router()
const { User } = require('../db/models')

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)

    if (!user) {
      return res.sendStatus(404)
    }

    res.json(user)
  } catch (error) { next(error) }
})

router.delete('/delete', async (req, res, next) => {
  if (req.user.id !== req.body.id && user.admin === false) { res.json('must be the logged in user or admin to delete') }
  try {
    const user = await User.destroy({ where: { id: req.body.id } })
    res.session.destroy()
    res.status(202).json("Account Deleted")
  }
  catch (error) { next(error) }
})

module.exports = router
