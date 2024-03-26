import React, { useEffect, useState } from 'react';
import { YOUTUBE_API } from '../utils/contants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos,setVideoes] = useState([]);

  useEffect(()=>{
    getvideoes()
    },[])

    const getvideoes = async()=>{
      const data = await fetch(YOUTUBE_API);
      const json = await data.json();
      // console.log(json); 
      setVideoes(json.items)
    }
  return (
    <div className='flex flex-wrap'>
      {videos?.map((video)=>{
       return <Link to ={"/watch?v="+video.id} key ={video.id}>
           <VideoCard info={video} />
        </Link>
      })}
    </div>
  )
}

export default VideoContainer