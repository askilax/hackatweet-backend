const mongoose = require('mongoose');

const HashtagSchema = new mongoose.Schema({
    hashtag: {
        type: String,
        required: true,
        unique: true, 
        trim: true,   // Supprime les espaces autour du hashtag
        lowercase: true, // Enregistre le hashtag en minuscules
    }
}, { timestamps: true }); 


const Hashtag = mongoose.model('Hashtag', HashtagSchema);

module.exports = Hashtag;
