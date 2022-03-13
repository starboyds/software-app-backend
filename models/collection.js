const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    softwareId: {
        type: String,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;