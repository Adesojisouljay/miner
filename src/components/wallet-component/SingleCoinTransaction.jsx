import React from "react";
import "./single-coin-transaction.scss"

function SingleCoinTransaction() {
    const historyData = [
        { currency: "BTC", date: "2024-10-01 07:43:30", amount: "300.00", type: "Deposit" },
        { currency: "BTC", date: "2024-09-30 06:21:15", amount: "150.00", type: "Withdrawal" },
        { currency: "BTC", date: "2024-09-29 08:35:50", amount: "250.00", type: "Swap" },
        { currency: "BTC", date: "2024-09-28 09:17:42", amount: "500.00", type: "Transfer" },
        { currency: "BTC", date: "2024-09-27 10:10:30", amount: "120.00", type: "Deposit" },
        { currency: "BTC", date: "2024-09-26 11:45:12", amount: "300.00", type: "Withdrawal" },
        { currency: "BTC", date: "2024-09-25 12:00:00", amount: "100.00", type: "Transfer" },
        { currency: "BTC", date: "2024-09-24 01:30:50", amount: "400.00", type: "Swap" },
        { currency: "BTC", date: "2024-09-23 03:22:33", amount: "350.00", type: "Deposit" },
        { currency: "BTC", date: "2024-09-22 04:43:21", amount: "200.00", type: "Withdrawal" },
        { currency: "BTC", date: "2024-09-21 05:19:10", amount: "250.00", type: "Transfer" },
        { currency: "BTC", date: "2024-09-20 06:15:45", amount: "150.00", type: "Swap" },
        { currency: "BTC", date: "2024-09-21 05:19:10", amount: "250.00", type: "Transfer" },
        { currency: "BTC", date: "2024-09-21 05:19:10", amount: "250.00", type: "Transfer" },
        { currency: "BTC", date: "2024-09-21 05:19:10", amount: "250.00", type: "Transfer" }
      ];
  return (
    <div className="single-history-wrap">
      <div className="history-select-wrap">
        <div>Transaction History</div>
        <select name="" id="">
          <option value="">All</option>
          <option value="">Deposit</option>
          <option value="">Withdral</option>
          <option value="">Transfer</option>
        </select>
      </div>

      <div className="history-list">
        {historyData.map((item, index) => (
          <div key={index} className="history-item">
            <div className="wrap">
              <span>{item.currency}</span>
              <span>{item.date}</span>
            </div>
            <div className="wrap">
              <span>{item.amount}</span>
              <span>{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleCoinTransaction;
