
const express = require('express');
const UserTemplate = require('../Models/UserModel')
const ProfileTemplate = require('../Models/ProfileModel')
const router = express.Router();
const upload = require("../upload_middleware");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const GridFsStream = require('gridfs-stream')
dotenv.config();
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
    const { _id } = await login_user.save();
    const user_profile = new ProfileTemplate({
        _UserId: _id,
        profile_img: '../public/profile-icon.png',
        FullName: req.body.fullName,
        Email: req.body.email,
        Details: '',
        PhoneNumber: '',
        Gender: '',
        friends: [],
    })

    await user_profile.save();
    return res.send('signup was successful');
})

router.post('/login', (req, res) => {


    const found_user = UserTemplate.findOne({
        userName: req.body.userName,
        password: req.body.password
    }).then((data) => {
        //  console.log(data)
        return res.send({ _id: data._id, userName: data.userName })
    })

})

router.post('/profile/user', async (req, res) => {
    const userID = req.body.userID;
    // console.log('USER ID IS '+userID)
    await ProfileTemplate.findOne({
        _UserId: userID
    }).then((data) => {
        //console.log(data)
        return res.send(data)
    })
})


//------------------------getting profile id from mongo db--------
let gfs;
const connect = mongoose.createConnection(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true });
connect.once('open', () => {
    // The monitoring database is turned on, and the file access control is carried out through gridfs-stream middleware and the database
    gfs = GridFsStream(connect.db, mongoose.mongo)
    gfs.collection('photos')
})

router.get('/profile/get_img/:user_id', (req, res) => {
    gfs.files.findOne({ filename: `${req.params.user_id}-profileIMG` }, (err, file) => {
        if (!file || file.length === 0) {
            return res.send({ err: 'No File Exists' });
        } else {
            // Check if is image
            if (file.contentType === "image/jpeg" || file.contentType === "image/png") {


                var read_stream = gfs.createReadStream(file.filename);
                let file_buff = [];
                read_stream.on('data', function (chunk) {
                    file_buff.push(chunk);
                });
                read_stream.on('error', e => {
                    console.log(e);

                });
                return read_stream.on('end', function () {
                    file_buff = Buffer.concat(file_buff);
                    const img = `data:image/png;base64,${Buffer(file_buff).toString('base64')}`;
                    res.send(img);
                });


                //console.og(readstream.pipe(res));l
            } else {
                res.send({ err: 'Not and image' });
            }
        }
    });
});



//-----------------------------------------------------------------

router.post('/profile/upload_img/:user_id', async (req, res) => {

    gfs.files.findOne({ filename: `${req.params.user_id}-profileIMG` }, (err, file) => {
        if (file) {
            gfs.files.removeOne({ _id: file._id });
        }
    });

    try {
        console.log(req.body);
        await upload(req, res);



        console.log(`USER ID IS ${req.params.user_id}`);
        if (req.file === undefined) {
            return res.send(`You must select a file.`);
        }

        return res.send(`File has been uploaded.`);
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }

});

router.get('/profile_img', async (req, res) => {


});


router.put('/profile', (req, res) => {


})

module.exports = router;