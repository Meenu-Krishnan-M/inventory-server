const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        required: true,
        type: String
    },
    rate: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: String
    }
})

const products = mongoose.model('products', productSchema)
module.exports = products