const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('collections', collectionSchema);
