import { useQuery } from '@tanstack/react-query';
import { decode } from 'html-entities';
import moment from 'moment';
import { BASE_URL } from '../utils/contants';


const SuggestedVideoCard = ({video}) => {
  const {
    id : {videoId},
    snippet : {
      publishedAt,
      title,
      thumbnails: { medium },
      channelTitle,
    }
  } = video

  const decodedTitle = decode(title);

  const getVideoViewsAndDuration = async (videoId) => {
    const response = await fetch(
      BASE_URL +
        `/videos?part=contentDetails%2Cstatistics&id=${videoId}&key=${process.env.REACT_APP_GOOGLE_API_KEY_2}`
    );
    const data = await response.json();
    return data.items[0];
  };

  const { data: videoDetails, isLoading } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: () => getVideoViewsAndDuration(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  // HERE WE WILL WAIT TILL LOADING IS COMPLETED
  const seconds = !isLoading && moment.duration(videoDetails.contentDetails.duration).asSeconds();
  const modifiedDuration = !isLoading && moment.utc(seconds * 1000).format('mm:ss');

  return !isLoading && (
    <div className='flex  gap-2 md:gap-4  lg:gap-2 xl:gap-4 cursor-pointer mb-4 '>
        <div className='h-[80px] sm:h-[96px] relative top-0 left-0 lg:w-[150px] lg:flex-none xl:w-[200px] xl:h-[120px] '>
          <img
            src={medium?.url}
            className='rounded-xl w-full h-full object-cover'
            alt='video thumbnail'
          />
          <div className='absolute bottom-1 right-1 bg-black/80 px-2 py-1 rounded-md text-xs text-white'>
            {modifiedDuration}
          </div>
        </div>
        <div className=''>
          <div className=''>
            <div className=' font-semibold text-sm md:text-base lg:text-sm leading-tight md:leading-normal lg:leading-tight h-[50%]  '>
              {decodedTitle.length > 32 ? decodedTitle.slice(0, 32) + '...' : decodedTitle}
            </div>
            <div className='small h-[50%]  '>
                <div className='text-xs xl:text-sm pt-2'>{channelTitle}</div>
                <div className='text-xs '>
                  <span>{Intl.NumberFormat('en', {notation: "compact"}).format(videoDetails?.statistics?.viewCount)} views</span>
                  <span> • </span>
                  <span>{moment(publishedAt).fromNow()}</span>
             `  </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SuggestedVideoCard