import React, { useEffect, useState } from 'react';
import { approveKYC, rejectKYC, getAllKYC } from '../../api/kyc';
import { KycImageModal } from '../modal/KycImageModal';
import './manage-kyc.scss';


export const KYCManagement = () => {
  const [kycRecords, setKycRecords] = useState([]);
  const [modalImages, setModalImages] = useState({ idDocumentUrl: null, selfieUrl: null });

  useEffect(() => {
    const fetchKYCRecords = async () => {
      const records = await getAllKYC();
      setKycRecords(records);
    };

    fetchKYCRecords();
  }, []);

  const handleApprove = async (kycId) => {
    await approveKYC(kycId);
    const records = await getAllKYC();
    setKycRecords(records);
  };

  const handleReject = async (kycId) => {
    await rejectKYC(kycId);
    const records = await getAllKYC();
    setKycRecords(records);
  };

  const handleCompareClick = (idDocumentUrl, selfieUrl) => {
    setModalImages({ idDocumentUrl, selfieUrl });
  };

  const handleCloseModal = () => {
    setModalImages({ idDocumentUrl: null, selfieUrl: null });
  };

  return (
    <div className="kyc-management">
      <h1>KYC Management</h1>
      <ul className="kyc-list">
        {kycRecords?.map((record) => (
          <li key={record?._id} className="kyc-item">
            <div className="kyc-details">
              <p><strong>Name:</strong> {record?.firstName} {record?.otherName} {record?.lastName}</p>
              <p><strong>Status:</strong> <span className={`status-${record?.kycStatus}`}>{record?.kycStatus}</span></p>
              <div className="kyc-documents">
                <div className="document">
                  <p><strong>ID Document:</strong></p>
                    <img
                      src={record?.idDocument}
                      alt="ID Document"
                      className="kyc-image"
                    />
                </div>
                <div className="document">
                  <p><strong>Selfie:</strong></p>
                    <img
                      src={record?.selfie}
                      alt="Selfie"
                      className="kyc-image"
                    />
                </div>
              </div>
            </div>
            <div className="kyc-actions">
              <button
                className="btn compare"
                onClick={() => handleCompareClick(record?.idDocument, record?.selfie)}
              >
                Compare Images
              </button>
              {record?.kycStatus === 'Pending' && (
                <>
                  <button className="btn approve" onClick={() => handleApprove(record?._id)}>Approve</button>
                  <button className="btn reject" onClick={() => handleReject(record?._id)}>Reject</button>
                </>
              )}
              {record?.kycStatus === 'Verified' && (
                <p className="status-text verified">This KYC record has been approved.</p>
              )}
              {record?.kycStatus === 'Rejected' && (
                <p className="status-text rejected">This KYC record has been rejected.</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {modalImages.idDocumentUrl && (
        <KycImageModal 
          idDocumentUrl={modalImages.idDocumentUrl} 
          selfieUrl={modalImages.selfieUrl} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};
