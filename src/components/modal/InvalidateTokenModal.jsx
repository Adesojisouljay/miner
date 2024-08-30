import { useNavigate } from "react-router-dom"
import "./invalid-token-modal.scss"
import { useState } from "react";

export const InvalidTokenModal = () => {
    const navigate = useNavigate();

    const [showModal, setShoeModal] = useState(true)

    const hideModal = () => {
        setShoeModal(!showModal);
        navigate('/login');
    }

    return (
        <>
            {showModal && <div className="modal">
                <div className="modal-content">
                    <h2>Session Expired</h2>
                    <p>Your session has expired. Please log in again.</p>
                    <button onClick={hideModal}>
                    Go to Login
                    </button>
                </div>
            </div>}
        </>
    )
  };