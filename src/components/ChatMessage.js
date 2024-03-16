import React from 'react'

const ChatMessage = ({name,message}) => {
  return (
         <div className="flex items-center shadow-sm p-2">
            <img
                className="h-8"
                alt="user-icon"
                src="https://yt3.ggpht.com/ytc/AIf8zZR9ZquN21siKXYcAqkMzSu-GeDe2VEkwKvmyuV_=s48-c-k-c0x00ffffff-no-rj"
            />
            <span className="font-bold px-2">{name}</span>
            <span>{message}</span>
        </div>
  )
}

export default ChatMessage