import React, { useState } from 'react'
import { RiArrowDownSFill, RiBankFill } from 'react-icons/ri';
import "./general.scss"

export const GeneralDropdown = (props) => {
    const { items, handleOpenList, selectedItem, item, openList } = props;
    
  return (
    <div className='gd-container'>
        <div className="gd-item-select-wrap" onClick={handleOpenList}>
            <RiBankFill size={24} />
            <span className='gd-select-title'>{item.bankName}</span>
            <RiArrowDownSFill  size={24}/>
        </div>
        <div className={`gd-item-list-wrap ${openList ? "gd-openlist": "gd-openclose"}`}>
            {items?.map((item)=> (<div className={`gd-item-list`} >
                <div 
                    className="gd-item-picker"
                    onClick={() => {
                        selectedItem(item);
                        handleOpenList();
                    }}
                >
                        <span >{item.bankName}</span>
                        <span>{item?.accountNumber}</span>
                </div>
            </div>))}
        </div>
    </div>
  )
}
