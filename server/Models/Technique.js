const mongoose = require('mongoose')

const techniqueSchema = mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    content:{
        type: String,
        default: ''
    },
    release_date:{
        type: Date,
        default: Date.now
    },
    file: { //image file
        type: String,
        default: 'noimage.jpg'
    },
},{ timestamps: true })

module.exports = mongoose.model('techniques',techniqueSchema)