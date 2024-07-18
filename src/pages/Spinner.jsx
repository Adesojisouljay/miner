import React, { useRef, useState } from 'react';
import './spinner.scss';

const Spinner = () => {
  const wheelRef = useRef(null);
  const [result, setResult] = useState('');
  const value = useRef(0);

  const segments = [0, 2, 5, 10, 20, 40, 80, 160];
  const segmentAngle = 360 / segments.length;

  const handleSpin = () => {
    const spinValue = Math.ceil(Math.random() * 3600);
    value.current += spinValue;
    wheelRef.current.style.transform = `rotate(${value.current}deg)`;

    const rotation = value.current % 360;
    const segmentIndex = Math.floor(rotation / segmentAngle);
    const angleWithinSegment = rotation % segmentAngle;

    let selectedValue = 'null';
    if (angleWithinSegment > (segmentAngle / 4) && angleWithinSegment < (3 * segmentAngle / 4)) {
      selectedValue = segments[segmentIndex];
    }

    setTimeout(() => {
      setResult(`Result: ${selectedValue}`);
    }, 5000); 
  };

  return (
    <div className="spinner-wrap">
    <div className="container">
      <div className="spinBtn" onClick={handleSpin}>Spin</div>
      <div className="wheel" ref={wheelRef}>
        {segments.map((num, index) => (
          <div 
            key={index} 
            className="number" 
            style={{ '--i': index + 1, '--clr': `hsl(${index * segmentAngle}, 70%, 50%)` }}
          >
            <span>{num}</span>
          </div>
        ))}
      </div>
      <div className="result">{result}</div>
      <button onClick={handleSpin}>Spin</button>
    </div>
    </div>
  );
};

export default Spinner;