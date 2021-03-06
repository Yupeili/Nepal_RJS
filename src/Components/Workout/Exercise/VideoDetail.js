import React from 'react';

const VideoDetail = ({videos})=>{

  if(!videos){
    return <div>Loading...</div>;
  }
  /* Note: some videos are not playing in localhost on mobile phone, but if they are deployed it works properly, the following
  sample video works for both localhost and when deployed but if you want to throw in a value use the other line*/
  const videoID= videos;
  const url =`https://www.youtube.com/embed/${videoID}`;
  //const url =`http://www.youtube.com/embed/n_dZNLr2cME?autoplay=1`;

  return(
    <div>
    <iframe title="display-video" className="embed-responsive-item" src={url} allow="autoplay; encrypted-media" allowFullScreen/>
    </div>
  );
}


export default VideoDetail;
