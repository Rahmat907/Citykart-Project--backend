const mongoose = require('mongoose');

const askAISchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    reply: {
        type: String,
    }

},{timestamps: true})

module.exports = mongoose.model('AskAI', askAISchema);