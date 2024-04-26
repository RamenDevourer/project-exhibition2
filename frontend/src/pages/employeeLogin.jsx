import React, {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {Routes, Route, redirect} from 'react-router-dom'
import { useNavigate,useParams,Link } from 'react-router-dom';
import './login_styles.css'
import Navbar from './navbar.jsx';

function EmployeeLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        await axios
        .post(`http://localhost:5555/employeeauth/login`, {"username" : username, "password" : password, "userType": "employee"})
        .then((res) => {
            setInvalid('');
            navigate(`/profile/${username}`);
            console.log(res);
            var token = res.data.accessToken;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userType', "employee");
        })
        .catch((error) => {
            setInvalid(error.response.data.message);
            console.log(error.message);
        })
    };


    return (
      <>
      <Navbar />
        <header>
            <h1>
                Navigating Careers, Anchoring Success
            </h1>
            <h2>
                Welcome to Hire Harbor
            </h2>
        </header>
        
        <div class="container">
            <div class="login">
                <div class="login-header">Employee Login</div>
                <div class="login-input">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div class="login-input">
                    <input
                        className='pass'
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div class="login-button"><button onClick={handleLogin}>Login</button></div>
                <span className='invalid'>{invalid}</span>
                <hr/>
                <span className='login-text'>Don't have an account?</span>
                <Link to='/employeeregister'><button className='register'>Register</button></Link>
            </div>
        </div>
      </>
    );
}

export default EmployeeLogin;
