import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import miner from "../../assets/miner.png";
import loggo from "../../assets/loggo1.png";
import './navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaGreaterThan } from "react-icons/fa";
// import Profile from "../../assets/p";

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
          <h3 className='hhh'>Cam</h3>
          <img src={loggo} alt="" />
          <h3 className='fff'>dex</h3>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mining">Stake</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/spinner">Spinner</Link></li>
          {user?.role === "admin" && <li><Link to="/controller">Controllers</Link></li>}
          <li><Link to="/test">Testp-page</Link></li>
          
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
        
        <div className={!nav ? "side-nav transition-all " : "side-nav-else transition-all"} onClick={handleNav}>
          <div className="side-nav-wrap transition-all" >
            <div className="side-nav-top">
            <div className="menu-wrap">
            <h3>MENU</h3>
            <FaGreaterThan size={10} onClick={handleNav}/>
          </div>
          <ul className="nav-side-link">
          <li onClick={handleNav}><Link to="/">Home</Link></li>
          <li onClick={handleNav}><Link to="/mining">Stake</Link></li>
          <li onClick={handleNav}><Link to="/contact">Contact</Link></li>
          <li onClick={handleNav}><Link to="/dashboard">Dashboard</Link></li>
          {user?.role === "admin" && <li><Link to="/controller">Controllers</Link></li>}
          {isAuthenticated ? (
            <li><Link to="/" onClick={handleLogout} >Logout</Link></li>
          ) : (
            <li onClick={handleNav}><Link to="/login">Login</Link></li>
          )}
         </ul>
            </div>
            <div className="side-nav-button">
              <div className="side-nav-deposit-btn-wrap">
                <button>Deposit</button>
                <button>Withdrawal</button>
              </div>
              {/* <div className="profile-wrap">
                <img src="" alt="" />
                <h4>kesolink</h4>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
