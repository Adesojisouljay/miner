import React from 'react'
import "./contact.css"

export default function Contact() {
  return (
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
  )
}
