import React from 'react'
import "./feature.css"
import btc from "../../assets/btc-icon.webp"
import lock from "../../assets/lock-iocn.webp"
import pig from "../../assets/pig-icon.webp"
import save from "../../assets/save-box-icon.webp"

export default function Feature() {
  return (
    <div>
      <div className="feature-text-wrap">
        <h1>Revolutionary Mining Platform with Exclusive </h1>
        <h1 className="fea-h1">Rewards Program</h1>
      </div>
      <div className="feature-wrap">
        <div className="box-left">
        <div className="box">
          <div className="box-text">
            <h2>Mobile Payment Make Easy</h2>
            <p>Add new, trending and rare artwork to your collection.</p>
          </div>
          <div className="feature-img">
          <img src={btc} alt="" />
          </div>
        </div>
        <div className="box">
          <div className="box-text">
            <h2>Lifetime Free Transaction</h2>
            <p>Add new, trending and rare artwork to your collection.</p>
          </div>
          <div className="feature-img">
          <img src={pig} alt="" />
          </div>
          
        </div>
        </div>
        <div className="box-right">
        <div className="box">
          <div className="box-text">
            <h2>Protect the Identity</h2>
            <p>Add new, trending and rare artwork to your collection.</p>
          </div>
          <div className="feature-img">
          <img  src={lock} alt="" />
          </div>
          
        </div>
        <div className="box">
          <div className="box-text">
            <h2>Security & Control Over Money</h2>
            <p>Add new, trending and rare artwork to your collection.</p>
          </div>
          <div className="feature-img">
          <img  src={save} alt="" />
          </div>
          
        </div>
        </div>
        
      </div>
    </div>
  )
}
