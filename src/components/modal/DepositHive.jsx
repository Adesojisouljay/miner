import './deposit-modal.css';
import { useSelector } from 'react-redux';

export const DepositHiveModal = ({ isOpen, onClose }) => {

  const user = useSelector(state => state.apexMiner.user);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("souljay");
  };
  const handleCopyMemo = () => {
    navigator.clipboard.writeText(user._id);
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal">
        <span className="close-btn" onClick={onClose}>X</span>
        <h2>Deposit</h2> 
          <div className="deposit-address">
            <span>Deposit Address:</span>
            <span>souljay</span>
            {<button className="generate-address-btn" onClick={handleCopyAddress}>Copy Address</button>}
          </div>
          <div className="deposit-address">
            <span>Deposit Memo</span>
            <span className='warning'>(please make sure you copy your memo correctly)</span>
            <span>{user._id}</span>
            {<button className="generate-address-btn" onClick={handleCopyMemo}>Copy Address</button>}
          </div>
      </div>
    </div>
  );
};
