import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar.jsx';
import './profile-styles.css';

function JobPost() {
    let { username } = useParams();
    const [invalid, setInvalid] = useState('');
    const [loading, setLoading] = useState('loading');
    const [jobPosition, setJobPosition] = useState('');
    const [employerUsername, setEmployerUsername] = useState(username);
    const [companyName, setCompanyName] = useState('');
    const [city, setCity] = useState('');
    const [salary, setSalary] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [applyTill, setApplyTill] = useState('');
    const [additionalInfoFromEmployer, setAdditionalInfoFromEmployer] = useState('');
    const [skills, setSkills] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5555/job/${username}`);
                setJobPosition(res.data.jobPosition);
                setEmployerUsername(res.data.employerUsername);
                setCompanyName(res.data.companyName);
                setCity(res.data.city);
                setSalary(res.data.salary);
                setWorkExperience(res.data.workExperience);
                setStartDate(new Date(res.data.startDate));
                setEndDate(new Date(res.data.endDate));
                setApplyTill(new Date(res.data.applyTill));
                setAdditionalInfoFromEmployer(res.data.additionalInfoFromEmployer);
                setSkills(res.data.skills);
                setLoading("");
            } catch (error) {
                console.log(error, "try block error");
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:5555/job/${username}`, {
                jobPosition,
                employerUsername,
                companyName,
                city,
                salary,
                workExperience,
                startDate,
                endDate,
                applyTill,
                additionalInfoFromEmployer,
                skills
            });
            navigate('/');
        } catch (error) {
            if (error.response) {
                setInvalid(error.response.data.message);
            }
            console.error(error.message);
        }
    };

    const handleRemove = async () => {
        try {
            await axios.put(`http://localhost:5555/job/${username}`, {
                "jobPosition" : null,
                employerUsername,
                "companyName": null,
                "city" : null,
                "salary": null,
                "workExperience": null,
                "startDate": null,
                "endDate": null,
                "applyTill":null,
                "additionalInfoFromEmployer": null,
                "skills" : null
            });
            navigate('/');
        } catch (error) {
            if (error.response) {
                setInvalid(error.response.data.message);
            }
            console.error(error.message);
        }
    };

    return (
        <>
            <Navbar />
            {loading != "loading" ? (
                <>
                <div className="container">
                <div className="profile">
                    <div className="profile-header">Job Post</div>
                    {/* Dropdown */}
                    <div className="profile-input">
                        <select className='dropbtn' value={jobPosition} onChange={(e) => setJobPosition(e.target.value)}>
                            <option value="">Select Field</option>
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="Data Analyst">Data Analyst</option>
                            <option value="Marketing Manager">Marketing Manager</option>
                            <option value="Web Developer">Web Developer</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Sales Representative">Sales Representative</option>
                            <option value="Administrative Assistant">Administrative Assistant</option>
                            <option value="Business Analyst">Business Analyst</option>
                            <option value="Executive Assistant">Executive Assistant</option>
                            <option value="Marketing Coordinator">Marketing Coordinator</option>
                            <option value="Operations Coordinator">Operations Coordinator</option>
                            <option value="IT Support Specialist">IT Support Specialist</option>
                            <option value="Orthopaedic Surgeon">Orthopaedic Surgeon</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Field Sales Executive">Field Sales Executive</option>
                            <option value="Chartered Accountant">Chartered Accountant</option>
                        </select>
                    </div>
                    <div className="profile-input">
                        <input placeholder="Enter Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className="profile-input">
                        <input placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="profile-input">
                        <input type="number" placeholder="Enter Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    </div>
                    <div className="profile-input">
                        <input type="number" placeholder="Enter Work Experience" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} />
                    </div>
                    <div className="profile-input">
                        Start Date:
                        <input type="date" value={startDate ? startDate.toISOString().split('T')[0] : ''} onChange={(e) => setStartDate(new Date(e.target.value))} />
                    </div>
                    <div className="profile-input">
                        Apply Till:
                        <input type="date" value={applyTill ? applyTill.toISOString().split('T')[0] : ''} onChange={(e) => setApplyTill(new Date(e.target.value))} />
                    </div>

                    <div className="profile-input">
                        <input placeholder="Enter Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                    </div>
                    <div className="profile-input">
                        <textarea  className='hello'placeholder="Enter Additional Info From Employer" value={additionalInfoFromEmployer} onChange={(e) => setAdditionalInfoFromEmployer(e.target.value)} />
                    </div>
                    <div className="profile-button">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    <span className='invalid'>{invalid}</span>
                    <div className="profile-button">
                        <button onClick={handleRemove}>Remove Posting</button>
                    </div>
                </div>
            </div>
                </>
            ) : (
                <>
                loading
                </>
            )}
            
        </>
    );
}

export default JobPost;
