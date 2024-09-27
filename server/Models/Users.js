const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    nickname:{
        type:String,
        default:'Nickname',
    },
    password:{
        type: String,
    },
    role:{
        type:String,
        default:'user',
    },
    userCollection: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collections'
    }
},{ timestamps: true })

module.exports = mongoose.model('users',userSchema)