import React from 'react'

const Video = ({info}) => {
  // console.log(info)

  const snippet = info?.snippet;
  const statistics = info?.statistics;
  const thumbnails = snippet?.thumbnails;
  const title = snippet?.title;
  const channelTitle = snippet?.channelTitle;
  return (
    <div className="p-2 m-2 w-60 shadow-lg hover:scale-105">
    <img className="rounded-lg" alt="thumbnails" src={thumbnails?.medium?.url}/>
    <ul>
        <li className="font-semibold py-2">{title}</li>
        <li className='my-1'>{channelTitle}</li>
        <li className='font-thin'>{statistics.viewCount} views</li>
    </ul>
  </div>

  )
}

export default Video