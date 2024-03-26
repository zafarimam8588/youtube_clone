import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../utils/appSlice";
import { YOUTUBE_VIDEO_BY_ID } from "../utils/contants";
import { useSearchParams } from "react-router-dom";
import { CommentsContainer } from "./CommentsContainer";
import VideoDescription from "./VideoDescription";
import LiveChat from "./LiveChat";
import SidebarExpended from "./SidebarExpended";

const WatchPage = () => {
  const [videoInfo, setVideoInfo] = useState();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  const isSideBarOpen = useSelector((store) => store.app.isSideBarOpen);

  useEffect(() => {
    if (isSideBarOpen) {
      dispatch(toggleSideBar());
    }
  }, []);

  useEffect(() => {
    getVideoInfo();
  }, []);

  const getVideoInfo = async () => {
    const data = await fetch(YOUTUBE_VIDEO_BY_ID + searchParams.get("v"));
    const json = await data.json();
    console.log(json.items[0]);
    setVideoInfo(json.items[0]);
  };

  return (
    <>
    <SidebarExpended/>
    <div className="flex w-full">
    <div className={` ${isMenuOpen ? "w-[576px]" : "w-[972px]"} w-full`}>
        <div className="m-5">
          <iframe
            className="rounded-lg"
            width={isMenuOpen ? 700 : 900} // WE ARE DOING THIS FOR CONDITIONAL RENDERING
            height="500"
            src={`https://www.youtube.com/embed/${searchParams.get("v")}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <VideoDescription videoInfo={videoInfo}/>
        <div className="m-5">
          <CommentsContainer/>
        </div>
      </div>
      <div className="my-3 w-full">
        <LiveChat/>
      </div>
    </div>
    </>
  );
};

export default WatchPage;
