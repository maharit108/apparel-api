const express = require('express')
const passport = require('passport')

const Cart = require('../models/cart.js')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// create a cart--
router.post('/my-cart', requireToken, (req, res, next) => {
  console.log('yoyoyo', req.user)
  req.body.bag.owner = req.user._id
  Cart.create(req.body.bag)
    .then(bag => {
      res.status(201).json({ bag: bag.toObject() })
    })
    .catch(next)
})

// edit cart--
router.patch('/my-cart/:id', requireToken, removeBlanks, (req, res, next) => {
  console.log('update', req.body)
  if (req.body.bag.owner) {
    delete req.body.bag.owner
  }
  Cart.findById(req.params.id)
    .then(handle404)
    .then(bag => {
      requireOwnership(req, bag)
      return bag.updateOne(req.body.bag)
    })
    .then((bag) => res.sendStatus(204))
    .catch(next)
})

// delete cartI --
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

// get a single cart--
router.get('/my-cart/:id', requireToken, (req, res, next) => {
  Cart.findById(req.params.id)
    .then(handle404)
    .then(bag => {
      requireOwnership(req, bag)
      res.status(200).json({ cart: bag.toObject() })
    })
    .catch(next)
})

// get incomplete cart, transasction not completed--
router.get('/my-cart', requireToken, (req, res, next) => {
  let myCarts = []
  Cart.find()
    .then(handle404)
    .then(bags => {
      bags.forEach(bag => {
        if (req.user._id.toString() === bag.owner.toString()) {
          myCarts.push(bag)
        }
      })
      let recentCart = myCarts.filter(bag => bag.isCompleted === false)
      return recentCart
    })
    .then(send => res.status(200).json({ recentCart: send })
    )
    .catch(next)
})

// get all carts, previous transasction history and recent cart--
router.get('/carts', requireToken, (req, res, next) => {
  let myCarts = []
  Cart.find()
    .then(handle404)
    .then(bags => {
      bags.forEach(bag => {
        if (req.user._id.toString() === bag.owner.toString()) {
          myCarts.push(bag)
        }
      })
      return myCarts
    })
    .then(send =>
      res.status(200).json({ carts: send })
    )
    .catch(next)
})

module.exports = router
