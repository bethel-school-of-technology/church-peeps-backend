const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Number
    },
}, {
timestamps: true,

});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;