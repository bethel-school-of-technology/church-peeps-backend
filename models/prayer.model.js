const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrayerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    prayer: {
        type: Schema.Types.ObjectId,
        ref: 'prayer'
    },
    firstName: {
        type: String,
        required: true
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
        type: Date
    },
}, {
        timestamps: true,

    });

const Prayer = mongoose.model('prayer', PrayerSchema);

module.exports = Prayer;