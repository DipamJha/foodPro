import React from 'react';
import { useSelector } from 'react-redux';
import './history.css';

const History = () => {
  const { scanHistory } = useSelector((state) => state.scan);

  return (
    <div className="history-container">
      <div className="history-content">
        <h2 className="history-title">Scan History</h2>
        <div className="history-grid">
          {scanHistory.map((scan, index) => (
            <div key={index} className="history-card">
              <div className="history-card-header">
                <h3>{scan.date}</h3>
              </div>
              <div className="history-card-content">
                <p className="history-card-products">
                  {scan.products[0].name} vs {scan.products[1].name}
                </p>
                <p className="history-card-recommendation">
                  {scan.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;