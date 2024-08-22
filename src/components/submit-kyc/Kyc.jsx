import React, { useRef, useState } from 'react';
import axios from 'axios';
import { submitKYC } from '../../api/kyc';
import './kyc.scss';
import { Link } from 'react-router-dom';

export const Kyc = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [cameraActive1, setCameraActive1] = useState(true);
  const [cameraActive2, setCameraActive2] = useState(true);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  const startCamera1 = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef1.current.srcObject = stream;
      videoRef1.current.play();
    } catch (error) {
      console.error('Error accessing camera for selfie', error);
    }
  };

  const startCamera2 = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef2.current.srcObject = stream;
      videoRef2.current.play();
    } catch (error) {
      console.error('Error accessing camera for ID image', error);
    }
  };

  const capturePhoto1 = () => {
    if (canvasRef1.current && videoRef1.current) {
      const context = canvasRef1.current.getContext('2d');
      context.drawImage(videoRef1.current, 0, 0, canvasRef1.current.width, canvasRef1.current.height);
      setImage1(canvasRef1.current.toDataURL('image/jpeg'));
      stopCamera(videoRef1);
      setCameraActive1(false);
    }
  };

  const capturePhoto2 = () => {
    if (canvasRef2.current && videoRef2.current) {
      const context = canvasRef2.current.getContext('2d');
      context.drawImage(videoRef2.current, 0, 0, canvasRef2.current.width, canvasRef2.current.height);
      setImage2(canvasRef2.current.toDataURL('image/jpeg'));
      stopCamera(videoRef2);
      setCameraActive2(false);
    }
  };

  const stopCamera = (videoRef) => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!firstName || !lastName)) {
      console.log('First Name and Last Name are required to proceed.');
      return;
    }
    if (step === 2 && !image1) {
      console.log('Please capture and upload a selfie to proceed.');
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !image1 || !image2) {
      console.log('Please fill in all required fields and capture the images.');
      return;
    }
  
    try {
      const formData1 = new FormData();
      formData1.append('file', image1);
      formData1.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
      
      const response1 = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData1);
      const imageUrl1 = response1.data.secure_url;
  
      const formData2 = new FormData();
      formData2.append('file', image2);
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
  
      // Submit KYC data
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
        {step === 1 && (
          <div className="step step-1">
            <h3>Step 1: Personal Information</h3>
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
          </div>
        )}

        {step === 2 && (
          <div className="step step-2">
            <h3>Step 2: Capture Selfie</h3>
            {cameraActive1 ? (
              <div>
                <button type="button" onClick={startCamera1} className="button">Start Camera</button>
                <video ref={videoRef1} width="320" height="240" className="video"></video>
                <button type="button" onClick={capturePhoto1} className="button">Capture Selfie</button>
              </div>
            ) : (
              <img src={image1} alt="Captured Selfie" className="preview-image" />
            )}
        
          </div>
        )}

        {step === 3 && (
          <div className="step step-3">
            <h3>Step 3: Capture ID Document</h3>
            {cameraActive2 ? (
              <div>
                <button type="button" onClick={startCamera2} className="button">Start Camera</button>
                <video ref={videoRef2} width="320" height="240" className="video"></video>
                <button type="button" onClick={capturePhoto2} className="button">Capture ID</button>
              </div>
            ) : (
              <img src={image2} alt="Captured ID" className="preview-image" />
            )}
          </div>
        )}

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

        <canvas ref={canvasRef1} width="320" height="240" style={{ display: 'none' }}></canvas>
        <canvas ref={canvasRef2} width="320" height="240" style={{ display: 'none' }}></canvas>

        <div className="button-group">
          {step > 1 && step < 4 && (
            <button type="button" onClick={handlePreviousStep} className="button">
              Previous
            </button>
          )}
          {step < 3 && (
            <button type="button" onClick={handleNextStep} className="button">
              Next
            </button>
          )}
          {step === 3 && (
            <button type="submit" className="submit-button">
              Submit KYC
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
