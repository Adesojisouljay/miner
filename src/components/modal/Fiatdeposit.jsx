import React, { useEffect } from 'react'
import "./fiat-deposit.scss"
import { IoIosCopy } from "react-icons/io";
import { FaLessThan } from "react-icons/fa6";
import { useState } from 'react';
import { getRandomMerchant, createNairaDepositRequest } from '../../api/ekzat';

function Fiatdeposit({ isOpen, onClose}) {
  const [depositAmout, setDepositAmount] = useState("")
  const [step, setStep] = useState(1);
  const [narration, SetNarration] = useState("");
  const [merchantInfo, setMerchantInfo] = useState({})

  useEffect(() => {
    if (step === 2) {
      console.log("Merchant Info:", merchantInfo);
    }
  }, [step, merchantInfo]);

  const getMerchant = async () =>{
      const merchantData = await getRandomMerchant()
    try {     
      if(!depositAmout || Number(depositAmout) < 1000){
        return;
      } else {
        setMerchantInfo(merchantData)
        setStep(2)
      }
    } catch (error) {
      
    }
  }

  const createDeposit = async ()=> {
    const depositData = {
      amount: depositAmout,
      narration,
      merchantId: merchantInfo.data._id
    }
    try {
      const result = await createNairaDepositRequest(depositData);
      console.log(result);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`} >
     {/* <div className={`modal-overlay  ${isOpen ? 'open' : ''}`} onClick={onClose} > </div> */}
        {/* <div className={`modal-overlay ${isOpen ? 'open' : ''}`}> */}
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
                  <label className="">Enter narration</label>
                  <input type="text"  placeholder='Eneter narration' 
                  value={narration} 
                  onChange={(e) => SetNarration(e.target.value)} 
                  />
                </div>
                <button onClick={getMerchant}>Proceed</button>
            </div>
          )}
            {step === 2 && (
              <div className="bank-peer-wrap">
                <span className="close-btn" onClick={() =>{onClose(); setDepositAmount(""); setStep(1) } } >X</span>
                <div className="deposit-head-text-wrap">
                <span><FaLessThan size={15} onClick={()=>{setStep(1)}} /></span><h3>Deposit Amount</h3>
                </div>
                <h3>₦<span>{depositAmout}</span></h3>
                <p>Transfer to </p>
                <div className="bank-details-wrap">
                  <div className="acc-num">
                  <h4>Merchant:</h4> <span className='copy-text-wrap'><span>{merchantInfo?.data.nickname}</span><IoIosCopy /></span>
                  </div>
                  <div className="acc-num">
                  <h4>Account Number:</h4> <span className='copy-text-wrap'><span>{merchantInfo?.data.accountNumber}</span><IoIosCopy /></span>
                  </div>
                  <div className="bank-name">
                  <h4>Bank:</h4> <span className='copy-text-wrap'><span>{merchantInfo?.data.bankName}</span><IoIosCopy /></span>
                  </div>
                  <div className="acc-name">
                  <h4>Account Name:</h4> <span className='copy-text-wrap'><span>{merchantInfo?.data.accountName}</span><IoIosCopy /></span>
                  </div>
                </div>
                <button onClick={createDeposit} className="done-tranfer-btn">I have made payment</button>
              </div>
            )}

         {/* </div> */}
        </div>
    </div>
  )
}

export default Fiatdeposit