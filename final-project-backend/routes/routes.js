
const express = require('express');
const UserTemplate = require('../Models/UserModel')
const ProfileTemplate = require('../Models/ProfileModel')
const MessageTemplate = require('../Models/MessageModel')
const router = express.Router();
const upload = require("../upload_middleware");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const GridFsStream = require('gridfs-stream');
const UserModel = require('../Models/UserModel');
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
        FullName: req.body.fullName,
        Email: req.body.email,
        Details: '',
        PhoneNumber: '',
        Gender: 'Male',
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
        //console.log(data)
        return res.send({ _id: data._id, userName: data.userName })
    })

})

/* router.post('/profile/user', async (req, res) => {
    const userID = req.body.userID;
    // console.log('USER ID IS '+userID)
    await ProfileTemplate.findOne({
        _UserId: userID
    }).then((data) => {
        //console.log(data)
        return res.send(data)
    })
})
 */

router.get('/profile/:user_id', async (req, res) => {
    const userID = req.params.user_id;
    //console.log('USER ID IS ' + userID)
    await ProfileTemplate.findOne({
        _UserId: userID
    }).then((data) => {
        // console.log(data)
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

router.get('/profile/get_img/:user_id', async (req, res) => {
    await gfs.files.findOne({ filename: `${req.params.user_id}-profileIMG` }, (err, file) => {
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


            } else {
                res.send({ err: 'Not and image' });
            }
        }
    });
});



/* router.get('/get_all_img', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        console.log(files)
        if (!files || files.length === 0) {
            return res.send({ err: 'No File Exists' });
        }
        // Check if is image

        files.map(file => {
            if (file.contentType === "image/jpeg" || file.contentType === "image/png") {

            }

        }



    })
}); */



//-----------------------------------------------------------------
//upload profile img
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



//update profile data
router.put('/profile', async (req, res) => {
    const userID = req.body.userID;
    // console.log('USER ID IS '+userID)
    await ProfileTemplate.findOneAndUpdate({
        _UserId: userID
    }, {
        FullName: req.body.FullName,
        Email: req.body.Email,
        Details: req.body.Details,
        PhoneNumber: req.body.PhoneNumber,
        Gender: req.body.Gender,
    }).then((data) => {
        //console.log(data)
        return res.send('Profile Updated')
    })

})
//add new friend 
router.put('/add_friend', async (req, res) => {
    const userID = req.body.userID;

    const friend_to_add = await UserModel.findOne({ userName: req.body.FriendUserName });
    //console.log(friend_to_add)
    //Check if hes not already my friend
    const my_profile = await ProfileTemplate.findOne({ _UserId: userID });


    for (let friend of my_profile.friends) {
        if (String(friend) === String(friend_to_add._id)) {
            return res.send('Friend Already Added Dont Add Him Again');
        }
    }

    //friend is mutual so friend both of the users
    ProfileTemplate.findOneAndUpdate({ _UserId: userID }, { $addToSet: { friends: friend_to_add._id } }).then(res => {

        // console.log(res);
    }

    );

    ProfileTemplate.findOneAndUpdate({ _UserId: friend_to_add._id }, { $addToSet: { friends: userID } }).then(res => {

        //console.log(res);
    });

    return res.send('Friend  Added ');
})

//delete friend
router.post('/delete_friend', async (req, res) => {
    const friend_to_delete = req.body.friend_id_to_delete;
    const userID = req.body.userID;
    //console.log(friend_to_delete, userID)
    ProfileTemplate.findOneAndUpdate({ _UserId: userID }, { $pull: { friends: friend_to_delete } }).then(res => {
        // console.log(res);
    });

    ProfileTemplate.findOneAndUpdate({ _UserId: friend_to_delete }, { $pull: { friends: userID } }).then(res => {
        //console.log(res);
    });

    return res.send('Friend  Deleted ')


})


//post message for all of your friends
router.post('/Messages', async (req, res) => {

    const new_message = new MessageTemplate({
        _UserId: req.body.userID,
        MassageContent: req.body.massage_Content,
        Sent_By: req.body.Sender_name
    })


    await new_message.save();
    return res.send('Message successfully Posted');
})

router.get('/Messages', async (req, res) => {
    const message_list = await MessageTemplate.find();
    return res.send(message_list);
})



module.exports = router;