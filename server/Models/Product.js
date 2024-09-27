const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    grade:{
        type: String,
        default: ''
    },
    serie:{
        type: String,
        default: ''
    },
    height:{
        type: Number,
        default: 0
    },
    runner_num:{
        type: Number,
        default: 0
    },
    cons:{
        type: String,
        default: ''
    },
    release_date:{
        type: Date,
        default: Date.now
    },
    detail:{
        type: String,
        default: ''
    },
    sticker: {
        foil: {
            type: Boolean,
            default: false
        },
        etching: {
            type: Boolean,
            default: false
        },
        water: {
            type: Boolean,
            default: false
        }
    },
    file: {
        type: String,
        default: 'noimage.jpg'
    },
    ratings: [
        {
            star: Number,
            postedby: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
        },
    ],
    totalrating: {
        type: Number,
        default: 0,
    },
},{ timestamps: true })

module.exports = mongoose.model('products',productSchema)