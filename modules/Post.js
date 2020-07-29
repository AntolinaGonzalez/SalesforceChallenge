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
    
},
    {timestamps: true}
    );

const Post = module.exports = mongoose.model('Post', PostSchema);