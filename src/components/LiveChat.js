import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatMessage from './ChatMessage'
import { addmessages } from '../utils/chatSlice'
import { generateRandomName, makeRandomMessage } from '../utils/helper'

const LiveChat = () => {
    const [liveMessage,setLiveMessage] = useState("")
    const dispatch = useDispatch()
    const chatMessages = useSelector((store)=>store.chat.messages)
    useEffect(()=>{
        const i = setInterval(()=>{
            dispatch(addmessages({
                name:generateRandomName(),
                message:makeRandomMessage(20)
            }))
        },1000)

        return ()=>{
            clearInterval(i)
        }
    },[])
  return (
    <>
        <div className="flex ">
          <img
            className="w-8 h-8 mr-1 pt-2"
            alt="chat-icon"
            src="https://www.svgrepo.com/show/529481/chat-round-dots.svg"
          />
          <h1 className="font-bold py-1.5 text-xl">Live Chat:</h1>
        </div>
        <div className="ml-2 p-2 border border-slate-300 h-[408px] w-full bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
          {chatMessages?.map((message,index)=>{
            return <ChatMessage key={index} name={message.name} message={message.message}/>
          })}
        </div>
        <form
        className="w-full p-2 ml-2 rounded-lg"
        onSubmit={(e)=>{
            e.preventDefault()
            dispatch(addmessages({
                name:"Zafar",
                message:liveMessage
            }))
            setLiveMessage("")
        }}
        >
        <input
          type="text"
          placeholder=" Chat..."
          className=" ml-4 mr-3 p-1 w-[17rem] rounded-lg shadow-sm border-b-4 border-indigo-300 focus:outline-0"
          onChange={(e) => setLiveMessage(e.target.value)}
          value={liveMessage}
        />
        
        <button className="py-1 px-3 rounded-lg shadow-sm border border-b-3 bg-green-300 focus:outline-0">send</button>
        </form>

    </>
  )
}

export default LiveChat