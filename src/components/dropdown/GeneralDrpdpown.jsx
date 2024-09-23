import React, { useState } from 'react'
import { RiArrowDownSFill, RiBankFill } from 'react-icons/ri';
import nigeria from "../../assets/nigria.png"
import Usa from "../../assets/Usa.webp"
import "./general.scss"

export const GeneralDropdown = (props) => {
    const { items, handleOpenList, setSelectedItem, itemName, openList } = props;

  return (
    <div className='gd-container'>
        <div className="gd-item-select-wrap" onClick={handleOpenList}>
            {itemName === "NGN" ? 
            <img className='gd-select-image' src={nigeria} alt="" /> : 
            itemName === "USD" ? 
            <img className='gd-select-image' src={Usa} alt="" /> : 
            <RiBankFill size={24} />
            }
            <span className='gd-select-title'>{itemName}</span>
            <RiArrowDownSFill  size={24}/>
        </div>
        <div 
            className={`gd-item-list-wrap ${openList ? "gd-openlist": "gd-openclose"}`}
            style={{height: items?.length <= 6 && "max-content"}}
            >
            {items?.map((item)=> (<div className={`gd-item-list`} >
                <div 
                    className="gd-item-picker"
                    onClick={() => {
                        setSelectedItem(item.name || item);
                        handleOpenList();
                    }}
                >
                    {item.image && <img className='gd-select-image' src={item.image} alt="" />}
                    <span >{item.bankName || item.name}</span>
                    <span>{item?.accountNumber || null}</span>
                </div>
            </div>))}
        </div>
    </div>
  )
}
