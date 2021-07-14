import React from 'react'
import './Messages.css'
import Cookies from 'universal-cookie';
import $ from 'jquery'
import axios from '../../axios.config';

function Messages() {
    const my_cookie = new Cookies();

    $(document).ready(async function () {
        await axios.get('/Messages')
            .then((message_list) => {
                const  profile  = axios.get(`/profile/${my_cookie.get('ID')}`);
                console.log(profile)
                /*       for (const msg of message_list.data) {
                          var friend_flag = false;
         
                          for (const friend of profile.friends) {
                              if (friend === msg._UserId) {
                                  friend_flag = true;
                              }
                          }
         
         
                          //chekc if show message or not
                          if (msg._UserId === my_cookie.get('ID') || friend_flag) {
                              $('#all_firends_posts_div').append('<hr/>')
                              $('#all_firends_posts_div').append(`  <lable id="msg_name">${msg.Sent_By} </lable> <br/>`);
                              axios.get(`/profile/get_img/${msg._UserId}`).then(res => {
                                  //console.log(res);
                                  $('#all_firends_posts_div').append(`<img id="friend_img_msg" src="${res.data}"  /> <br/>`);
                              }).then(() => $('#all_firends_posts_div').append(' <br/><br/><hr/>'));
         
                              $('#all_firends_posts_div').append(`<lable id="msg_content">${msg.MassageContent} </lable> <br/>`)
                          }
         
                          friend_flag = false;
                      } */
            })
    })


    function PostNewMessageClick(event) {
        event.preventDefault();
        const message_content = $('#add_new_post_input').val();
        axios.post('/Messages', { userID: my_cookie.get('ID'), massage_Content: message_content, Sender_name: my_cookie.get('UserName') })
            .then(res => console.log(res))
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

            </div>



        </div>
    )
}

export default Messages
