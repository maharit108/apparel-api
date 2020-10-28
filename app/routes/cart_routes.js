const express = require('express')
const passport = require('passport')

const Cart = require('../models/cart.js')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/my-cart', requireToken, (req, res, next) => {
  Cart.create(req.body.bag)
    .then(bag => {
      res.status(201).json({ bag: bag.toObject() })
    })
    .catch(next)
})

router.patch('/my-cart/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.bag.owner
  Cart.findById(req.params.id)
    .then(handle404)
    .then(bag => {
      requireOwnership(req, bag)
      return bag.updateOne(req.body.bag)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/my-cart/:id', requireToken, (req, res, next) => {
  Cart.findById(req.params.id)
    .then(handle404)
    .then(bag => {
      requireOwnership(req, bag)
      bag.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.get('/my-cart/:id', requireToken, (req, res, next) => {
  Cart.findById(req.params.id)
    .then(handle404)
    .then(bag => {
      requireOwnership(req, bag)
      res.status(200).json({ bag: bag.toObject() })
    })
    .catch(next)
})

router.get('/history', requireToken, (req, res, next) => {
  Cart.find()
    .then(handle404)
    .then(bags => bags.filter(bag => {
      requireOwnership(req, bag)
    }))
    .then(bags => console.log('history', bags))
    .then(bags => res.status(200).json({ bags: bags.toObject() }))
    .catch(next)
})

module.exports = router
