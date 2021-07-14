import React from 'react';
import Navbar from './Components/Navbar';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Pages/Home'
import SignUp from './Components/Pages/SignUp'
import Login from './Components/Pages/LoginPage'
import Profile from './Components/Pages/ProfilePage'
import Messages from './Components/Pages/Messages'
import Footer from './Components/Footer';
import './App.css'
export default function App() {
    return (
        <>
            <Router>
                <Navbar />
                <div id="whool_page">
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/SignUp' exact component={SignUp} />
                        <Route path='/Login' exact component={Login} />
                        <Route path='/Profile' exact component={Profile} />
                        <Route path='/Messages' exact component={Messages} />
                    </Switch>
                </div>
                <Footer />
            </Router>

        </>
    )
}
