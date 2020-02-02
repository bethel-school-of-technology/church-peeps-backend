const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PrayerSchema = new Schema ({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },
    name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },

    description: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true,

});

const Prayer = mongoose.model('Prayer', PrayerSchema);

module.exports = Prayer;