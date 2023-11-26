import React, { useEffect, useState } from 'react';
import classes from './Job.module.css';
import EmployeeLogo from '../../assets/Employe.svg';
import CurrencyLogo from '../../assets/Currency.svg';
import FlagLogo from '../../assets/Flag.svg';
import SkillTag from '../skillTag/SkillTag';
import ActionButton from '../actionButton/ActionButton';
import { useNavigate } from 'react-router';
import Navbar from '../navbar/Navbar';
import Dropdown from '../dropdown/Dropdown';
import FilterOption from '../filterOption/FilterOption';
import SearchIcon from '../../assets/SearchIcon.svg';

const Job = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState({});
  const [skills, setSkills] = useState([]);
  const [positions, setPositions] = useState([]);

  const onClickHandler = () => {
    navigate('/create-job');
  };
  useEffect(() => {
    let skillQuery = '';
    let positionQuery = '';
    if (skills.length) {
      skillQuery = `skillRequired=${skills.join(',')}`;
    }
    if (positions.length) {
      if (skills.length) positionQuery = `&jobPosition=${positions.join(',')}`;
      else {
        positionQuery = `jobPosition=${positions.join(',')}`;
      }
    }
    const searchQuery = skillQuery + positionQuery;
    console.log(searchQuery);
    fetch(`${process.env.REACT_APP_BASE_URL}/job?${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        // Update the state with filtered job data
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/job`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setJobs(data.jobs);
      })
      .catch((err) => console.log(err));
    console.log('jobs');
    console.log(jobs);
  }, []);
  return (
    <>
      <Navbar />
      <div className={classes.JobListing}>
        <div className={classes.FilterDiv}>
          <div className={classes.SearchBar}>
            <img src={SearchIcon} alt="" />
            <input type="text" />
          </div>
          <div className={classes.FilterDisplay}>
            <div className={classes.LeftDisplay}>
              <Dropdown filter="filter" options={['Skills', 'Job Type']} />
              <FilterOption />
            </div>
            {
              <div className={classes.RightDisplay}>
                {localStorage.getItem('token') && (
                  <ActionButton
                    text="+ Add Job"
                    textColor="#FFF"
                    bgColor="#ff6b6b"
                    fontSize="1.3em"
                    onClick={onClickHandler}
                  />
                )}
              </div>
            }
          </div>
        </div>
      </div>
      {jobs.length &&
        jobs?.map((job, index) => (
          <div className={classes.Job}>
            <img src={job.logoUrl} alt={job.companyName} />
            <div className={classes.JobMetadata}>
              <div className={classes.LeftSection}>
                <h3>{job.jobPosition}</h3>
                <div className={classes.Metadata2}>
                  <div className={classes.DataDiv}>
                    <img src={EmployeeLogo} alt="" />
                    <span>11-50</span>
                  </div>
                  <div className={classes.DataDiv}>
                    <img src={CurrencyLogo} alt="" />
                    <span>{job.monthlySalary}</span>
                  </div>
                  <div className={classes.DataDiv}>
                    <img src={FlagLogo} alt="" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className={classes.Metadata3}>
                  <span>{job.remoteOrOffice}</span>
                  <span>{job.jobType}</span>
                </div>
              </div>
              <div className={classes.RightSection}>
                <div className={classes.Skills}>
                  {job.skillsRequired.map((skill) => (
                    <SkillTag title={skill} />
                  ))}
                </div>
                <div className={classes.ActionButton}>
                  {localStorage.getItem('token') && (
                    <ActionButton
                      text="Edit job"
                      bgColor="#FFF"
                      textColor="#ED5353"
                    />
                  )}
                  <ActionButton
                    text=" View details"
                    bgColor="#ED5353"
                    textColor="#FFF"
                    onClick={() => navigate('/job/_id')}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Job;
