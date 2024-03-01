import React from 'react';
import { Link } from 'react-router-dom';
import miner from "../../assets/miner.png";
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';

export const NavBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state?.apexMiner?.isAuthenticated);
  const user = useSelector(state => state?.apexMiner?.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo">
          <img src={miner} alt="" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mining">Mining</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user?.role === "admin" && <li><Link to="/controller">Controllers</Link></li>}
          {isAuthenticated ? (
            <li><a href="/" onClick={handleLogout}>Logout</a></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};
