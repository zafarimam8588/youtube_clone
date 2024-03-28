// require("dotenv").config();

export const tags = [
    'All',
    'Music',
    'Cricket',
    'Namaste JavaScript',
    'React js',
    'Redux',
    'Frontend Engineer',
    'Coding',
    'Counter-Strike',
    'CSS',
    'HTML',
    'Live',
    'News',
    'football',
    'Web Developer',
    'street food',
    'next js',
    'traversy media',
    'csgo',
    'source 2',
  ];
  

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;


// export const YOUTUBE_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=${GOOGLE_API_KEY}`


export const YOUTUBE_VIDEO_BY_ID = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${GOOGLE_API_KEY}&id=`;

export const YOUTUBE_SEARCH_API =  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

export const OFFSET_LIVE_CHAT = 25;

export const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';