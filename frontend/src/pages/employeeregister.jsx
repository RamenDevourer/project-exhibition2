import React, {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {Routes, Route, redirect} from 'react-router-dom'
import { useNavigate,useParams,Link } from 'react-router-dom';
import './login_styles.css'
import Navbar from './navbar.jsx';

function EmployeeRegister() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState('');
    const navigate = useNavigate();

    // const handleRegister = async () => {
    //     await axios
    //     .post(`http://localhost:5555/employeeauth/register`, {"username" : username, "password" : password, "userType": "employee"})
    //     .then((res) => {
    //         setInvalid('');
    //         // navigate('/create');
    //         navigate('/employeelogin');
    //         console.log(res);
    //         var token = res.data.accessToken;
    //         localStorage.setItem('accessToken', token);
    //         localStorage.setItem('userType', "employee");
    //     })
    //     .catch((error) => {
    //         setInvalid(error.response.data.message);
    //         console.log(error.message);
    //     })
    // };

    const handleRegister = async () => {
        await axios
            .post(`http://localhost:5555/employeeauth/register`, {"username" : username, "password" : password, "userType": "employee"})
            .then(async (res) => {
                setInvalid('');
                
                console.log(res);
                var token = res.data.accessToken;
                localStorage.setItem('accessToken', token);
                localStorage.setItem('userType', "employee");
    
                try {
                    console.log("username:",username);
                    const profileRes = await axios.post(`http://localhost:5555/profile/`, {"profile": {"username": username, "workExperienceYears1":0,"workExperienceYears2":0}});
                    console.log(profileRes);
                    navigate('/employeelogin');
                } catch (profileError) {
                    setInvalid(profileError.response.data.message);
                    console.error("Error creating profile:", profileError);
                }
            })
            .catch((error) => {
                setInvalid(error.response.data.message);
                console.log(error.message);
            });
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
            <div class="login1">
                <div class="login-header">Employee Register</div>
                <div class="login-input">
                    <input className='pass'
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
                <div class="login-button"><button  className='login'   onClick={handleRegister}>Register</button></div>
                <span className='invalid'>{invalid}</span>
                <hr/>
                <span className='login-text'>Already have an account?</span>
                <Link to='/employeelogin'><button className='login'>Login</button></Link>
            </div>
        </div>
      </>
    );
}

export default EmployeeRegister;
