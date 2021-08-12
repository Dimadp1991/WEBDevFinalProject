import React, { useState, useEffect } from 'react';
import './Messages.css';
import Cookies from 'universal-cookie';
import $ from 'jquery'
import axios from '../../axios.config';
import DeleteForever from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DeleteModal from '../DeleteModal'
import UpdateModal from '../UpdateModal'

function Messages() {

    const [isOpenDel, SetIsOpenDel] = useState(false);
    const [isOpenUp, SetIsOpenUp] = useState(false);
    const my_cookie = new Cookies();
    const [my_Profile, set_my_Profile] = useState(null)
    const [messages_list, SetMessagesList] = useState([]);
    const [dataFetched, SetdataFetch] = useState(false)
    const [IsAdmin, SetIsAdmin] = useState(false)

    const fetchMessageData = async () => {
        await axios.get(`/profile/${my_cookie.get('ID')}`).then(res => {
            set_my_Profile(res.data);
            axios.get('/Messages')
                .then((ml) => {

                    SetMessagesList(ml.data);

                })
            SetdataFetch(true)
        })

    };




    useEffect(() => {
        if (!dataFetched) {
            fetchMessageData()

        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function DeleteMessageClicked(i) {
        //add api call for delete massage

        //Message_ID
        axios.delete(`/Massages/${messages_list[i]._id}`).then(ret => console.log(ret))
        window.location.reload()
    }

    function UpdateMessage(new_message, i) {
        axios.put(`/Massages/${messages_list[i]._id}`, { massage_Content: new_message }).then(ret => console.log(ret))
        window.location.reload()


    }

    function show_Messages() {
        //check if user is admin 
        //user admin admin to check
        axios.post('/CheckAdmin', { userID: my_cookie.get('ID') }).then((res) => {
            SetIsAdmin(res.data);

        });

        if (IsAdmin) {

            let items = []
            //console.log(messages_list)
            for (let i = 0; i < messages_list.length; i++) {

                let s = "friend_msg_" + String(i);
                items.push(
                    <div className="whol_div_msg" key={i}>
                        <hr />
                        <img className="friend_img_msg" id={s} alt="" />
                        <label className="msg_name_tag">{messages_list[i].Sent_By}</label>
                        <label id="msg_content">{messages_list[i].MassageContent} </label> <br />
                        <DeleteForever className="msg_del_tag" onClick={() => SetIsOpenDel(true)} />
                        <DeleteModal open={isOpenDel} Todelete={() => DeleteMessageClicked(i)} onClose={() => SetIsOpenDel(false)} />
                        <EditIcon className="msg_eddit_tag" onClick={() => SetIsOpenUp(true)}></EditIcon>
                        <UpdateModal open={isOpenUp} ToUpdate={(updated_message) => UpdateMessage(updated_message, i)} onClose={() => SetIsOpenUp(false)} />
                        <hr />
                    </div >)

                var my_adminheight = $('#whool_page').height() + 200;


                $('#whool_page').height(my_adminheight);

            }


            return (
                <div>
                    {items}
                </div>
            )

        }



        // axios.get(`get_all_img`).then((res) => console.log(res));
        let items = []
        //console.log(messages_list)
        for (let i = 0; i < messages_list.length; i++) {
            let friend_flag = false;

            for (const friend of my_Profile.friends) {
                if (friend === messages_list[i]._UserId) {
                    friend_flag = true;
                }
            }


            //chekc if show message or not

            if (messages_list[i]._UserId === my_cookie.get('ID') || friend_flag) {
                let s = "friend_msg_" + String(i);

                if (friend_flag) {
                    items.push(
                        <div className="whol_div_msg" key={i}>
                            <hr />
                            <img className="friend_img_msg" id={s} alt="" />
                            <label className="msg_name_tag">{messages_list[i].Sent_By}</label>
                            <label id="msg_content">{messages_list[i].MassageContent} </label> <br />
                            <hr />
                        </div>)

                }
                else {
                    items.push(
                        <div className="whol_div_msg" key={i}>
                            <hr />
                            <img className="friend_img_msg" id={s} alt="" />
                            <label className="msg_name_tag">{messages_list[i].Sent_By}</label>
                            <label id="msg_content">{messages_list[i].MassageContent} </label> <br />
                            <DeleteForever className="msg_del_tag" onClick={() => SetIsOpenDel(true)} />
                            <DeleteModal open={isOpenDel} Todelete={() => DeleteMessageClicked(i)} onClose={() => SetIsOpenDel(false)} />
                            <EditIcon className="msg_eddit_tag" onClick={() => SetIsOpenUp(true)}></EditIcon>
                            <UpdateModal open={isOpenUp} ToUpdate={(updated_message) => UpdateMessage(updated_message, i)} onClose={() => SetIsOpenUp(false)} />
                            <hr />
                        </div >)


                }


                var my_height = $('#whool_page').height() + 200;


                $('#whool_page').height(my_height);

            }

            friend_flag = false;
        }

        return (
            <div>
                {items}
            </div>
        )

    }

    function add_images() {
        for (let i = 0; i < messages_list.length; i++) {
            axios.get(`/profile/get_img/${messages_list[i]._UserId}`).then(res => {
                let s = "#friend_msg_" + String(i);
                $(s).attr('src', res.data);
            }).catch(err => console.log(err))
        }

    }



    function PostNewMessageClick(event) {
        event.preventDefault();
        const message_content = $('#add_new_post_input').val();
        axios.post('/Messages', { userID: my_cookie.get('ID'), massage_Content: message_content, Sender_name: my_cookie.get('UserName') })
            .then(res => console.log(res))
        window.location.reload();
    }

    return (
        <div className="container-md mx-auto text-center" >
            <div id="add_new_post">
                <div className="form-div">
                    <form id="Post_message_form_div">
                        <textarea type="text" placeholder="Enter new Post Message"
                            id="add_new_post_input"
                            className="form-control form-group" />

                        <input id="post_message_button" type="submit" value="Post Message" onClick={PostNewMessageClick} />
                    </form>
                </div>
            </div>
            <div id="all_firends_posts_div" >
                <h1 id="h1_Posts"> Posts</h1>
                {show_Messages()}
                {add_images()}
            </div>



        </div>
    )
}

export default Messages
