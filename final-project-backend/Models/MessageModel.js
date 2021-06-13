const mongoose=require('mongoose');


const MessageTemplate=new mongoose.Schema({
    _UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserTabel' },
    MassageNum:{type:Number},
    MassageContent:{
        type:String,
    },

})

module.exports= mongoose.model('MassagesTabel',MessageTemplate);