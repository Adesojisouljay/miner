import "./kyc-image-modal.scss"

export const KycImageModal = ({ idDocumentUrl, selfieUrl, onClose }) => {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>×</button>
          <div className="modal-images">
            <img src={idDocumentUrl} alt="ID Document" className="modal-image" />
            <img src={selfieUrl} alt="Selfie" className="modal-image" />
          </div>
        </div>
      </div>
    );
  };