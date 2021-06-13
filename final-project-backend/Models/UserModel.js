const mongoose=require('mongoose');

const UserTemplate=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model('UserTabel',UserTemplate);