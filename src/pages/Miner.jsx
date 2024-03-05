import React, { useState, useEffect } from 'react';
import { WithdrawalModal } from '../components/modal/WithdrawalModal';
import { DepositModal } from '../components/modal/DepositModal';
import { startMining, transferMinedBalance, getUserMiningRecord } from '../api/mine';
import { useSelector } from 'react-redux';
import './miner.css';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/loader/Loader';

export const Miner = () => {
  const global = useSelector(state => state)
  const navigate = useNavigate()

  const [miningData, setMiningData] = useState(null);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  useEffect(() => {
    if(global.apexMiner?.isAuthenticated) {
      getMiningRecord()
      // console.log(global.apexMiner.user?.balance > 0)
    } else {
      navigate("/login")
    }
  }, [miningData])

  const getMiningRecord = async () => {
    try {
      const userId = global.apexMiner.user?._id;
  
      const response = await getUserMiningRecord(userId);
      if (!response) return;
      if (response.data.success) {
        setMiningData(response.data.miningRecord);
      } else {
        console.error('Failed to fetch mining record:', response.data.error);
        return null;
      }
    } catch (error) {
      console.error('Error fetching mining record:', error);
      // Handle the error here, such as setting a default mining record or displaying an error message to the user
    }
  };
  

  const handleStartMining = async () => {
    try {

      await startMining();

      await getMiningRecord();
    } catch (error) {
      console.error('Error starting mining:', error);
    }
  };

  const handleTransferMinedBalance = async () => {
    try {
      await transferMinedBalance();

      await getMiningRecord();

    } catch (error) {
      console.error('Error transferring mined balance:', error);
    }
  };

  const handleOpenWithdrawalModal = () => {
    setIsWithdrawalModalOpen(true);
  };

  const handleCloseWithdrawalModal = () => {
    setIsWithdrawalModalOpen(false);
  };

  const handleWithdraw = (amount) => {
    console.log('Withdraw amount:', amount);
    setIsWithdrawalModalOpen(false);
  };

  const handleOpenDepositModal = () => {
    setIsDepositModalOpen(true);
  };
  
  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
  };  

  return (
    <>
      <div className="miner-container">
        <div className="user">
          <h3>Deposit balance: {global.apexMiner.user?.balance} USDT</h3>
        </div>
        <div className="button-mine">
          <button onClick={handleOpenDepositModal}>Deposit</button>
          <button onClick={handleOpenWithdrawalModal}>Withdraw</button>
          <button onClick={handleTransferMinedBalance}>Transfer  mined</button>
        </div>
        <div className="description">
          {!miningData ? <h1>You can start your mining after your first deposit</h1> :
          <h1>You are mining at {miningData?.miningRate.toFixed(10)}/sec</h1>
          }     
        </div>
        <div className="mining-details">
          {miningData?.isMining &&  (
            <>
              <p>Mining Rate: {miningData?.miningRate.toFixed(10)}</p>
              <p>Total Mined: {miningData?.totalMined.toFixed(10)}</p>
            </>)}
            {(global.apexMiner.user?.balance > 0 && !miningData?.isMining) &&
              <button onClick={handleStartMining}>Start mining</button> }
              {global.apexMiner.user?.balance < 0 && <h2>You must deposit to start mining</h2>}
        </div>
          {global.apexMiner?.isLoading && 
        <Loader/>
        }
      </div>
        <>
        <WithdrawalModal 
          isOpen={isWithdrawalModalOpen} 
          onClose={handleCloseWithdrawalModal} 
          onWithdraw={handleWithdraw}
        />
        <DepositModal 
          isOpen={isDepositModalOpen} 
          onClose={handleCloseDepositModal} 
        />
        </>
    </>
  );
};
