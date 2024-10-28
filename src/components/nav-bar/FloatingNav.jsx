import React, { useState } from 'react';
import { CgMenuGridR } from "react-icons/cg";
import { NavLink } from 'react-router-dom';
import './floatingNav.scss';

const FloatingNav = () => {

  const [showMenu, setShowMenu] = useState(false)

  const toggleNav = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="floating-nav">
      {showMenu ?
      <>
      <NavLink to="/crypto-news" className="nav-link" activeClassName="active">Trending</NavLink>
      <NavLink to="/dashboard" className="nav-link" activeClassName="active">Dashboard</NavLink>
      <CgMenuGridR 
        className='float-nav-cg-menu'
        onClick={toggleNav}
      />
      <NavLink to="/wallet" className="nav-link" activeClassName="active">Wallet</NavLink>
      <NavLink to="/transactions" className="nav-link" activeClassName="active">Transactions</NavLink>
      <NavLink to="/walletmain" className="nav-link" activeClassName="active">Wallet-Main</NavLink> 
      </> :
      <CgMenuGridR
        className='float-nav-cg-menu'
        onClick={toggleNav}
      />}
    </div>
  );
};

export default FloatingNav;
