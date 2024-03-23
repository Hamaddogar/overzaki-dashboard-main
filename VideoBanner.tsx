import React, { useState } from 'react';

const VideoBanner = () => {
  const [video, setVideo] = useState({
    status: true,
    src: '/demo-video.mp4',
    borderRadius: '40px',
    heading: '', //Explain Heading
    description: '', //Explain description
    layout: '1,2', //What Layout
  });
  return (
    <div style={{ borderRadius: video?.borderRadius }} className="video-container h-[600px] ">
      <video autoPlay loop muted className="w-full object-cover h-full">
        <source src={video?.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBanner;
