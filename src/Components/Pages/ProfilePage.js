import React from 'react'
import './ProfilePage.css'
import Cookies from 'universal-cookie';
import $ from 'jquery'
import axios from '../../axios.config';
function ProfilePage() {
    const my_cookie = new Cookies();


    $(document).ready(async function () {
      await axios.post('/profile/user',{userID:my_cookie.get('ID')})
        .then((profile)=>{
            $('#FullName_text_input').val(profile.data.FullName);
            $('#email_text_input').val(profile.data.Email);
            $('#Phone_input').val(profile.data.PhoneNumber);
            //check Gender
            
           //console.log(data)
        
        })
        .catch((err)=>console.log('ERROR User Not Logged in Or Some Other Error'));


    });




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

                        <div>
                            <label>Profile Image </label>
                            <input
                                type="file"
                                placeholder="Profile Image"
                                id="img_upload_input"
                                className="form-control form-group"
                            />
                        </div>
                        <div className="checkbox">
                            <label><input type="checkbox" value="" />Male</label>
                        </div>
                        <div className="checkbox">
                            <label><input type="checkbox" value="" />Female</label>
                        </div>

                        <div>friends List Div </div>

                        <input id="update_button" type="submit" className="btn btn-success" value="Update" />
                    </form>
                </div>
            </div>


        </div>
    )
}

export default ProfilePage
