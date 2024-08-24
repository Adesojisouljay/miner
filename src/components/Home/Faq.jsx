import React, { useState } from 'react'
import { MdKeyboardArrowUp } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import "./faq.css"

export default function Faq() {
    const [CurOpen, setCurOpen] = useState(null);
    const data = [
        {
          title: "What is EkzaTrade?",
          text:
            "EkzaTrade is a cutting-edge cryptocurrency exchange platform that allows users to trade, invest, and securely manage their digital assets. It offers a user-friendly interface and a variety of trading pairs to meet the needs of both new and experienced traders."
        },
        {
          title: "How do I create an account?",
          text:
            "Creating an account on EkzaTrade is simple and straightforward. Just click on the 'Register' button, fill in your details, and verify your email address to start trading. You'll be ready to buy and sell cryptocurrencies in no time!"
        },
        {
          title: "Can I withdraw funds instantly?",
          text:
            "EkzaTrade processes withdrawal requests swiftly. While most withdrawals are completed within minutes, the exact time can vary depending on the network conditions and the specific cryptocurrency being withdrawn."
        },
        {
            title: "What fees are associated with trading on EkzaTrade?",
            text:
            "EkzaTrade offers competitive trading fees. The exact percentage varies depending on the trading pair and your account tier. We also provide fee discounts for high-volume traders and those who hold our native tokens."
          },
          {
            title: "Do I need special equipment to trade on EkzaTrade?",
            text:
            "No special equipment is required. You can trade on EkzaTrade from any device with an internet connection, whether it's a desktop computer, laptop, or mobile device. Our platform is designed to be accessible and easy to use on all devices."
          },
          {
            title: "Is EkzaTrade a secure platform?",
            text:
              "Security is our top priority at EkzaTrade. We employ advanced security measures, including two-factor authentication (2FA), encrypted transactions, and cold storage for the majority of our assets to ensure your funds are safe at all times."
          }
      ];
   
  return (
    <div className="accordion-wrap">
      <div className="accordion">
         <h2>Frequently Asked Questions</h2>
    {data.map((el, i) => (
      <AccordionItem title={el.title} CurOpen={CurOpen} OnOpen={setCurOpen} num={i} key={el.title}>
        {el.text}
      </AccordionItem>   
    ))}
  </div>
    </div>
  )
}

function AccordionItem({ num, title, CurOpen, OnOpen, children }) {
    const isOpen = num === CurOpen;
    
    function handleToggle() {
      OnOpen(isOpen ? null : num);
    }
  
    return (
      <div className={`item ${isOpen ? "acc-open" : ""}`} onClick={handleToggle}>
        <div className={`title-wrap ${isOpen ? "title-wrap-mb" : ""}`}>
          <p className="titles">{title}</p>
          <p className="icon">{isOpen ? <RiArrowDownSLine size={30} /> : <MdKeyboardArrowUp size={30} />}</p>
        </div> 
        {isOpen && <div className={`content-box ${isOpen ? "content-box-mb" : ""}`}>{children}</div>}
      </div>
    );
  }
