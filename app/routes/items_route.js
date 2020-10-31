const express = require('express')
const passport = require('passport')

const Item = require('../models/items')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/items', requireToken, (req, res, next) => {
  req.body.item.owner = req.user._id
  Item.create(req.body.item)
    .then(item => {
      res.status(201).json({ item: item })
    })
    .catch(next)
})

router.get('/items', (req, res, next) => {
  Item.find()
    .then(items => {
      return items.map(item => item.toObject())
    })
    .then(items => res.status(200).json({ itemsOnSale: items }))
    .catch(next)
})

router.patch('/items/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.item.owner
  Item.findById(req.params.id)
    .then(handle404)
    .then(item => {
      requireOwnership(req, item)
      return item.updateOne(req.body.item)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/items/:id', requireToken, (req, res, next) => {
  Item.findById(req.params.id)
    .then(handle404)
    .then(item => {
      requireOwnership(req, item)
      item.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.get('/items/:id', requireToken, (req, res, next) => {
  Item.findById(req.params.id)
    .then(handle404)
    .then(item => res.status(200).json({ item: item }))
    .catch(next)
})

module.exports = router
