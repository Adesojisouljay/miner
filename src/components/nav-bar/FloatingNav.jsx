import React from 'react';
import { NavLink } from 'react-router-dom';
import './floatingNav.scss';

const FloatingNav = () => {
  return (
    <div className="floating-nav">
      <NavLink to="/home" className="nav-link" activeClassName="active">Home</NavLink>
      <NavLink to="/dashboard" className="nav-link" activeClassName="active">Dashboard</NavLink>
      <NavLink to="/wallet" className="nav-link" activeClassName="active">Wallet</NavLink>
      <NavLink to="/transactions" className="nav-link" activeClassName="active">Transactions</NavLink>
    </div>
  );
};

export default FloatingNav;
