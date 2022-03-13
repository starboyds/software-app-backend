const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    tags: [],
    price: Number,
    image_url: String,
    size: Number,
    version: String,
    rating: Number,
    downloads: Number,
    requirements: String,
    language: String,
    license: String,
    date_added: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;