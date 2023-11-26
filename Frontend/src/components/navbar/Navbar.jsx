import React, { useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import Square1 from '../../assets/square1.svg';
import Rectangle1 from '../../assets/Rectangle1.svg';
import Rectangle2 from '../../assets/Rectangle2.svg';
import AvatarImage from '../../assets/image 2 (1).png';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../actionButton/ActionButton';
export const Navbar = () => {
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [token]);
  const logout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('RecruiterName');
    navigate('/job');
  };
  const greetingText = `Hello! ${localStorage.getItem('RecruiterName')}`;
  return (
    <div className={classes.Navbar}>
      <img src={Square1} className={classes.Square1} alt="" />
      <img src={Rectangle1} className={classes.Rectangle1} alt="" />
      <img src={Rectangle2} className={classes.Rectangle2} alt="" />
      <div className={classes.NavItem}>
        <h3 style={{ zIndex: 3 }}>JobFinder</h3>
        <div className={classes.RightNavItems}>
          {authorized ? (
            <>
              {' '}
              <span style={{ cursor: 'pointer' }} onClick={logout}>
                Logout
              </span>
              <p style={{ fontSize: '12px' }}>{greetingText}</p>
              <img src={AvatarImage} alt="" />
            </>
          ) : (
            <>
              <ActionButton
                text="LogIn"
                bgColor="#FFF"
                textColor="#ED5353"
                onClick={() => navigate('/login')}
              />
              <ActionButton
                text="Register"
                bgColor="#ED5353"
                textColor="#FFF"
                onClick={() => navigate('/register')}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
