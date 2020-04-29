const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength:3
    },
    clicks: {
        type: Number,
    },
    _listId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default:false,
        required:true
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;
