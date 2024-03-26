import React from "react";
import {
  MdHomeFilled,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineHistory,
  MdOutlineWatchLater,
  MdOutlineContentCut,
  MdOutlineKeyboardArrowDown,
  MdOutlineMusicNote,
  MdOutlineLightbulb,
  MdHelpOutline,
  MdOutlineSettings,
  MdOutlinedFlag,
  MdOutlineFeedback,
} from "react-icons/md";
import { RiVideoLine, RiShoppingBag2Line } from "react-icons/ri";
import { ImFire } from "react-icons/im";
import { GiClapperboard, GiAerialSignal } from "react-icons/gi";
import { SiYoutubegaming } from "react-icons/si";
import { IoNewspaperOutline, IoTrophyOutline } from "react-icons/io5";
import { GiHanger } from "react-icons/gi";
import { BsPlusCircle } from "react-icons/bs";
import { FaYoutube, FaUserCircle } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import { TbMoodKid } from "react-icons/tb";
import { ImDisplay } from "react-icons/im";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";
import { SiYoutubeshorts } from "react-icons/si";


const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const breakpoint = 1024;
  const dispatch = useDispatch();

  useEffect(() => {
    const checkisMobile = () => {
      if (isMenuOpen && window.innerWidth < breakpoint) {
        dispatch(toggleMenu());
      }
    };
    checkisMobile();
    // eslint-disable-next-line
  }, []);
  const isMobile = () => {
    if (window.innerWidth <= 768) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (isMenuOpen && window.innerWidth < breakpoint) {
        dispatch(toggleMenu());
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [isMenuOpen, dispatch]);
  return (
    isMenuOpen ?(
      !isMobile() ? (
        <div className=" border-r dark:border-none w-[15rem]  h-[calc(100vh-4.625rem)] overflow-y-scroll min-w-fit bg-white dark:bg-zinc-900 dark:text-white transition-all duration-500">
            <div className=" flex flex-col pl-2 pr-6  pb-4 text-sm w-[15rem] ">
              <Link to="/">
                <div className=" px-4 flex py-2 items-center hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full rounded-lg  cursor-pointer">
                  <MdHomeFilled size="1.5rem" className="mb-1 mr-4" />
                  <span className="">Home</span>
                </div>
              </Link>
              <div className=" px-4  flex py-2 items-center  hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg cursor-pointer">
                <SiYoutubeshorts size="1.5rem" className="mb-1 mr-4" />
                <span>Shorts</span>
              </div>
              <div className=" py-2 px-4  flex items-center  hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg cursor-pointer">
                <MdOutlineSubscriptions size="1.5rem" className="mb-1 mr-4" />
                <span>Subscriptions</span>
              </div>
              <div className="pt-3 border-b border-zinc-200 w-full"></div>
              <div className=" py-2 mt-4 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlineVideoLibrary size="1.5rem" className="mb-1 mr-4" />
                <span>Library</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlineHistory size="1.5rem" className="mb-1 mr-4" />
                <span>History</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <RiVideoLine size="1.5rem" className="mb-1 mr-4" />
                <span>Your videos</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlineWatchLater size="1.5rem" className="mb-1 mr-4" />
                <span>Watch Later</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlineContentCut size="1.5rem" className="mb-1 mr-4" />
                <span>Your Clips</span>
              </div>
              <div className="py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlineKeyboardArrowDown size="1.5rem" className="mb-1 mr-4" />
                <span>Show more</span>
              </div>
              <div className="pt-3 border-b border-zinc-200  w-full"></div>
              <div className="pt-4 pl-4">
                <span className="text-sm">
                  Sign in to like videos, comment, and subscribe.
                </span>
              </div>
              <div className="pt-4 pl-4">
                <button className="border p-2  px-4 rounded-3xl  font-bold flex items-center gap-2">
                  <FaUserCircle size="1.5rem" /> Sign in
                </button>
              </div>
              <div className="pt-3 border-b border-zinc-200 w-full"></div>
              <div className="pt-4 pl-4 mb-2">
                <span className="text-base">Explore</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <ImFire size="1.5rem" className="mb-1 mr-4" />
                <span>Trending</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <RiShoppingBag2Line size="1.5rem" className="mb-1 mr-4" />
                <span>Shopping</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlineMusicNote size="1.5rem" className="mb-1 mr-4" />
                <span>Music</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <GiClapperboard size="1.5rem" className="mb-1 mr-4" />
                <span>Movies</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <GiAerialSignal size="1.5rem" className="mb-1 mr-4" />
                <span>Live</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <SiYoutubegaming size="1.5rem" className="mb-1 mr-4" />
                <span>Gaming</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <IoNewspaperOutline size="1.5rem" className="mb-1 mr-4" />
                <span>News</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <IoTrophyOutline size="1.5rem" className="mb-1 mr-4" />
                <span>Sports</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlineLightbulb size="1.5rem" className="mb-1 mr-4" />
                <span>Learning</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <GiHanger size="1.5rem" className="mb-1 mr-4" />
                <span>Fashion & Beauty</span>
              </div>
              <div className="pt-3 border-b border-zinc-200 w-full mb-3"></div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <BsPlusCircle size="1.4rem" className="mb-1 mr-4" />
                <span>Browse channels</span>
              </div>
              <div className="pt-3 border-b border-zinc-200 w-full "></div>
              <div className="pt-4 pl-4 mb-2">
                <span className="text-base">More from YouTube</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <FaYoutube size="1.4rem" className="mb-1 mr-4" />
                <span>YouTube Premium</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <SiYoutubemusic size="1.4rem" className="mb-1 mr-4" />
                <span>YouTube Music</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <TbMoodKid size="1.4rem" className="mb-1 mr-4" />
                <span>YouTube kids</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <ImDisplay size="1.4rem" className="mb-1 mr-4" />
                <span>yYouTube TV</span>
              </div>
              <div className="pt-3 border-b border-zinc-200 w-full mb-2 "></div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700   w-full rounded-lg  cursor-pointer">
                <MdOutlineSettings size="1.4rem" className="mb-1 mr-4" />
                <span>Settings</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlinedFlag size="1.4rem" className="mb-1 mr-4" />
                <span>Report history</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdHelpOutline size="1.4rem" className="mb-1 mr-4" />
                <span>Help</span>
              </div>
              <div className=" py-2 px-4 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-700  w-full rounded-lg  cursor-pointer">
                <MdOutlineFeedback size="1.4rem" className="mb-1 mr-4" />
                <span>Send feedback</span>
              </div>
              <div className="pt-3 border-b border-zinc-200 w-full mb-2 "></div>
              <div className=" py-2 px-4  flex gap-1 flex-wrap font-medium text-[0.84rem] text-[#606060] dark:text-zinc-400">
                <div className="cursor-pointer ml-1">About</div>
                <div className="cursor-pointer ml-1">Press</div>
                <div className="cursor-pointer">Copyright</div>
                <div className="cursor-pointer ml-1">Contact us</div>
                <div className="cursor-pointer ml-1">Creators</div>
                <div className="cursor-pointer ml-1">Advertise</div>
                <div className="cursor-pointer ml-1">Developers</div>
              </div>
              <div className=" py-2 px-4  flex gap-1 flex-wrap font-medium text-[0.84rem] text-[#606060] dark:text-zinc-400">
                <div className="cursor-pointer ml-1">Terms</div>
                <div className="cursor-pointer ml-1">Privacy</div>
                <div className="cursor-pointer ml-1">Policy & Safety</div>
                <div className="cursor-pointer ml-1">How Streamy works</div>
                <div className="cursor-pointer ml-1">Test new features</div>
              </div>
              <div className="px-4 py-2 text-gray-400"> &copy; 2023 Google LLC</div>
            </div>
        </div>
      ) :(
        <div className="sidebar__closed pr-1 border-r dark:border-none flex flex-col text-xs w-18 items-center  h-[calc(100vh-4.625rem)] bg-white dark:bg-zinc-900 dark:text-white transition-all duration-500">
          <Link to="/" className=" w-full">
            <div className="home py-4 flex flex-col items-center hover:bg-zinc-200 dark:hover:bg-zinc-700   w-full rounded-md">
              <MdHomeFilled size="1.5rem" className="mb-1" />
              <span>Home</span>
            </div>
          </Link>
          <div className="shorts py-4 flex flex-col items-center  hover:bg-zinc-200 dark:hover:bg-zinc-700  w-full rounded-md">
            <SiYoutubeshorts size="1.5rem" className="mb-1 mr-4" />
            <span>Shorts</span>
          </div>
          <div className="subscriptions py-4 flex flex-col items-center  hover:bg-zinc-200  dark:hover:bg-zinc-700  w-full rounded-md">
            <MdOutlineSubscriptions size="1.5rem" className="mb-1" />
            <span>Subscriptions</span>
          </div>
          <div className="library py-4 flex flex-col items-center hover:bg-zinc-200 dark:hover:bg-zinc-700  w-full rounded-md">
            <MdOutlineVideoLibrary size="1.5rem" className="mb-1" />
            <span>Library</span>
          </div>
        </div>
      )
    ):(
      !isMobile() && (
        <div className="sidebar__closed pr-1 border-r dark:border-none flex flex-col text-xs w-18 items-center  h-[calc(100vh-4.625rem)] bg-white dark:bg-zinc-900 dark:text-white transition-all duration-500">
          <Link to="/" className=" w-full">
            <div className="home py-4 flex flex-col items-center hover:bg-zinc-200 dark:hover:bg-zinc-700  w-full rounded-md">
              <MdHomeFilled size="1.5rem" className="mb-1" />
              <span>Home</span>
            </div>
          </Link>
          <div className="shorts py-4 flex flex-col items-center  hover:bg-zinc-200 dark:hover:bg-zinc-700  w-full rounded-md">
            <SiYoutubeshorts size="1.5rem" className="mb-1 mr-4" />
            <span>Shorts</span>
          </div>
          <div className="subscriptions py-4 flex flex-col items-center  hover:bg-zinc-200 dark:hover:bg-zinc-700 w-full rounded-md cursor-pointer">
            <MdOutlineSubscriptions size="1.5rem" className="mb-1" />
            <span>Subscriptions</span>
          </div>
          <div className="library py-4 flex flex-col items-center hover:bg-zinc-200 dark:hover:bg-zinc-700   w-full rounded-md cursor-pointer">
            <MdOutlineVideoLibrary size="1.5rem" className="mb-1" />
            <span>Library</span>
          </div>
        </div>
      )
    )
    
  )
}

export default Sidebar