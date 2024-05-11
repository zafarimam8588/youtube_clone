import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SideBarExpanded from "./SidebarExpended";
import { BASE_URL } from "../utils/contants";
import VideoMetaData from "./VideoMetaData";
import Comments from "./Comments";
import VideoSuggestions from "./VideoSuggestions";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../utils/appSlice";
import { useQuery } from "@tanstack/react-query";
import LiveChat from "./LiveChat"

const WatchPage = () => {
  // IMPLEMENT LIVE CHAT
  const [isLiveChatVisible,setIsLiveChatVisible] = useState(false)


  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v")

  const isSideBarOpen = useSelector((store) => store.app.isSideBarOpen);

  useEffect(() => {
    if (isSideBarOpen) {
      dispatch(toggleSideBar());
    }
  }, []);

  const getVideoDetail = async () => {
    const response = await fetch(
      BASE_URL +
        `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    const data = await response.json();
    return data.items[0];
  };

  
  const { data: videoDetails, isLoading } = useQuery({
    queryKey: ["watch-page", "video-details", videoId],
    queryFn: () => getVideoDetail(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });



 
  return isLoading ? null : (
    <div>
      <SideBarExpanded/>
      <div
        className={`min-h-[calc(100vh-4.62rem)] dark:bg-zinc-900 dark:text-white grid grid-cols-12 md:gap-x-8 px-4 md:px-12 2xl:px-24 gap-y-4 pt-4 overflow-x-hidden`}
      >
          <div className="col-span-12 lg:col-span-8  ">
            <div className="mb-4 ">
              <div className="player mb-4 h-[32vh] md:h-[50vh] lg:h-[50vh] 2xl:h-[70vh]">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                    title={videoDetails?.snippet?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
                    allowFullScreen
                  ></iframe>
              </div>
              <VideoMetaData
                videoDetails={videoDetails}
                channelId={videoDetails?.snippet?.channelId}
              />
            </div>
            <Comments
            videoId={videoId}
            commentCount={videoDetails?.statistics?.commentCount}
            />
          </div>
          <div className="col-span-12 lg:col-span-4 ">
            <div className="mb-4">
              <button
              className="ml-32 bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-gradient-tl-blue-purple hover:from-blue-600 hover:to-purple-600 hover:border-gradient-tr-blue-purple text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out" 
                onClick={()=> setIsLiveChatVisible((prev)=> !prev)}>
                {isLiveChatVisible ? "Hide Live Chat" : "Show Live chat"}
              </button>
                {isLiveChatVisible && <LiveChat/>}
            </div>
            <VideoSuggestions videoId={videoId} videoTitle={videoDetails?.snippet?.title} />
          </div>
      </div>
    </div>
  )
};

export default WatchPage;
