
const express = require('express');
const UserTemplate = require('../Models/UserModel')
const ProfileTemplate = require('../Models/ProfileModel')
const router = express.Router();


router.get('/', (req, res) => {
    return res.send('<h1>THIS IS SERVER PAGE GO AWAY</h1>');

});
router.get('/register', (req, res) => {

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
});

router.post('/register', async (req, res) => {

 
    const login_user = new UserTemplate({
        userName: req.body.userName,
        password: req.body.password,
    })
    const{_id}= await login_user.save();
    const user_profile=new ProfileTemplate({
        _UserId: _id,
        profile_img:'../public/profile-icon.png',
        FullName:req.body.fullName,
        Email:req.body.email,
        Details:'',
        PhoneNumber:'',
        Gender:'',
        friends:[],
    })

    await user_profile.save();
    return res.send('signup was successful');
})

router.post('/login', (req, res) => {


    const found_user =  UserTemplate.findOne({
        userName: req.body.userName,
        password: req.body.password
    }).then((data) => {
      //  console.log(data)
        return res.send({_id:data._id,userName:data.userName})
    })

})

router.post('/profile/user',async (req, res) => {
    const userID= req.body.userID;
   // console.log('USER ID IS '+userID)
    await ProfileTemplate.findOne({
        _UserId:userID
    }).then((data) => {
        //console.log(data)
        return res.send(data)
    })
})

router.put('/profile', (req, res) => {

})

module.exports = router;