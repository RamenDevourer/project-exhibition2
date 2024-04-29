import React, {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {Routes, Route, redirect} from 'react-router-dom'
import { useNavigate,useParams,Link } from 'react-router-dom';
import './login_styles.css'
import Navbar from './navbar.jsx';

function EmployerLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        await axios
        .post(`http://localhost:5555/employeeauth/login`, {"username" : username, "password" : password, "userType": "employer"})
        .then((res) => {
            setInvalid('');
            navigate(`/jobpost/${username}`);
            console.log(res);
            var token = res.data.accessToken;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userType', "employer");
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
            <div className="login1">
                <div className="login-header">Employer Login</div>
                <div className="login-input">
                    <input className='pass'
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-input">
                    <input
                        className='pass'
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {<div className="login-button">
                    {
                        <button className='login' onClick={handleLogin}>Login</button>
                    }
                    </div> 
                }
                <span className='invalid'>{invalid}</span>
                <hr/>
                <span className='login-text'>Don't have an account?</span>
                <Link to='/employerregister'><button className='login'>Register</button></Link>
            </div>
        </div>
      </>
    );
}

export default EmployerLogin;
