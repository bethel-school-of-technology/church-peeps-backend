const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChurchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    date: {
        type: Number
    },
}, {
timestamps: true,

});

const Church = mongoose.model('Church', ChurchSchema);

module.exports = Church;