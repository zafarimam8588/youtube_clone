import React from 'react'

const VideoDescription = ({videoInfo}) => {
  return (
    <>
    <div className="m-5">
          <h1 className="text-ellipsis font-bold text-xl ">
            {videoInfo?.snippet?.title}
          </h1>
        </div>
        <div className="m-5 flex ">
        <img 
          className="mr-2"
         src="https://yt3.ggpht.com/ytc/AIf8zZR9ZquN21siKXYcAqkMzSu-GeDe2VEkwKvmyuV_=s48-c-k-c0x00ffffff-no-rj"/>
          <ul>
            <li className="font-bold text-gray-800 ml-2">
              {videoInfo?.snippet?.channelTitle}
            </li>
            <li className=" text-sm ml-2">2.56M Subscriber</li>
          </ul>
          <p className="flex">
            <button className="bg-black font-semibold text-white border border-gray-200 shadow-sm px-5 py-2 rounded-full m-2 ml-5">
              Subscribe
            </button>
            <button className="border flex border-gray-200 shadow-sm px-2 py-1 bg-gray-200 rounded-full m-2 hover:bg-gray-300 ml-32">
              {videoInfo?.statistics?.likeCount}
            </button>
            <button className=" flex border border-gray-200 shadow-sm px-2 py-1 bg-gray-200 rounded-full m-2 hover:bg-gray-300 ">
              Share
            </button>
            <button className="flex border border-gray-200 shadow-sm px-2 py-1 bg-gray-200 rounded-full m-2 hover:bg-gray-300 ">
              Download
            </button>
            <button className="border border-gray-200 shadow-sm px-1 py-1 bg-gray-200 rounded-full m-2 hover:bg-gray-300 ">...
            </button>
          </p>
        </div>
        </>
  )
}

export default VideoDescription