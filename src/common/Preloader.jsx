import React from 'react';
import preloader from '../assets/preloader1.svg';
import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <img src={preloader} alt="" />
    </div>
  );
}

export default Preloader;
