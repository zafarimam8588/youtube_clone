import { useRef, Fragment } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";

import { useSelector } from "react-redux";

import { BASE_URL } from "../utils/contants";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import useScroll from "../utils/useScroll";

const VideoContainer = () => {
  
  const {category} = useSelector(store => store.videoCategory);
  const bottomRef = useRef(null);
  // console.log(bottomRef)
  


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


  useScroll(bottomRef,fetchNextPage)
  
  return isLoading ? (
      <Shimmer/>
    ) : (
      <div
      className=" grid justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[2rem_1rem] 
      pt-6 px-8 overflow-x-hidden"
      >
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
                          className="w-full"
                          to={`/watch?v=${video?.id?.videoId || video?.id}`}
                          key={video?.id?.videoId || video?.id}
                        >
                          <VideoCard video={video} />
                        </Link>
                      )
                    } else {
                      return (
                        <Link
                          className="w-full"
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