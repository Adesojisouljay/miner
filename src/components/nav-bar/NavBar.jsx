import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import miner from "../../assets/miner.png";
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export const NavBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state?.apexMiner?.isAuthenticated);
  const user = useSelector(state => state?.apexMiner?.user);
  const [nav, setNav] = useState(true)

  const handleNav = ()=>{
    setNav(!nav)
  }

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
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/spinner">Spinner</Link></li>
          {user?.role === "admin" && <li><Link to="/controller">Controllers</Link></li>}
          <li><Link to="/contact">About</Link></li>
          
        </ul>

        <div className="login-toggle-wrap">
        {isAuthenticated ? (
            <Link to="/"><li onClick={handleLogout}>Logout</li></Link>
          ) : (
            <Link to="/login"><li className="login-btn">Login</li></Link>
          )}
        <div className="toggle" onClick={handleNav}>
            {!nav ? <AiOutlineClose className="close-icon" /> : <AiOutlineMenu  size={20} /> }
            
        </div>
        </div>
        
        <div className={!nav ? "side-nav " : "side-nav-else"}>
        <ul className="nav-side-link">
          <li  ><Link to="/">Home</Link></li>
          <li><Link to="/mining">Mining</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/contact">Dashboard</Link></li>
          {user?.role === "admin" && <li><Link to="/controller">Controllers</Link></li>}
          {isAuthenticated ? (
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
        </div>
      </div>
    </nav>
  );
};
