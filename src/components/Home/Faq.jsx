import React, { useState } from 'react'
import { MdKeyboardArrowUp} from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import "./faq.css"

export default function Faq() {
    const [CurOpen, setCurOpen] = useState(null);
    const data = [
        {
          title: "What is Soj Miner?",
          text:
            "LessAccounting is 100% web-based, meaning it can be accessed from anywhere and there’s no software to install on your computer. You can easily use LessAccounting on your iPhone or any Android mobile device with our cloud accounting."
        },
        {
          title: "How to create account?",
          text:
          "LessAccounting is 100% web-based, meaning it can be accessed from anywhere and there’s no software to install on your computer. You can easily use LessAccounting on your iPhone or any Android mobile device with our cloud accounting."
        },
        {
          title: "Can i place withrawal instantly?",
          text:
          "LessAccounting is 100% web-based, meaning it can be accessed from anywhere and there’s no software to install on your computer. You can easily use LessAccounting on your iPhone or any Android mobile device with our cloud accounting."
        },
        {
            title: "How many % am i get every month",
            text:
            "LessAccounting is 100% web-based, meaning it can be accessed from anywhere and there’s no software to install on your computer. You can easily use LessAccounting on your iPhone or any Android mobile device with our cloud accounting."
          },
          {
            title: "Do i need a mining ring mine?",
            text:
            "LessAccounting is 100% web-based, meaning it can be accessed from anywhere and there’s no software to install on your computer. You can easily use LessAccounting on your iPhone or any Android mobile device with our cloud accounting."
          },
          {
            title: "Is this platform secured?",
            text:
              "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
          }

      ];
   
  return (
    <div className="accordion-wrap">
      <div className="accordion ">
         <h2>Frequently Asked Questions</h2>
    {data.map((el, i) => (
      <AccordionItem title={el.title} CurOpen={CurOpen} OnOpen={setCurOpen}  num={i} key={el.title}>
        text={el.text}
        </AccordionItem>   
    ))}
  </div>
    </div>
    
  )
}

function AccordionItem({ num, title, CurOpen, OnOpen, children }) {
    const isOpen= num ===CurOpen
    
  
    function handleToggle() {
      // setIsOpen((isOpen) => true);
      OnOpen(isOpen ? null : num)
    }
  
    return (
      <div className={`item ${isOpen ? "acc-open" : ""}`} onClick={handleToggle}>
        {/* <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p> */}
        <div className={`title-wrap ${isOpen ? "title-wrap-mb": ""}`}>
        <p className="titles">{title}</p>
        <p className="icon">{isOpen ? <RiArrowDownSLine size={30} /> : <MdKeyboardArrowUp size={30} />}</p>
        </div> 
        {isOpen && <div className={`content-box ${isOpen ? "content-box-mb" : ""} `}>{children}</div>}
      </div>
    );
  }
