import React from 'react'
import "./fiat-deposit.scss"
import { IoIosCopy } from "react-icons/io";
import { FaLessThan } from "react-icons/fa6";
import { useState } from 'react';
import { useEffect } from 'react';
import { getRandomMerchant } from "../api/ekzat";

function Fiatdeposit({ isOpen, onClose}) {
  const [depositAmout, setDepositAmount] = useState("")
  const [step, setStep] = useState(1)

  const nextStep = () =>{
    if(depositAmout => 1000 ){
      setStep(2)
    }
  }
  const getDepositMerchant = async ()=> {
    try {
      const merchants = await getRandomMerchant("66aab4a50f6c87eb67afde17")
      console.log(merchants)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    
  }, []);
  

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`} >
     <div className={`modal-overlay  ${isOpen ? 'open' : ''}`} onClick={onClose} > </div>
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
         <div className="modal-fiat animate-slide-in  animate-slide-in-mobile">
            {step === 1 && (<div className="fait-deposit-wrap">
                <h3>Fiat Deposit</h3> 
                <span className="close-btn" onClick={onClose} >X</span>
                <div className="fiat-deposit-amount">
                  <label className="">Enter amount to Deposit</label>
                  <input type="number"  placeholder='Eneter Amount' 
                  value={depositAmout} 
                  onChange={(e) => setDepositAmount(e.target.value)} 
                  />
                </div>
                

                <button onClick={nextStep}>Proceed</button>

            </div>)}
            {step === 2 && (
              <div className="bank-peer-wrap">
                <span className="close-btn" onClick={() =>{onClose(); setDepositAmount(""); setStep(1) } } >X</span>
                <div className="deposit-head-text-wrap">
                <span><FaLessThan size={15} onClick={()=>{setStep(1)}} /></span><h3>Deposit Amount</h3>
                </div>
                <h3>₦ <span>{depositAmout}</span></h3>
                <p>Transfer to </p>
                <div className="bank-details-wrap">
                  <div className="acc-num">
                  <h4>Account Number:</h4> <span className='copy-text-wrap'><span>2888208283820</span><IoIosCopy /></span>
                  </div>
                  <div className="bank-name">
                  <h4>Bank:</h4> <span className='copy-text-wrap'><span>GT Bank</span><IoIosCopy /></span>
                  </div>
                  <div className="acc-name">
                  <h4>Account Name:</h4> <span className='copy-text-wrap'><span>Umune kingsley</span><IoIosCopy /></span>
                  </div>
                </div>
                <button className="done-tranfer-btn">I Have Paid</button>
              </div>
            )}

         </div>
        </div>
    </div>

    
  )
}

export default Fiatdeposit