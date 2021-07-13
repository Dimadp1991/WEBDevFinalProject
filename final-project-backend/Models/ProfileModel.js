

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const ProfileTemplate = new mongoose.Schema({
    _UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserTabel' },
    FullName: { type: String },
    Email: { type: String },
    Details: { type: String },
    PhoneNumber: { type: String },
    Gender: { type: String, enum: ['Male', 'Female'] },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserTabel' }],


})

module.exports = mongoose.model('ProfileTabel', ProfileTemplate);