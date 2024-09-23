import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Loader } from '../loader/Loader';
import './confirm-modal.scss';


export const ConfirmModal = ({ func, isOpen, onClose, loading }) => {

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-overlay  ${isOpen ? 'open' : ''}`} onClick={onClose}> </div>
        {loading && <Loader />}
        <div className="modal">
            <span className="close-modal" onClick={onClose}>X</span>
            {loading && <Loader />}
            <div className='confirm-modal-wrap'>
                <h3>Are you sure?</h3>
                <div className='confirm-button-wrapp'>
                    <button 
                        className='cancel-button'
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        style={{cursor: loading ? "not-allowed" : "pointer"}} 
                        disabled={loading} 
                        className="confirm-btn" 
                        onClick={func}
                        >Yes</button>
                </div>
            </div>
        </div>
    </div>
  );
};
