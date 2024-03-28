import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import Shimmer from "./Shimmer";
import SuggestedVideoCard from "./SuggestedVideoCard";

const VideoSuggestions = ({videoId,videoTitle}) => {
  // FIRST WE ARE SEARCHING WITH THE VIDEO ID BY USING QUERY PARAM >>>> &relatedToVideoId=${videoId}
  const getSuggestedVideos = async () => {
    const response = await fetch(
      BASE_URL +
        `/search?part=snippet&relatedToVideoId=${videoId}&maxResults=15&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    const data = await response.json();
    // console.log(data)
    if (!response.ok) {
      // console.log(data.error);
      return searchVideoByKeyword(videoTitle);
    }
    return data.items;
  };

  const searchVideoByKeyword = async (searchText) => {
    const response = await fetch(
      BASE_URL +
        `/search?part=snippet&maxResults=10&type=video&q=${searchText}&order=viewCount&videoDuration=medium&key=${process.env.REACT_APP_GOOGLE_API_KEY_5}`
    );
    const data = await response.json();
    // console.log(data)
    if (!response.ok) {
      console.log(data.error);
      throw new Error(data.error.message);
    }
    return data.items;
  };

  const {
    data: suggestedVideos,isLoading,isError,} = useQuery({
    queryKey: ["watch-page", "video-suggestions", videoId],
    queryFn: () => getSuggestedVideos(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  if (isError) return "An error occurred loading suggested videos"; // YOU CAN ADD A BAUTIFUL ERROR TEMPLATE

  return isLoading ? (
    <Shimmer />
  ) : (
    <div>
      {suggestedVideos.length > 0 &&
        suggestedVideos.map((suggestedVideo) => {
          return (
            <Link
              to={`/watch?v=${suggestedVideo?.id?.videoId}`}
              key={suggestedVideo?.id?.videoId}
            >
              <SuggestedVideoCard video={suggestedVideo} />
            </Link>
          );
        })}
        {/* Add a template to show below message */}
        {suggestedVideos.length === 0 && <div>Not able to found video related with </div>}
    </div>
  );
}

export default VideoSuggestions