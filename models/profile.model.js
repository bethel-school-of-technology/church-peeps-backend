const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    church: {
        type: String,
        required: true
    },
}, {
timestamps: true,

});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;