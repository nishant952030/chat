const mongoose = require('mongoose')
const message = new mongoose.Schema({
    test: {
        type: String,
        default:""
    },
    imageURL: {
        type: String,
        default:""
    },
    videoUrl: {
        type: String,
        default:""
    },
    seen:{
        type: Boolean,
        default:false
    }

})
const conversation = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"User"
    },
    reciever: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    messages:[{type:mongoose.Schema.ObjectId,ref:'Message'}]
}, { timestamps: true })
const Conversation= mongoose.model('Conversation',conversation)
const Message = mongoose.model('Message', message)
module.exports={Conversation,Message}