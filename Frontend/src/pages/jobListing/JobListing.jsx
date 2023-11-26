import React, { useEffect, useState } from 'react';
import classes from './JobListing.module.css';
import EmployeeLogo from '../../assets/Employe.svg';
import CurrencyLogo from '../../assets/Currency.svg';
import FlagLogo from '../../assets/Flag.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import FilterOption from '../../components/filterOption/FilterOption';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Dropdown from '../../components/dropdown/Dropdown';
import ActionButton from '../../components/actionButton/ActionButton';
import SkillTag from '../../components/skillTag/SkillTag';

const skillsArray = [
  'ReactJS',
  'NodeJS',
  'MongoDB',
  'C++',
  'C',
  'Python',
  'HTML',
  'CSS',
  'Javascript',
];

const JobListing = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();

  const [selectedFilter, setSelectedFilter] = useState('');

  const BASE_URL = process.env.REACT_APP_BASE_URL;
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
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [token]);

  const onClickHandler = () => {
    navigate('/create-job');
  };

  useEffect(() => {
    let skillQuery = '';
    let positionQuery = '';
    if (skills.length > 0) {
      skillQuery = `skills=${skills.join(',')}`;
    }
    if (searchTerm) {
      positionQuery = `searchTerm=${searchTerm}`;
    }
    const searchQuery = [skillQuery, positionQuery].filter(Boolean).join('&');

    fetch(`${process.env.REACT_APP_BASE_URL}/job?${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
      })
      .catch((err) => console.log(err));
  }, [skills, searchTerm]);

  const handleSelectChange = (selectedValue) => {
    const skill = selectedValue;
    if (skill && !skills.includes(skill)) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    }
  };

  const handleEditJob = (jobId) => {
    navigate(`/create-job?id=${jobId}`);
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const clearSkills = () => {
    setSkills([]);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const onSearchSubmit = (searchValue) => {
    handleSearch(searchValue);
  };

  return (
    <>
      <Navbar />
      <div className={classes.JobListing}>
        <div className={classes.FilterDiv}>
          <div className={classes.SearchBar}>
            <img src={SearchIcon} alt="" />
            <input
              type="text"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onSearchSubmit(event.target.value);
                }
              }}
            />
          </div>
          <div className={classes.FilterDisplay}>
            <div className={classes.LeftDisplay}>
              <Dropdown
                filter="filter"
                options={skillsArray}
                onChange={(selectedValue) => handleSelectChange(selectedValue)}
              />
              <div className={classes.FilterOptionContainer}>
                {skills.length > 0 &&
                  skills.map((skill) => (
                    <FilterOption
                      key={skill}
                      value={skill}
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  ))}
                {skills.length > 0 && (
                  <button
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#ed5353',
                      position: 'absolute',
                      bottom: '0',
                      right: '230px',
                      fontSize: '1.2em',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                    onClick={clearSkills}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            {
              <div
                className={classes.RightDisplay}
                style={{ position: 'absolute', right: '120px' }}
              >
                {authorized && (
                  <ActionButton
                    text="Add Job"
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

        {jobs.length > 0 &&
          jobs.map((job) => (
            <div className={classes.Job} key={job._id}>
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
                      <SkillTag key={skill} title={skill} />
                    ))}
                  </div>
                  <div className={classes.ActionButton}>
                    {authorized && (
                      <ActionButton
                        text="Edit job"
                        bgColor="#FFF"
                        textColor="#ED5353"
                        onClick={() => handleEditJob(job._id)}
                      />
                    )}
                    <ActionButton
                      text=" View details"
                      bgColor="#ED5353"
                      textColor="#FFF"
                      onClick={() => navigate(`/job/${job._id}`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default JobListing;
