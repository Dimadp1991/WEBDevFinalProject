import React from 'react';
import Navbar from './Components/Navbar';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Pages/Home'
import SignUp from './Components/Pages/SignUp'
import Login from './Components/Pages/LoginPage'
import Profile from './Components/Pages/ProfilePage'
export default function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route  path='/' exact component={Home} />
                    <Route path='/SignUp' exact component={SignUp} />
                    <Route path='/Login' exact component={Login} />
                    <Route path='/Profile' exact component={Profile} />
                </Switch>

            </Router>

        </>
    )
}
