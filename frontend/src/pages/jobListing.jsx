import React, {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {Routes, Route, redirect} from 'react-router-dom'
import { useNavigate,useParams,Link } from 'react-router-dom';
import "./job_search_styles.css"


function JobListing(props) {

    return (
      <>
        <div className="job-listing">
          <div className="header">
            <h1>
              <i className="fa-sharp fa-solid fa-chart-line"></i>Actively hiring
            </h1>
            <h2>{props.job.jobPosition}</h2>
            <h3>{props.job.companyName}</h3>
            <p><i className="fa-sharp fa-solid fa-location-dot"></i> {props.job.city}</p>
          </div>
          <div className="details"></div>
          <div className="actions">
            <h3>₹{props.job.salary}</h3>
            <a className='view'href={`/job/${props.username}/${props.job.employerUsername}`}>View details</a>
          </div>
        </div>
      </>
    );
}

export default JobListing;
