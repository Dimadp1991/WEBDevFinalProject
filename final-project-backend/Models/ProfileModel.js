

const mongoose=require('mongoose');


const ProfileTemplate=new mongoose.Schema({
    _UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserTabel' },
    profile_img:    {
        data: Buffer,
        contentType: String
    },
    FullName:{type:String },
    Email:{type:String },
    Details:{type:String},
    PhoneNumber:{type:String},
    Gender:{type:String,enum : ['Male','Female']},
    friends:[{ type: mongoose.Schema.Types.ObjectId, ref: 'UserTabel' }],


})

module.exports= mongoose.model('ProfileTabel',ProfileTemplate);