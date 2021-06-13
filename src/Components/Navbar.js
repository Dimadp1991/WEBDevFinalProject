import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import history from '../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faBookReader } from '@fortawesome/free-solid-svg-icons'
function Navbar( ) {

    const [click, setClick] = useState(false);
   
    //eslint-disable-next-line
    const user_coockie = new Cookies();
    const [authenticated,setAuth]=useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    const OnLogOut = () => {
        user_coockie.remove('ID');
        user_coockie.remove('UserName');
        history.push('/');
        window.location.reload();
    }

    useEffect(() => {
        setAuth(user_coockie.get('ID')!=null);
        if (authenticated) {
           
            $('#Login_link').css('display', 'none');
            $('#SignUp_link').css('display', 'none');

            $('#UserLogged_link').css('display', 'inline');
            $('#LogOut_link').css('display', 'inline');
            $('#Profile_link').css('display', 'inline');
            $('#Messages_link').css('display', 'inline');

        }
        else {
            $('#Login_link').css('display', 'inline');
            $('#SignUp_link').css('display', 'inline');

            $('#UserLogged_link').css('display', 'none');
            $('#LogOut_link').css('display', 'none');
            $('#Profile_link').css('display', 'none');
            $('#Messages_link').css('display', 'none');
        }

   
    },[authenticated,user_coockie]);


    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        <FontAwesomeIcon id="logo_icon_book" icon={faBookReader} />
                        DimiBook
                    </Link>
                </div>
                <div className="menu-icon" onClick={handleClick}>

                    <FontAwesomeIcon icon={click ? faTimes : faBars} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/profile'  id="Profile_link" className='nav-links' onClick={closeMobileMenu}>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to='/messages'  id="Messages_link" className='nav-links' onClick={closeMobileMenu}>
                            Messages
                        </Link>
                    </li>
                    <li>
                        <Link id="Login_link" to='/Login' className='nav-links' onClick={closeMobileMenu}>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" id="UserLogged_link" className='nav-links' onClick={closeMobileMenu}>
                            Welcome  {user_coockie.get('UserName')}
                        </Link>
                    </li>
                    <li>
                        <p id="LogOut_link" className='nav-links' onClick={OnLogOut}>
                            Logout
                        </p>
                    </li>
                    <li>
                        <Link to='/SignUp' id="SignUp_link" className='nav-links' onClick={closeMobileMenu}>
                            SignUp
                        </Link>
                    </li>

                </ul>

            </nav>
        </>
    )
}

export default Navbar
