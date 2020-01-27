const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prayerrequestSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,

});

const PrayerRequest = mongoose.model('Prayer Request', prayerrequestSchema);

module.exports = PrayerRequest;