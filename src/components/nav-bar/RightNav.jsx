import React from 'react'
import "./rightnav.scss"
import { IoClose } from 'react-icons/io5'
import { FaCogs, FaEnvelope, FaHome, FaIdCard, FaSpinner, FaTachometerAlt, FaUser, FaWallet } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { formatString } from '../../utils';
import { Link } from 'react-router-dom';
import { MdOutlineVerified, MdVerified } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

function RightNav({ rightNav, handleRightNav }) {
  // const isAuthenticated = useSelector(state => state?.ekzaUser?.isAuthenticated);
  const user = useSelector(state => state?.ekzaUser?.user);

  const menuLinks = [
    // { logo: <FaHome size={25} />, text: "Home", path: "/" },
    { logo: <FaTachometerAlt size={20} />, text: "Dashboard", path: "/dashboard" },
    { logo: <FaEnvelope size={20} />, text: "Buy/Sell", path: "/trade" },
    { logo: <FaTachometerAlt size={20} />, text: "Wallet", path: "/wallet" },
    { logo: <FaTachometerAlt size={20} />, text: "Transactions", path: "/transactions" },
    { logo: <FaSpinner size={20} />, text: "Spinner", path: "/spinner" },
    { logo: <FaEnvelope size={20} />, text: "Contact", path: "/contact" },
    { logo: <FaUser size={20} />, text: "Profile", path: "/profile" },
    { logo: <FaCogs size={20} />, text: "Settings", path: "/settings" },
    { logo: <FaWallet size={20} />, text: "Accounts", path: "/accounts" },
    { logo: <FaIdCard size={20} />, text: "KYC", path: "/kyc" }
  ];

  return (
    <div className={`rightnav-layer ${rightNav ? "opennn" : "closed"}`} >
      <div className="right-nav-container"></div>
      <div className="rightnav-wrap" >
        <div className="close-add-btn" onClick={handleRightNav}>
          <IoClose size={20} />
        </div>
        <div className="rightnav-profile">
          <img className='user-avatar' src="data:image/png;base64,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" alt="" />
          <div className="user-info-section">
            <div className="welcom-wrap"><span>Welcome</span><h4>{user?.username}</h4></div>

            {/* <span style={{ color: "green" }}>Welcome to ekzatrade, where you Experience boundless crypto transactions</span> */}
            <h4>Email: {user?.email}</h4>
            {/* <h4>userId: {formatString(user._id)}</h4> */}
            <div className="verified-wrap"><span> Verified </span> <MdVerified size={20} color='green' /></div>
          </div>
        </div>
        <hr className='divide-line'/>


        <ul>
          {menuLinks.map((data) => (
            <Link to={data.path}><li ><span className='icon-wrap'><span>{data.logo}</span></span> <span className='tab-title'>{data.text}</span></li></Link>
          ))}
        </ul>
        <div className="logout-wrap">
        <Link to="/"><FiLogOut size={23} className='bold-icon'/></Link>
        </div>


      </div>
    </div>
  )
}

export default RightNav