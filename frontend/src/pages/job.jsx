import React, {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {Routes, Route, redirect} from 'react-router-dom'
import { useNavigate,useParams,Link } from 'react-router-dom';
import Navbar from './navbar.jsx';


function Job() {
    let { username,id } = useParams();
    const [job, setJob] = useState(0);
    const [mongoList, setMongoList] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState("loading");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5555/job/${id}`);
                setJob(res.data);
                setLoading("");
            } catch (error) {
                console.log(error, "try block error");
            }
        }

        fetchData();
    }, []);

    console.log(job.jobPosition);

    const handleApply = async () => {
        await axios
        .post(`http://localhost:5555/application/`, {"username" : username, "job_id" : id})
        .then((res) => {
            navigate(`/jobs/${username}`);
            console.log(res);
        })
        .catch((error) => {
            console.log(error.message);
        })
    };

    return (
      <>
        <Navbar />
        
        {job != 0 ? (
            <>
            <div className='job'>
                <div class="container">
                    <h1>Company Name: {job.companyName}</h1>
                    <h2>Job position: {job.jobPosition}</h2>
                    <h3>City: {job.city}</h3>
                    <h3>Salary: {job.salary}</h3>
                    <h3>Work Experience: {job.workExperience}</h3>
                    <h3>Start Date: {job.startDate.slice(0,10)}</h3>
                    <h3>Apply Till: {job.applyTill.slice(0,10)}</h3>
                    <h3>Additional Info From Employer: {job.additionalInfoFromEmployer}</h3>
                    <button onClick={handleApply} className='apply' id='apply-button'>Apply</button>
                </div>
            </div>
            </>
        ) : (
            <div>{loading}</div>
        )}
      </>
    );
}

export default Job;
