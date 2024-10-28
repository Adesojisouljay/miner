import React from 'react'
import "./rightnav.scss"
import { IoClose } from 'react-icons/io5'
import { FaCogs, FaEnvelope, FaHome, FaIdCard, FaSpinner, FaTachometerAlt, FaUser, FaWallet } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { formatString } from '../../utils';
import { Link } from 'react-router-dom';
import { MdOutlineVerified, MdPending, MdVerified } from 'react-icons/md';
import { userAvatar } from '../../vairables/protectedRoutes';
import { FiLogOut } from 'react-icons/fi';

function RightNav({ rightNav, handleRightNav, handleLogout }) {
  // const isAuthenticated = useSelector(state => state?.ekzaUser?.isAuthenticated);
  const user = useSelector(state => state?.ekzaUser?.user);

  const menuLinks = [
    // { logo: <FaHome size={25} />, text: "Home", path: "/" },
    { logo: <FaTachometerAlt size={20} />, text: "Dashboard", path: "/dashboard" },
    { logo: <FaTachometerAlt size={20} />, text: "Wallet", path: "/wallet" }, 
    { logo: <FaTachometerAlt size={20} />, text: "Transactions", path: "/transactions" },
    // { logo: <FaSpinner size={20} />, text: "Spinner", path: "/spinner" },
    // { logo: <FaEnvelope size={20} />, text: "Contact", path: "/contact" },
    { logo: <FaUser size={20} />, text: "Profile", path: "/profile" },
    // { logo: <FaCogs size={20} />, text: "Settings", path: "/settings" },
    // { logo: <FaWallet size={20} />, text: "Accounts", path: "/accounts" },
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
          <img className='user-avatar'
            src={user?.profileImage || userAvatar}
            alt="" 
          />
          <div className="user-info-section">
            <div className="welcom-wrap"><span>Welcome</span><h4>{user?.username}</h4></div>

            <h4>Email: {user?.email}</h4>
            {user?.kyc?.kycStatus === "Verified" ? <div className="verified-wrap"><span> {user?.kyc?.kycStatus} </span> <MdVerified size={20} color='green' /></div> :
            <div className="pending-wrap"><span> {user?.kyc?.kycStatus} </span> <MdPending size={20} color='orange' /></div>}
          </div>
        </div>
        <hr className='divide-line'/>

        <ul>
          {menuLinks.map((data) => (
            <Link to={data.path} onClick={handleRightNav}>
              <li style={{backgroundColor: "red"}}>
                <span className='icon-wrap' >
                  <span>
                    {data.logo}
                  </span>
                </span>
                <span className='tab-title'>
                  {data.text}
                </span>
              </li>
            </Link>
          ))}
        </ul>
        <div className="logout-wrap" onClick={handleLogout}>
          <h3>Logout</h3>
        <Link to="/"><FiLogOut size={23} className='bold-icon'/></Link>
        </div>


      </div>
    </div>
  )
}

export default RightNav