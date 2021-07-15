import React from 'react';
import './Messages.css';
import Cookies from 'universal-cookie';
import $ from 'jquery'
import axios from '../../axios.config';

function Messages() {


    const my_cookie = new Cookies();
    /*  const [friends_list, SetFriendsList] = useState(null);
 
     useEffect(() => {
       
     }, []); */

    $(document).ready(async function () {
        axios.get(`/profile/${my_cookie.get('ID')}`).then(res => {
            axios.get('/Messages')
                .then((message_list) => {

                    // axios.get(`get_all_img`).then((res) => console.log(res));

                    for (let i = 0; i < message_list.data.length; i++) {
                        let friend_flag = false;

                        for (const friend of res.data.friends) {
                            if (friend === message_list.data[i]._UserId) {
                                friend_flag = true;
                            }
                        }


                        //chekc if show message or not

                        if (message_list.data[i]._UserId === my_cookie.get('ID') || friend_flag) {

                            $('#all_firends_posts_div').append('<hr/>')
                            $('#all_firends_posts_div').append(`  <lable id="msg_name">${message_list.data[i].Sent_By} </lable> <br/>`);
                            $('#all_firends_posts_div').append(`<img class="friend_img_msg" id="friend_img_msg_${i}" src=""  /> <br/>`);
                            $('#all_firends_posts_div').append(`<lable id="msg_content">${message_list.data[i].MassageContent} </lable> <br/>`)
                            add_img(i, message_list.data[i]._UserId)


                        }

                        friend_flag = false;
                    }


                    $('#all_firends_posts_div').append(' <br/><br/><hr/>')

                });

        })

    })

    async function add_img(index, user_id) {

        await axios.get(`/profile/get_img/${user_id}`).then(res => {
            //console.log(res.data)
            $(`#friend_img_msg_${index}`).attr('src', res.data);
        }).catch(err => console.log(err))


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

            </div>



        </div>
    )
}

export default Messages
