import React, { useContext, useEffect, useState } from 'react';
import BgImg from '../../assets/WallpaperDog-20567151 1.png';
import classes from './CreateJob.module.css';
import AuthPage from '../../components/authPage/AuthPage';
import Input from '../../components/input/Input';
import Textarea from '../../components/textarea/Textarea';
import Dropdown from '../../components/dropdown/Dropdown';
import ActionButton from '../../components/actionButton/ActionButton';
import { useNavigate, useLocation } from 'react-router-dom';

const initialJobDetails = {
  companyName: '',
  logoUrl: '',
  jobPosition: '',
  monthlySalary: '',
  jobType: 'Full Time',
  remoteOrOffice: 'In-Office',
  location: '',
  jobDescription: '',
  aboutCompany: '',
  skillsRequired: '',
  information: '',
};
const initialErrors = {
  companyName: '',
  logoUrl: '',
  jobPosition: '',
  monthlySalary: '',
  jobType: '',
  remoteOrOffice: '',
  location: '',
  jobDescription: '',
  aboutCompany: '',
  skillsRequired: '',
  information: '',
};

const CreateJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobIdToUpdate = queryParams.get('id');
  const [jobDetails, setJobDetails] = useState(initialJobDetails);
  const [errors, setErrors] = useState(initialErrors);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthorized(true);
    }
  }, [token]);

  const onChangeHandler = (fieldName, value) => {
    const updatedErrors = { ...errors };
    if (
      value.trim() === '' &&
      [
        'companyName',
        'logoUrl',
        'jobPosition',
        'jobType',
        'location',
        'remoteOrOffice',
        'jobDescription',
        'aboutCompany',
        'skillsRequired',
        'information',
      ].includes(fieldName)
    ) {
      updatedErrors[fieldName] = `Please enter a valid ${fieldName}.`;
    } else {
      updatedErrors[fieldName] = '';
    }

    if (fieldName === 'monthlySalary') {
      if (value !== '' && isNaN(value)) {
        updatedErrors[fieldName] = 'Monthly salary must be a number.';
      }
    }

    if (fieldName === 'skillsRequired') {
      const skillsArray = value.split(',').map((skill) => skill.trim());
      setJobDetails((prevJobDetails) => ({
        ...prevJobDetails,
        [fieldName]: skillsArray,
      }));
    } else {
      setJobDetails((prevJobDetails) => ({
        ...prevJobDetails,
        [fieldName]: value,
      }));
    }

    setErrors(updatedErrors);
  };

  const onCancelHandler = () => {
    navigate('/job');
  };
  useEffect(() => {
    // Fetch job details if updating an existing job
    if (jobIdToUpdate) {
      console.log(jobIdToUpdate);
      fetch(`${BASE_URL}/job/${jobIdToUpdate}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('UPDATE');
          console.log(data);
          console.log(data?.job);
          setJobDetails(data?.job);
        })
        .catch((err) => console.log(err));
    }
  }, [jobIdToUpdate]);
  const onSubmitHandler = async () => {
    const updatedErrors = {
      companyName:
        jobDetails.companyName?.trim() === ''
          ? 'Please enter a valid company name.'
          : '',
      logoUrl:
        jobDetails.logoUrl?.trim() === ''
          ? 'Please enter a valid logo URL.'
          : '',
      jobPosition:
        jobDetails.jobPosition?.trim() === ''
          ? 'Please enter a valid job position.'
          : '',
      monthlySalary:
        jobDetails.monthlySalary === ''
          ? 'Please enter a valid monthly salary.'
          : isNaN(jobDetails.monthlySalary)
          ? 'Monthly salary must be a number.'
          : '',
      jobDescription:
        jobDetails.jobDescription?.trim() === ''
          ? 'Please enter a valid job description.'
          : '',
      location:
        jobDetails.location?.trim() === ''
          ? 'Please enter a valid location.'
          : '',
      aboutCompany:
        jobDetails.aboutCompany?.trim() === ''
          ? 'Please enter valid information about the company.'
          : '',
      skillsRequired:
        jobDetails.skillsRequired?.length === 0
          ? 'Please enter the required skills.'
          : '',
      information:
        jobDetails.information === ''
          ? 'Please enter additional information.'
          : '',
    };

    setErrors(updatedErrors);

    const hasErrors =
      Object.values(updatedErrors).filter((error) => error !== '').length > 0;

    if (!hasErrors) {
      console.log(JSON.stringify(jobDetails));
      try {
        const url = jobIdToUpdate
          ? `${BASE_URL}/create-job/${jobIdToUpdate}`
          : `${BASE_URL}/create-job`;

        const options = {
          method: jobIdToUpdate ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobDetails),
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (!jobIdToUpdate) {
          setJobDetails(initialJobDetails); // Reset form after successful submission
        }
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
  };

  return (
    <>
      {authorized && (
        <AuthPage bgImg={BgImg} title={'Recruiter add job details here'}>
          <div className={classes.JobPostForm}>
            <div className={classes.InputSet}>
              <label>Company Name</label>
              <div className={classes.InputTest}>
                <Input
                  type="text"
                  value={jobDetails?.companyName}
                  placeholder="Enter your company name here"
                  onChange={(e) =>
                    onChangeHandler('companyName', e.target.value)
                  }
                />
                {errors.companyName && (
                  <p className={classes.Error}>{errors.companyName}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Add logo URL</label>
              <div className={classes.InputTest}>
                <Input
                  type="text"
                  value={jobDetails?.logoUrl}
                  placeholder="Enter the link"
                  onChange={(e) => onChangeHandler('logoUrl', e.target.value)}
                />
                {errors.logoUrl && (
                  <p className={classes.Error}>{errors.logoUrl}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Job Position</label>
              <div className={classes.InputTest}>
                <Input
                  type="text"
                  value={jobDetails?.jobPosition}
                  placeholder="Enter job Position"
                  onChange={(e) =>
                    onChangeHandler('jobPosition', e.target.value)
                  }
                />
                {errors.jobPosition && (
                  <p className={classes.Error}>{errors.jobPosition}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Monthly Salary</label>
              <div className={classes.InputTest}>
                <Input
                  className={classes.Input}
                  type="number"
                  value={jobDetails?.monthlySalary}
                  placeholder="Enter amount in rupees"
                  onChange={(e) =>
                    onChangeHandler('monthlySalary', e.target.value)
                  }
                />
                {errors.monthlySalary && (
                  <p className={classes.Error}>{errors.monthlySalary}</p>
                )}
              </div>
            </div>

            <div className={classes.InputSet}>
              <label>Job Type</label>
              <div className={classes.InputTest}>
                <Dropdown
                  className={classes.Input}
                  options={['Full Time', 'Part Time']}
                  value={jobDetails?.jobType}
                  onChange={(value) => onChangeHandler('jobType', value)}
                />

                {errors.jobType && (
                  <p className={classes.Error}>{errors.jobType}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Remote/office</label>
              <div className={classes.InputTest}>
                <Dropdown
                  className={classes.Input}
                  options={['Remote', 'In-Office']}
                  value={jobDetails?.remoteOrOffice}
                  onChange={(value) => onChangeHandler('remoteOrOffice', value)}
                />

                {errors.remoteOrOffice && (
                  <p className={classes.Error}>{errors.remoteOrOffice}</p>
                )}
              </div>
            </div>

            <div className={classes.InputSet}>
              <label>Location</label>
              <div className={classes.InputTest}>
                <Input
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.location}
                  placeholder="Enter location"
                  onChange={(e) => onChangeHandler('location', e.target.value)}
                />
                {errors.skillsRequired && (
                  <p className={classes.Error}>{errors.skillsRequired}</p>
                )}
              </div>
            </div>

            <div className={classes.InputSet}>
              <label>Job Description</label>
              <div className={classes.InputTest}>
                <Textarea
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.jobDescription}
                  placeholder="Type the job description"
                  onChange={(e) =>
                    onChangeHandler('jobDescription', e.target.value)
                  }
                />
                {errors.jobDescription && (
                  <p className={classes.Error}>{errors.jobDescription}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>About Company</label>
              <div className={classes.InputTest}>
                <Textarea
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.aboutCompany}
                  placeholder="Type about your company"
                  onChange={(e) =>
                    onChangeHandler('aboutCompany', e.target.value)
                  }
                />
                {errors.aboutCompany && (
                  <p className={classes.Error}>{errors.aboutCompany}</p>
                )}
              </div>
            </div>

            <div className={classes.InputSet}>
              <label>Skills Required</label>
              <div className={classes.InputTest}>
                <Input
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.skillsRequired}
                  placeholder="Enter the must have skills"
                  onChange={(e) =>
                    onChangeHandler('skillsRequired', e.target.value)
                  }
                />
                {errors.skillsRequired && (
                  <p className={classes.Error}>{errors.skillsRequired}</p>
                )}
              </div>
            </div>
            <div className={classes.InputSet}>
              <label>Information</label>
              <div className={classes.InputTest}>
                <Input
                  className={classes.Input}
                  type="text"
                  value={jobDetails?.information}
                  placeholder="Enter the additional information"
                  onChange={(e) =>
                    onChangeHandler('information', e.target.value)
                  }
                />
                {errors.information && (
                  <p className={classes.Error}>{errors.information}</p>
                )}
              </div>
            </div>
            <div className={classes.ActionButton}>
              <ActionButton
                text="Cancel"
                bgColor="#FFF"
                textColor="#ED5353"
                onClick={onCancelHandler}
              />
              <ActionButton
                text={jobIdToUpdate ? 'Update Job' : 'Add Job'}
                bgColor="#ED5353"
                textColor="#FFF"
                onClick={onSubmitHandler}
              />
            </div>
          </div>
        </AuthPage>
      )}
      {!authorized && <p> Please login or register to access this page !</p>}
    </>
  );
};

export default CreateJob;
