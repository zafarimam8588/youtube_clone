import {useDispatch, useSelector} from "react-redux";
import { togglMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";

const Head = ()=>{
    const [searchQuery,setSearchQuery] = useState("");
    const [suggestions,setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    // console.log(searchQuery)
    const searchcache = useSelector((store)=> store.search)

    const dispatch = useDispatch();
    const toggleMenuhandler = ()=>{
        dispatch(togglMenu())
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(searchcache[searchQuery]){
                setSuggestions(searchcache[searchQuery])
            } else{
            getSearchSuggestion()
            }
        } ,2000)

        return ()=>{
            clearTimeout (timer);
        }
    },[searchQuery])

    const getSearchSuggestion = async()=>{
        const data = await fetch(YOUTUBE_SEARCH_API+searchQuery);
        const json = await data.json();
        console.log(json[1]);
        setSuggestions(json[1]);
        dispatch(cacheResults({
            [searchQuery]:json[1]
        }))
    }

    return(
        <div className="grid grid-flow-col p-3 m-2 shadow-lg">
            <div className="col-span-1 flex"> 
                <img
                onClick={()=> toggleMenuhandler()}
                 className="h-8 cursor-pointer" alt="hamburger_icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"/>
               <a href="/">
               <img className="h-7 ml-3" alt="youtube-log" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"/>
               </a>
            </div>


            <div className="col-span-10 pr-[7.5rem]">


              <div className=" flex justify-center pr-[7.5rem]">
                <input type="text" className="w-[72%] border border-gray-400 py-2 px-4 rounded-l-full focus:border-blue-500 focus:outline-none focus:shadow-outline-blue" placeholder="Search"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                onFocus={()=> setShowSuggestions(true)}
                onBlur={()=> setShowSuggestions(false)}
                />
                <button className="border border-gray-400 px-3 py-2 rounded-r-full bg-gray-200">
                🔍</button>
                </div>
                {showSuggestions && (
                 <div className="absolute left-[326px] bg-white py-2 px-2 w-[34.5rem] shadow-lg rounded-2xl border border-gray-200">
                    <ul>
                        {suggestions.map((s) => (
                            <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                             🔍 {s}{" "}
                             </li>
                         ))}
                    </ul>
                </div>
                )}
             </div>
           
            <div className="col-span-1">
            <img  className="h-8 cursor-pointer" alt="urse-icon" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/>
            </div>
        </div>
    )
}

export default Head;