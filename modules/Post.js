const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type : Date,
        default: Date.now
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);