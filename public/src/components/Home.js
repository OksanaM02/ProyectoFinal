import React from 'react';
import VideoBackground from './Video';
import Content from './Contenido';
import Navbar from './Navbar';
import './Home.css';

const Main = () => {
  return (
    <div className='main'>
      <Navbar />
      <VideoBackground />
      <Content />
    </div>
  );
}

export default Main;
