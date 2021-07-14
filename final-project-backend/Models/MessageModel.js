const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MessageTemplate = new mongoose.Schema({
    _UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserTabel' },
    MassageContent: {
        type: String,
    },
    Sent_By: { type: String },
    date: {
        type: Date,
        default: Date.now
    }

})
MessageTemplate.plugin(AutoIncrement, { inc_field: 'Message_Number' })
module.exports = mongoose.model('MassagesTabel', MessageTemplate);