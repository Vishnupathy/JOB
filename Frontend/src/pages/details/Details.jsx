import React, { useEffect, useState, useContext } from 'react';
import classes from './Details.module.css';
import Navbar from '../../components/navbar/Navbar';
import MoneySvg from '../../assets/ph_money-fill.svg';
import DurarionSvf from '../../assets/uis_calender.svg';
import ActionButton from '../../components/actionButton/ActionButton';
import { useNavigate, useParams } from 'react-router';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [duration, setDuration] = useState();
  const [job, setJob] = useState({});

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const createdAtDate = new Date(job?.createdAt);
  const dateNow = new Date();
  const durationInMilliseconds = dateNow - createdAtDate;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const durationInDays = Math.floor(
    durationInMilliseconds / millisecondsPerDay
  );
  console.log('durationInDays');
  console.log(durationInDays);
  const token = localStorage.getItem('token');
  const [authorized, setAuthorized] = useState(false);

  const handleTokenDeletion = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthorized(false);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleTokenDeletion);

    return () => {
      window.removeEventListener('storage', handleTokenDeletion);
    };
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/job?${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('data');
        console.log(data.jobs[0]);
        setJob(data.jobs[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log('job');
  console.log(job);
  useEffect(() => {
    if (token) {
      setAuthorized(true);
    }
  }, [token]);
  const durationDisplay = () => {
    let duration;
    if (durationInDays === 0) {
      duration = 'Today';
    } else if (durationInDays !== 0 && durationInDays < 7) {
      duration = `${durationInDays} days ago`;
    } else if (durationInDays > 7) {
      let durationInWeeks = Math.round(durationInDays / 7);
      duration = `${durationInWeeks} weeks ago`;
    }

    return duration;
  };
  const handleEditJob = (jobId) => {
    navigate(`/create-job?id=${jobId}`);
  };
  useEffect(() => {
    const duration = durationDisplay();
    setDuration(duration);
  }, [job]);
  console.log(job._id);
  return (
    <div className={classes.DetailsPage}>
      <Navbar />

      <div className={classes.Details}>
        <div className={classes.JobOverview}>
          <h3>
            {job?.jobPosition} {job?.jobType} job at {job?.companyName}
          </h3>
        </div>
        <div className={classes.JobDetails}>
          <div className={classes.JobHead}>
            <span>{duration}</span>
            <span className={classes.Decorator}>.</span>
            <span>{job?.jobType}</span>
            <img className={classes.Logo} src={job?.logoUrl} alt="" />
            <span>
              {job?.companyName}{' '}
              {
                <div className={classes.ActionButton}>
                  {authorized && (
                    <ActionButton
                      text="Edit Job"
                      bgColor="#ED5353"
                      textColor="#fff"
                      onClick={() => handleEditJob(job?._id)}
                    />
                  )}
                </div>
              }
            </span>
          </div>
          <h2>{job?.jobPosition} </h2>
          <span>{job?.location} | India</span>
          <div className={classes.JobInfo}>
            <div>
              <span>
                <img src={MoneySvg} alt="" />
                Salary
              </span>
              <h3>Rs {job?.monthlySalary}/month</h3>
            </div>
            <div>
              <span>
                <img src={DurarionSvf} alt="" />
                Job Type
              </span>
              <h3> {job?.jobType}</h3>
            </div>
          </div>

          <h4 className={classes.Heading}>About Company</h4>
          <p className={classes.Paragraph}>{job?.aboutCompany}</p>
          <h4 className={classes.Heading}>About the job/internship</h4>
          <p className={classes.Paragraph}>{job?.jobDescription}</p>
          <h4>Skill(s) Required</h4>
          <div className={classes.Skill}>
            {job?.skillsRequired?.map((skill) => (
              <span className={classes.SkillTag}>{skill}</span>
            ))}
          </div>
          <h4 className={classes.Heading}>Additional Information</h4>
          <p className={classes.Paragraph}>{job?.information}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
