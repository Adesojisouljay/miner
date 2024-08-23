import React from "react";
import "./footer.css";
import circlebig from "../../assets/circle-big.webp"
import circlesmall from "../../assets/circle-small.webp"
import { BiLogoTelegram } from "react-icons/bi";

export default function Footer() {
  return (
    <div className="footer-main-wrap">
    <div className="contact-container" >
        <div className="contact-wrap">
            <h1>Have Any Questions?</h1>
            <div className="contact-box">
                <h2>Get In Touch Now</h2>
                <div className="input-wrap">
                    <input className="con-input-name" type="text" placeholder='Your Name' />
                    <input className="con-input-email" type="text" placeholder='Your Email' />
                </div>
                <input className="con-input-message" type="text" placeholder='Message...' />
                <div className="con-btn">
                <button>Send Message</button>
                </div>
                
            </div>
        </div>
    </div>
    <div>
      <div className="footer-container">
        <div className="footer-wrap">
            
          <div className="footer-text-wrap">
            <div className="footer-text-left">
            <div className="footer-box">
              <h3>Features</h3>
              <ul>
                <li>Contact</li>
                <li>Faq</li>
                <li>About</li>
              </ul>
            </div>
            <div className="footer-box">
              <h3>Features</h3>
              <ul>
                <li>hello</li>
                <li>hello</li>
                <li>hello</li>
              </ul>
            </div>
            </div>
            <div className="footer-box">
              <h3>SUBSCRIBE NEWSLETTER</h3>
              <p>Get all latest new when you subscribe to our new <br /> letter with your to keep you updated about Ekzatrade</p>
              <div className="newletter-wrap">
              <input type="text" placeholder="Email" />
              <div className="send-icon">
              <BiLogoTelegram size={35} color="black" />
              </div>
              </div>
            </div>
          </div>
          <div className="foooter-bm">
          <hr />
          <h3>Copyright © 2023 Soj. All rights reserved.</h3>
          </div>
          <div className="circle-wrap">
                <img className="circlebig" src={circlebig} alt="" />
                <img className="circlesmall" src={circlesmall} alt="" />
            </div>
          
        </div>
      </div>
    </div>
    </div>
  );
}
