import { useState } from 'react';
import classes from './Register.module.css';
import Input from '../../components/input/Input';
import AuthPage from '../../components/authPage/AuthPage';
import PrimaryButton from '../../components/primaryButton/PrimaryButton';
import BgImg from '../../assets/image 466.png';
import { useNavigate } from 'react-router';
import JobListing from '../jobListing/JobListing';
const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [error, setError] = useState('');
  const [checkbox, setChecked] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const onChangeHandler = (fieldName, e) => {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [fieldName]: e.target.value,
    }));
  };

  const toggleCheckbox = () => {
    setChecked((prevState) => !prevState);
    console.log(checkbox);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log(userDetails);
      const url = `${BASE_URL}/register`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.token);
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('RecruiterName', data.recruiterName);
        navigate('/job');
      } else {
        setError(data?.error);
      }

      console.log(data.error);
      console.log(data);
    } catch (error) {
      console.log('Something went wrong . Try again later');
    }
  };

  return (
    <AuthPage bgImg={BgImg} title="Your Personal Job Finder">
      <form className={classes.RegisterForm}>
        <div>
          <h2>Create an account</h2>
          <p>Your personal job finder is here</p>
        </div>
        <div className={classes.RegisterInput}>
          <p className={classes.ErrorMessage}>{error}</p>
          <Input
            type="text"
            placeholder="Name"
            value={userDetails.name}
            onChange={(e) => onChangeHandler('name', e)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) => onChangeHandler('email', e)}
          />
          <Input
            type="phone"
            placeholder="Mobile"
            value={userDetails.mobile}
            onChange={(e) => onChangeHandler('mobile', e)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) => onChangeHandler('password', e)}
          />
        </div>
        <div className={classes.Terms}>
          <p>
            <input type="checkbox" onClick={toggleCheckbox} />
            By creating an account, I agree to our terms of use and privacy
            policy
          </p>
        </div>
        <PrimaryButton
          text="Sign up"
          fontSize="1.2em"
          style={{ fontSize: '1.2em', width: '40%' }}
          onClick={onSubmitHandler} // Call the onSubmitHandler on button click
        />
        <p>
          Already have an account? <span>Sign In</span>
        </p>
      </form>
    </AuthPage>
  );
};

export default Register;
