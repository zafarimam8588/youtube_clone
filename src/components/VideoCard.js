import moment from "moment";
import { BASE_URL } from "../utils/contants";
import { GiAerialSignal } from "react-icons/gi";
import { decode } from "html-entities";
import { useQuery } from "@tanstack/react-query";

const Video = ({video}) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
    statistics,
  } = video;

  const newTitle = decode(title);

  const _videoId = id?.videoId || contentDetails?.videoId || id;
  // console.log(title);

  const getVideoViewsAndDuration = async (_videoId) => {
    const response = await fetch(
      BASE_URL +
        `/videos?part=contentDetails%2Cstatistics&id=${_videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    const data = await response.json();
    return data.items[0];
  };
  // HERE WE ARE RENAMING DATA AS VIDEODETAILS
  const { data: videoDetails} = useQuery({ 
    queryKey: ["videoDetails", _videoId],
    queryFn: () => getVideoViewsAndDuration(_videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
    enabled: !(contentDetails && statistics), // This option determines whether the query should be executed or not. If enabled is true, the query will be executed. If enabled is false, the query will not be executed.
  });

  let views, duration;

  if (contentDetails && statistics) {
    duration = contentDetails?.duration;
    views = statistics.viewCount;
  } else  {
    duration = videoDetails?.contentDetails?.duration;
    views = videoDetails?.statistics?.viewCount;
  }
  // ALL WE ARE DOING TO CONVERT INTO HUMANE READABLE TIME FORMAT
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");


  const getChannelIcon = async (channelId) => {
    const response = await fetch(
      BASE_URL +
        `/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    const data = await response.json();
    // console.log(data)
    if (response.ok && data?.items?.length > 0) {
      return data.items[0].snippet.thumbnails?.default?.url;
    } else {
      throw new Error("Failed to fetch channel icon.");
    }
  };

  const { data: channelIcon2 } = useQuery({
    queryKey: ["channelIcon", channelId],
    queryFn: () => getChannelIcon(channelId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
  return (
    <div className="video w-full cursor-pointer h-fit">
      {/* Thumbnail Starts */}
      <div className="video__thumbnail  relative">
        <img
          src={medium.url}
          className="rounded-xl w-full"
          alt="video thumbnail"
        />
         <div className="absolute bottom-1 right-1 bg-black/80 px-2 py-1 rounded-md text-xs text-white">
          {_duration === "00:00" ? (
            <div className="bg-red-600 px-2 rounded font-bold  items-center">
              <GiAerialSignal size="1.1rem" />
              <span>LIVE</span>
            </div>
          ) : (
            _duration
          )}
        </div>
      </div>
      {/* Thumbnail & Duration Ends */}

      {/* Video Details */}
      <div className=" pt-4 dark:text-white">
        <div className="flex gap-2">
          <div className="flex flex-shrink-0 ">
            <img
              src={channelIcon2}
              className="rounded-[50%]  w-10 h-10  object-cover"
              alt="channel logo"
            />
          </div>
          <div className="">
              <div className=" font-semibold text-base leading-snug ">
                {newTitle.length > 60 ? newTitle.slice(0, 60) + "..." : newTitle}
              </div>
              <div className=" text-xs pt-2">{channelTitle}</div>
              <div className="text-xs pt-1">
                <span>
                  {Intl.NumberFormat("en", { notation: "compact" }).format(views)}{" "}
                  views
                </span>
                <span> • </span>
                <span>{moment(publishedAt).fromNow()}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
   

  )
}

export default Video