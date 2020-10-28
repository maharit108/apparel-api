const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartItems: [],
  isCompleted: {
    type: Boolean
  }
})

module.exports = mongoose.model('Cart', cartSchema)
