import React, { useState, useEffect } from 'react'
import './ProfilePage.css'
import Cookies from 'universal-cookie';
import $ from 'jquery'
import axios from '../../axios.config';
import DeleteForever from '@material-ui/icons/DeleteForever';
import DeleteModal from '../DeleteModal'
function ProfilePage() {
    const [isOpen, SetIsOpen] = useState(false);
    // eslint-disable-next-line
    const my_cookie = new Cookies();
    const [my_Profile, set_my_Profile] = useState(null)
    const [dataFetched, SetdataFetch] = useState(false)
    const [friends_profile_list, set_friends_list] = useState([])
    const fetchData = async () => {
        await axios.get(`/profile/${my_cookie.get('ID')}`).then((profile) => {
            set_my_Profile(profile.data);
            for (let i = 0; i < profile.data.friends.length; i++) {

                axios.get(`/profile/${profile.data.friends[i]}`).then(friend_profile => {
                    // console.log(i)
                    set_friends_list(friends_profile_list => [...friends_profile_list, friend_profile.data])

                });
            }

            var uniqueFriends = [];
            $.each(friends_profile_list, function (i, el) {
                if ($.inArray(el, uniqueFriends) === -1) uniqueFriends.push(el);
            });

            set_friends_list(uniqueFriends);
            SetdataFetch(true)





        })


    };

    useEffect(() => {
        fetchData()

        if (dataFetched) {
            add_data_toForm();
            SetImage_PreView();


        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataFetched]);


    function load_friend_images() {
        for (let i = 0; i < friends_profile_list.length; i++) {
            let s = "#friend_img_" + String(i);

            axios.get(`/profile/get_img/${friends_profile_list[i]._UserId}`).then(res => {
                $(s).attr("src", res.data)
                //  friends_div.innerHTML += (`<img class="friend_img" id="friend_img_${i}" src="${res.data}" /> `);

            })
        }
    }


    function show_friend_list() {
        //console.log(friends_profile_list)
        let items = []



        for (let i = 0; i < friends_profile_list.length; i++) {
            let s = "friend_img_" + String(i);
            items.push(<div key={i}>
                <img className="friend_img" id={s} alt="" />
                <label>{friends_profile_list[i].FullName}</label>
                <DeleteForever id="Delete_friend_link" onClick={() => SetIsOpen(true)} />
                <DeleteModal open={isOpen} Todelete={() => DeleteFriendClicked(i)} onClose={() => SetIsOpen(false)} /> </div>)



        }

        return (
            <div>
                {items}
            </div>
        )
    }


    function add_data_toForm() {

        $('#FullName_text_input').val(my_Profile.FullName);
        $('#email_text_input').val(my_Profile.Email);
        $('#Phone_input').val(my_Profile.PhoneNumber);
        $('#details_input').val(my_Profile.Details);

        //check Gender
        if (my_Profile.Gender === 'Female') {
            $('#Female_checkbox').prop('checked', true);
            $('#Male_checkbox').prop('checked', false);
        }
        else {
            $('#Female_checkbox').prop('checked', false);
            $('#Male_checkbox').prop('checked', true);


        }




    }
    function DeleteFriendClicked(i) {
        axios.post('/delete_friend', { friend_id_to_delete: friends_profile_list[i]._UserId, userID: my_cookie.get('ID') })
            .then(res => console.log(res))


    }
    //------------------------------------------------------------------


    /* 
            if (my_Profile != null) {
                for (let i = 0; i < my_Profile.friends.length; i++) {
                    axios.get(`/profile/${my_Profile.friends[i]}`).then(friend_profile => {
                        friends_profile_list[i] = friend_profile;
     
                    });
                }
                set_friends_list(friends_profile_list);
            }
            console.log(friends_profile_list) */

    /*    const friends_div = document.querySelector("#friends_list");
       */


    function SetImage_PreView() {
        let imagesPreview = function (input, placeToInsertImagePreview) {
            if (input.files) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    $($.parseHTML("<img>"))
                        .attr("src", event.target.result)
                        .css("width", "200px")
                        .appendTo(placeToInsertImagePreview);
                };
                reader.readAsDataURL(input.files[0]);
                //console.log(input.files);
            }

        };

        $("#img_upload_input").on("change", function () {
            $("div.preview-images").empty();
            imagesPreview(this, "div.preview-images");

        });

        axios.get(`/profile/get_img/${my_cookie.get('ID')}`).then(res => {
            //console.log("Profile Image Loaded");
            //console.log(res)
            $("#current_profile_img").val("<img>")
                .attr("src", res.data)
                .css("width", "200px")
        }
        );





    }


    //------------------------------------------------------------------ 
    function UploadImageClick(event) {
        event.preventDefault();
        /*        const file = $("#img_upload_input")[0].files[0];
               console.log(file);
               axios.post('/profile/upload_img', file,
                   {
                       headers:
                       {
                           'Content-Type': file.type
                       }
                   })
                   .then((res) => console.log(res));
        */

        var formData = new FormData();
        var imagefile = document.querySelector('#img_upload_input');
        formData.append("file", imagefile.files[0]);
        console.log(formData.get("file"));
        axios.post(`/profile/upload_img/${my_cookie.get('ID')}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => console.log(res));

    }

    function UpdateProfileDataClick(event) {
        event.preventDefault();
        var gen = 'Male';
        if ($('#Female_checkbox').prop("checked")) {
            gen = 'Female';
        }


        axios.put(`/profile`, {
            userID: my_cookie.get('ID'),
            FullName: $('#FullName_text_input').val(),
            Email: $('#email_text_input').val(),
            Details: $('#details_input').val(),
            PhoneNumber: $('#Phone_input').val(),
            Gender: gen,
        }).then((res) => console.log(res));
    }


    function AddFriendClicked(event) {
        event.preventDefault();
        axios.put(`/add_friend`, {
            userID: my_cookie.get('ID'),
            FriendUserName: $('#Friend_name_input').val()
        }).then((res) => console.log(res));
    }


    return (

        < div className="container-md mx-auto" >
            <h1 id="Welcome_header">{my_cookie.get('UserName')}'s &ensp;Profile</h1>

            <div className="container-md mt-4">
                <div className="form-div">

                    <form id="register_form_div"  >
                        <label id="lb_Tag"> Name </label>
                        <input
                            type="text"
                            placeholder="Fullname"
                            id="FullName_text_input"
                            className="form-control form-group"
                        />
                        <label id="lb_Tag"> Email </label>
                        <input
                            type="email"
                            placeholder="email"
                            id="email_text_input"
                            className="form-control form-group"
                        />
                        <label id="lb_Tag"> Phone Number </label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            id="Phone_input"
                            className="form-control form-group"
                        />
                        <label id="lb_Tag"> Describe Yourself </label>
                        <textarea
                            type="text"
                            rows={5}
                            cols={50}
                            placeholder="Describe Yourself"
                            id="details_input"
                            className="form-control form-group"
                        />

                        <div className="container-md mx-auto">
                            <label id="lb_Tag">Profile Image </label>
                            <img id="current_profile_img" alt="" />
                            <input
                                type="file"
                                name="file"
                                placeholder="Profile Image"
                                id="img_upload_input"
                                className="form-control form-group"
                            />
                            <div id="img_preview_div" className="preview-images"></div>
                            <input id="upload_img_button" type="submit" className="btn btn-dark mx-auto w-100" value="Upload" onClick={UploadImageClick} />
                        </div>

                        <div className="checkbox">
                            <label><input id="Male_checkbox" type="checkbox" value="" />Male</label>
                        </div>
                        <div className="checkbox">
                            <label><input id="Female_checkbox" type="checkbox" value="" />Female</label>
                        </div>
                        <div id="add_friend">
                            <label id="lb_Tag">Add Friend </label>
                            <input
                                type="text"
                                placeholder="Friend Profile Name"
                                id="Friend_name_input"
                                className="form-control form-group"
                            />
                            <input id="update_button" type="submit" className="btn btn-success" value="Add" onClick={AddFriendClicked} />
                        </div>
                        <div className="row mx-auto overflow-auto">
                            <div className="mx-auto mt-3" id="friends_list">
                                <label id="lb_Tag">friends List </label>

                                {show_friend_list()}
                                {load_friend_images()}

                            </div>
                        </div>

                        <input id="update_button" type="submit" className="btn btn-success" value="Update" onClick={UpdateProfileDataClick} />
                    </form>
                </div>
            </div >


        </div >
    )
}

export default ProfilePage
