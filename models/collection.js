const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;