import { RxHamburgerMenu } from "react-icons/rx";
import { TfiSearch } from "react-icons/tfi";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { toggleMenu, toggleSideBar } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { cacheResults } from "../utils/searchSlice";
import ThemeContext from "../utils/ThemeContext";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { changeCategory } from "../utils/categorySlice";
import { YOUTUBE_SEARCH_API } from "../utils/contants";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchcache = useSelector((store) => store.search);

  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };
  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const toggleSideBarHandler = () => {
    dispatch(toggleSideBar());
  };

  const category = useSelector((store) => store.videoCategory.category);

  const route = useLocation();

  const handleSetHomeVideoByKeyword = (searchText) => {
    if (category !== searchText) {
      dispatch(changeCategory(searchText));
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchcache[searchQuery]) {
        setSuggestions(searchcache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log(json[1]);
    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  return (
    <div className=" relative px-4 py-2 flex justify-between items-center shadow-sm  w-full sticky top-0 z-10 bg-white h-[4.62rem] dark:bg-zinc-900 dark:text-white transition-all duration-500">
      <div className="left-items flex items-center">
        <button
          className=" p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
          onClick={
            route.pathname === "/watch"
              ? toggleSideBarHandler
              : toggleMenuHandler
          }
        >
          <RxHamburgerMenu
            size="1.5rem"
            title="hambergur menu"
            className="cursor-pointer"
          />
        </button>
        <div className="logo cursor-pointer flex items-center max-md:hidden">
          <a href="/">
            <img
              // HERE YOU CAN INSERT YOUR OWN LOGO
              src={theme ==='light'?"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_0hffKfpWyYa0ZuLeHOOmkEQBluL2o1NdQ&usqp=CAU"}
              alt="logo"
              title="logo"
              className="w-52 pl-4 lg:w-36"
            />
          </a>
        </div>
      </div>

      <div className="center w-3/5 2xl:w-2/5 max-sm:w-4/5 max-sm:ml-2 max-sm:mr-4 flex items-center ml-16 relative ">
        <div
          className="searchbar  dark:bg-zinc-800 w-[580px] flex items-center ml-10 rounded-l-3xl border-2 dark:border dark:border-gray-500"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            className=" rounded-l-3xl p-2 pl-8 focus:outline-none w-full dark:bg-zinc-800"
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
        </div>
        <button
          className="flex items-center rounded-r-3xl bg-gray-200 py-[12px] px-[24px]"
          onClick={() => handleSetHomeVideoByKeyword(searchQuery)}
        >
          <TfiSearch size="1.2rem" className="" />
        </button>
      </div>
      {showSuggestions && (
        <div className="absolute left-[295px] top-[59px] bg-white py-2 px-2 w-[36rem] shadow-lg rounded-2xl border border-gray-200 dark:bg-zinc-900">
          <ul>
            {suggestions.map((s) => (
              <li
                key={s}
                className="py-2 px-3 shadow-sm hover:bg-gray-200 font-semibold flex "
              >
                <TfiSearch className=" text-center mt-1 mr-4" /> {s}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="right-menu flex  items-center sm:ml-4 lg:ml-16 gap-5 p-2">
        <div className="toggle-dark-mode-switch  flex items-center gap-2">
          <label
            htmlFor="check"
            className="bg-gray-100 dark:bg-zinc-700 relative top-0 w-20 h-8 rounded-full cursor-pointer flex items-center justify-around dark:text-black"
          >
            {" "}
            <BsFillSunFill className="text-amber-400" size="1.2rem" />
            <BsFillMoonFill className="text-zinc-700" size="1.2rem" />
            <input
              type="checkbox"
              id="check"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />
            <span className="w-2/5 h-4/5 bg-amber-400 absolute rounded-full left-1 top-1 peer-checked:bg-white peer-checked:left-11 transition-all duration-500 "></span>
          </label>
        </div>

        <div className="p-2 max-sm:hidden  hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <RiVideoAddLine size="1.5rem" />
        </div>
        <div className="p-2 max-sm:hidden  hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <IoMdNotificationsOutline size="1.5rem" />
        </div>
        <div className="p-2 max-sm:hidden   hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <FaUserCircle size="1.5rem" />
        </div>
      </div>
    </div>
  );
};

export default Head;
