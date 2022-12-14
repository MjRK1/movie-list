import React from 'react';
import './Background.css';
import background from '../../assets/background1.jpg';

function Background() {
  return (
    <div>
      <img src={background} alt="" className="background" />
    </div>
  );
}

export default Background;
