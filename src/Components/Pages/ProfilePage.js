import React from 'react'
import './ProfilePage.css'
import Cookies from 'universal-cookie';
import $ from 'jquery'
import axios from '../../axios.config';
function ProfilePage() {
    const my_cookie = new Cookies();
    //------------------------------------------------------------------
    $(document).ready(async function () {
        await axios.post('/profile/user', { userID: my_cookie.get('ID') })
            .then((profile) => {

                $('#FullName_text_input').val(profile.data.FullName);
                $('#email_text_input').val(profile.data.Email);
                $('#Phone_input').val(profile.data.PhoneNumber);
                $('#details_input').val(profile.data.Details);

                const friends_div = document.querySelector("#friends_list figure");
                for (let i = 0; i < profile.data.friends.length; i++) {
                    axios.get(`/profile/get_img/${profile.data.friends[i]}`).then(res => {

                        friends_div.innerHTML += (`<img class="friend_img" id="friend_img_${i}" src="${res.data}" />`);
                    });
                }


                //check Gender
                if (profile.data.Gender === 'Female') {
                    $('#Female_checkbox').prop('checked', true);
                    $('#Male_checkbox').prop('checked', false);
                }
                else {
                    $('#Female_checkbox').prop('checked', false);
                    $('#Male_checkbox').prop('checked', true);
                }


            })
            .catch((err) => console.log('ERROR User Not Logged in Or Some Other Error'));


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

    });
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
        <div className="container-md mx-auto">
            <h1 id="Welcome_header">{my_cookie.get('UserName')}'s &ensp;Profile</h1>
            <div className="container-md mt-4">
                <div className="form-div">
                    <form id="register_form_div">
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
                        <div id="friends_list">
                            <label id="lb_Tag">friends List </label>
                            <figure>

                            </figure>
                        </div>

                        <input id="update_button" type="submit" className="btn btn-success" value="Update" onClick={UpdateProfileDataClick} />
                    </form>
                </div>
            </div>


        </div>
    )
}

export default ProfilePage
