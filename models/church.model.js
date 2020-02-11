const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const churchSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    churchName: {
        type: String,
        required: true
    },
    isAdmin: Boolean
}, {
        timestamps: true,

    });



module.exports = Church = mongoose.model('church', churchSchema);