import { useRef, Fragment } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";

import { useSelector } from "react-redux";

import { BASE_URL } from "../utils/contants";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import useScroll from "../utils/useScroll";
import useIntersectionObserver from "./../utils/useIntersectionObserver";

const VideoContainer = () => {
  
  const {category} = useSelector(store => store.videoCategory);
  const bottomRef = useRef(null);
  // console.log("------------------------------------")
  // console.log(bottomRef)
  

  const onScreen = useIntersectionObserver(bottomRef, { threshold: 0.5 });

  const getVideoes = async(nextPageToken = "")=>{
    try{
        const response = await fetch(
          BASE_URL + 
          `/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=8&chart=mostPopular&regionCode=IN&pageToken=${nextPageToken ?? ""}&videoDuration=medium&key=` +
          process.env.REACT_APP_GOOGLE_API_KEY
        )
          const data = await response.json();
          // console.log(data)
          return data;
    } catch(error){
      console.log(error.message);
    }
  }

  const searchVideoByKeyword = async(searchText,nextPageToken="") =>{
    try{
      const response = await fetch(
        BASE_URL +
        `/search?part=snippet&maxResults=8&type=video&q=${searchText}&pageToken=${
          nextPageToken ?? ""
        }&videoDuration=medium&key=` +
        process.env.REACT_APP_GOOGLE_API_KEY
      )
      const data = await response.json();
      return data;
    } catch(error){
      console.log(error);
    }
  }
  // ALL ABOUT USEINFINITE REACT QUERY

  const{data,isLoading,fetchNextPage,isFetchingNextPage,isSuccess} = useInfiniteQuery({
    queryKey:["home-videos",category],
    queryFn:({pageParam = null}) =>{
      return category === "All" ? getVideoes(pageParam) : searchVideoByKeyword(category, pageParam)
    },
    getNextPageParam : (lastPage,pages) =>{
      return lastPage?.nextPageToken;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false, 
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24, // READ MORE ABOUT THIS
    cacheTime: 1000 * 60 * 60 * 24, // READ MORE ABOUT THIS
  })
  // console.log(data);


  onScreen && fetchNextPage()
  
  return isLoading ? (
    <div>
      <Shimmer/>
    </div>
    ) : (
      <div
      className=" flex flex-wrap gap-x-4 gap-y-8 pt-6 px-4  ">
        {isSuccess && 
          data?.pages.map((page,index)=>{
            return (
              page?.items && (
                <Fragment key={index}>
                  {page?.items.map((video,index) =>{
                    if(index === page?.items?.length - 1){
                      return (
                        <Link
                          ref={bottomRef}
                          className="xs:w-full sm:w-[45%] md:w-[45%] lg:w-[32%] "
                          to={`/watch?v=${video?.id?.videoId || video?.id}`}
                          key={video?.id?.videoId || video?.id}
                        >
                          <VideoCard video={video} />
                        </Link>
                      )
                    } else {
                      return (
                        <Link
                        className="xs:w-full sm:w-[45%] md:w-[45%] lg:w-[32%]"
                          to={`/watch?v=${video?.id?.videoId || video?.id}`}
                          key={video?.id?.videoId || video?.id}
                        >
                          <VideoCard video={video} />
                        </Link>
                      );
                    }
                    
                  })}

                </Fragment>
              )
            )
          })
        }
        {isFetchingNextPage && <Shimmer />}
      </div>
      
    )
  
}

export default VideoContainer