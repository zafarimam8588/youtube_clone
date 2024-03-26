import { useEffect, useRef } from "react"

const useClickOutside = (handler)=>{
    const domNode = useRef(null);

    useEffect(()=>{
        const handleToggle = (event)=>{
            if(domNode.current && !domNode.current.contains(event.target)){
                handler();
            }
        }

        document.body.addEventListener("click", handleToggle)

        return ()=>{
            document.body.removeEventListener("click", handleToggle)
        }
    },[handler])
    return domNode
}

export default useClickOutside;
