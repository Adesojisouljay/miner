import './deposit-modal.scss';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const DepositHiveModal = ({ isOpen, onClose }) => {

  const user = useSelector(state => state.apexMiner.user);
  console.log(user)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("souljay");
    toast.success("Address copied to clipboarc!",{
    style: {
      backgroundColor: 'rgba(229, 229, 229, 0.1)',
      color: '#fff',
      fontSize: '16px',
    },
  });
  };
  const handleCopyMemo = () => {
    navigator.clipboard.writeText(user?._id);
    toast.success("Memo copied to clipboarc!", {
      style: {
        backgroundColor: 'rgba(229, 229, 229, 0.1)',
        color: '#fff',
        fontSize: '16px',
      },
    });
  };

  return (
    <div className={`fadded-container modal-overlay ${isOpen ? 'open' : ''}`} >
    <div className={`modal-overlay  ${isOpen ? 'open' : ''}`} onClick={onClose}> </div>
      <div className="modal animate-slide-in  animate-slide-in-mobile">
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
            <span>{user?._id}</span>
            {<button className="generate-address-btn" onClick={handleCopyMemo}>Copy Address</button>}
          </div>
      </div>
    
    </div>

    
  );
};
