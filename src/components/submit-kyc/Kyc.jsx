import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { submitKYC } from '../../api/kyc';
import './kyc.scss';

export const Kyc = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [selfie, setSelfie] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selfieTaken, setSelfieTaken] = useState(false)
  const [message, setMessage] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const selfieVideoRef = useRef(null);
  const seldieCanvasRef = useRef(null);

  const startCamera1 = async () => {
    setCameraActive(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      selfieVideoRef.current.srcObject = stream;
      selfieVideoRef.current.play();
    } catch (error) {
      console.error('Error accessing camera for selfie', error);
    }
  };

  const capturePhoto1 = () => {
    if (seldieCanvasRef.current && selfieVideoRef.current) {
      const context = seldieCanvasRef.current.getContext('2d');
      context.drawImage(selfieVideoRef.current, 0, 0, seldieCanvasRef.current.width, seldieCanvasRef.current.height);
      setSelfie(seldieCanvasRef.current.toDataURL('image/jpeg'));
      stopCamera(selfieVideoRef);
      setCameraActive(false);
      setSelfieTaken(true);
    }
  };

  const stopCamera = (videoRef) => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const idUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIdImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !selfie || !idImage) {
      setMessage('Please fill in all required fields and capture the images.');
      return;
    }
  
    try {
      const formData1 = new FormData();
      formData1.append('file', selfie);
      formData1.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
      
      const response1 = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData1);
      const imageUrl1 = response1.data.secure_url;
  
      const formData2 = new FormData();
      formData2.append('file', idImage);
      formData2.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
      
      const response2 = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData2);
      const imageUrl2 = response2.data.secure_url;
  
      const kycData = {
        firstName,
        lastName,
        otherName,
        selfie: imageUrl1,
        idDocument: imageUrl2,
      };
  
      await submitKYC(kycData);
      setSubmissionSuccess(true);
      setStep(4);
    } catch (error) {
      console.error('Error submitting KYC', error);
    }
  };  

  return (
    <div className="kyc-container">
      <h2>KYC Submission</h2>
      <form onSubmit={handleSubmit} className="form">
      <span>{message}</span>
        {step === 1 && (
          (!cameraActive && <div className="step step-1">
            <h3>Personal Information</h3>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              required
            />
            <input
              type="text"
              placeholder="Other Name"
              value={otherName}
              onChange={(e) => setOtherName(e.target.value)}
              className="input"
            />
          </div>)
        )}

          <div className="step">
            <h3>Selfie</h3>
            {selfie && <img src={selfie} alt="Captured Selfie" className="preview-image" />}
            {cameraActive && 
              <div className='video-frame'>
                <video ref={selfieVideoRef} className="video"></video>
            </div>
            }
                {!cameraActive ? 
                !selfieTaken && <button type="button" onClick={startCamera1} className="button">Take selfie</button> :
                <button type="button" onClick={capturePhoto1} className="button">Capture Selfie</button>
                }
        
          </div>

          {!cameraActive && <div className="step step-3">
            <h3>ID Document</h3>
            {idImage && <img src={idImage} alt="Uploaded ID" className="preview-image" />}
            <input
              type="file"
              accept="image/*"
              onChange={idUpload}
              className="input"
            />
          </div>}


        {step === 4 && submissionSuccess && (
          <div className="step step-4">
            <h3>KYC Submitted Successfully!</h3>
            <button type="button" className="button">
              <Link to="/dashboard">
                Return to Dashboard
              </Link>
            </button>
          </div>
        )}

        <canvas ref={seldieCanvasRef} style={{ display: 'none' }}></canvas>

        {!cameraActive && <div className="button-group">
            <button type="submit" className="submit-button">
              Submit KYC
            </button>
        </div>}
      </form>
    </div>
  );
};
