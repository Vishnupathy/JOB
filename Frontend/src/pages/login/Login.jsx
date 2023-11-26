import React, { useState } from 'react';
import classes from './Login.module.css';
import Input from '../../components/input/Input';
import PrimaryButton from '../../components/primaryButton/PrimaryButton';
import AuthPage from '../../components/authPage/AuthPage';
import BgImg from '../../assets/image 466.png';

import { useNavigate } from 'react-router';

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const onChangeHandler = (fieldName, e) => {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [fieldName]: e.target.value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = `${BASE_URL}/login`;
      const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, option);

      const data = await response.json();
      console.log(data);
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('RecruiterName', data.recruiterName);
        navigate('/job');
      } else {
        setError(data?.error);
      }
    } catch (error) {
      console.error(error.message);
      console.log('Something went wrong . Try againg later');
    }
  };
  return (
    <AuthPage bgImg={BgImg} title="Your Personal Job Finder">
      <form className={classes.LoginForm}>
        <div>
          <h2>Already have an account?</h2>
          <p>Your personal job finder is here</p>
        </div>
        <div className={classes.LoginInput}>
          <p className={classes.ErrorMessage}>{error}</p>
          <Input
            type="email"
            value={userDetails.email}
            placeholder="Email"
            onChange={(e) => onChangeHandler('email', e)}
          />
          <Input
            type="password"
            value={userDetails.password}
            placeholder="Password"
            onChange={(e) => onChangeHandler('password', e)}
          />
        </div>
        <PrimaryButton
          text="Sign in"
          fontSize="1.2em"
          style={{ fontSize: '1.2em', width: '40%' }}
          onClick={onSubmitHandler}
        />
        <p>
          Dont have an account?{' '}
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </span>
        </p>
      </form>
    </AuthPage>
  );
};

export default Login;
