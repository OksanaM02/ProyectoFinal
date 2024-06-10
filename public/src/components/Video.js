import React from 'react';
import videoBg from '../assets/video.mp4';

const VideoBackground = () => {
  return (
    <div className='video-background'>
      <video src={videoBg} autoPlay loop muted />
      <div className="overlay"></div>
    </div>
  );
}

export default VideoBackground;
