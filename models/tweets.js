const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 280 
    },
    hashtags: [{
        type: String,
        required: false
    }],
    likes: {
        type: Number,
        default: 0
    },
    retweets: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Tweet = mongoose.model('tweets', TweetSchema);

module.exports = Tweet;
