import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RiArrowDownSFill } from 'react-icons/ri';
import { Dropdown } from '../dropdown/Dropdown';
import './deposit-modal.scss';

export const DepositHiveModal = ({ isOpen, onClose, assets, user }) => {

  // const user = useSelector(state => state.ekzaUser.user);

  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [openList, setOpenList] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedAsset?.depositAddress);
    toast.success("Address copied to clipboarc!",{
    style: {
      backgroundColor: 'rgba(229, 229, 229, 0.1)',
      color: '#fff',
      fontSize: '16px',
      marginTop: "60px"
    },
  });
  };
  
  const handleCopyMemo = () => {
    navigator.clipboard.writeText(selectedAsset?.memo);
    toast.success("Memo copied to clipboarc!", {
      style: {
        backgroundColor: 'rgba(229, 229, 229, 0.1)',
        color: '#fff',
        fontSize: '16px',
        marginTop: "60px"
      },
    });
  };

  const handleAssetChange = (e) => {
    const asset = assets?.find(asset => asset?.currency === e.target.value);
    setSelectedAsset(asset);
  };

  const handleOpencoinList = () => {
    setOpenList(!openList);
  };


  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`} >
    <div className={`modal-overlay  ${isOpen ? 'open' : ''}`} onClick={onClose}> </div>
      <div className="modal animate-slide-in  animate-slide-in-mobile">
        <span className="close-modal" onClick={onClose}>X</span>
        <h2>Deposit</h2>
        <div className='d-main'>
          <div className='d-coin-select-wrapper'>
            <div className="d-currency-select-wrap" onClick={handleOpencoinList}>
              <img className="d-coin-wrap" src={selectedAsset.image} alt="" />
              <span className='d-picker-currency'>{selectedAsset.currency}</span>
              <RiArrowDownSFill  size={24}/>
            </div>
            <Dropdown 
              user={user}
              setCurrency={setSelectedAsset} 
              handleOpencoinList={handleOpencoinList} 
              openList={openList}
            />
          </div>
        </div>
        <div className="deposit-address">
          {/* <span>Deposit Address:</span> */}
          <span>{selectedAsset?.depositAddress}</span>
          {<button className="generate-address-btn" onClick={handleCopyAddress}>Copy Address</button>}
        </div>
        <div className="deposit-address">
          <span>Deposit Memo</span>
          <span className='warning'>(please make sure you copy your memo correctly)</span>
          <span>{selectedAsset?.memo}</span>
          {<button className="generate-address-btn" onClick={handleCopyMemo}>Copy Memo</button>}
        </div>
      </div>
    </div>
  );
};
