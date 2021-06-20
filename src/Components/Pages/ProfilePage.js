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
                //check Gender
                //$('#profile_img_show').attr("src", pic_data);
                //console.log(data)

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
        axios.post('/profile/upload_img', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => console.log(res));

    }

    function UpdateProfileDataClick(event) {
        event.preventDefault();

    }



    return (
        <div className="container-md mx-auto">
            <h1 id="Welcome_header">{my_cookie.get('UserName')}'s &ensp;Profile</h1>
            <div className="container-md mt-4">
                <div className="form-div">
                    <form id="register_form_div">

                        <input
                            type="text"
                            placeholder="Fullname"
                            id="FullName_text_input"
                            className="form-control form-group"
                        />

                        <input
                            type="email"
                            placeholder="email"
                            id="email_text_input"
                            className="form-control form-group"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            id="Phone_input"
                            className="form-control form-group"
                        />
                        <textarea
                            type="text"
                            rows={5}
                            cols={50}
                            placeholder="Describe Yourself"
                            id="details_input"
                            className="form-control form-group"
                        />

                        <div className="container-md mx-auto">
                            <label>Profile Image </label>
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
                            <label><input type="checkbox" value="" />Male</label>
                        </div>
                        <div className="checkbox">
                            <label><input type="checkbox" value="" />Female</label>
                        </div>

                        <div>friends List Div </div>

                        <input id="update_button" type="submit" className="btn btn-success" value="Update" onClick={UpdateProfileDataClick} />
                    </form>
                </div>
            </div>


        </div>
    )
}

export default ProfilePage
