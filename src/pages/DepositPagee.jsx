import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './deposit-page.scss';

export const DepositPage = () => {
  const user = useSelector(state => state.ekzaUser.user);
  const assets = user.assets

  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedAsset?.depositAddress);
    toast.success("Address copied to clipboard!", {
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
    toast.success("Memo copied to clipboard!", {
      style: {
        backgroundColor: 'rgba(229, 229, 229, 0.1)',
        color: '#fff',
        fontSize: '16px',
        marginTop: "60px"
      },
    });
  };

  const handleAssetChange = (e) => {
    const asset = user.assets?.find(asset => asset?.currency === e.target.value);
    setSelectedAsset(asset);
  };

  return (
    <div className="deposit-page">
      <h2>Deposit</h2>
      <div className="deposit-asset">
        <label htmlFor="asset-select">Select Asset:</label>
        <select
          id="asset-select" 
          onChange={handleAssetChange} 
          value={selectedAsset?.currency}
        >
          {assets.map(asset => (
            <option key={asset?.currency} value={asset?.currency}>{asset?.currency?.toUpperCase()}</option>
          ))}
        </select>
      </div>
      <div className="deposit-address">
        <span>Deposit Address:</span>
        <span>{selectedAsset?.depositAddress}</span>
        <button className="copy-btn" onClick={handleCopyAddress}>Copy Address</button>
      </div>
      <div className="deposit-address">
        <span>Deposit Memo</span>
        <span className='warning'>(please make sure you copy your memo correctly)</span>
        <span>{selectedAsset?.memo}</span>
        <button className="copy-btn" onClick={handleCopyMemo}>Copy Memo</button>
      </div>
    </div>
  );
};
