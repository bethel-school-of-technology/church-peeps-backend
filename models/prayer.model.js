const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrayerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    date: {
        type: Number
    },
}, {
        timestamps: true,

    });

const Prayer = mongoose.model('Prayer', PrayerSchema);

module.exports = Prayer;