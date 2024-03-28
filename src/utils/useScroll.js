import React, { useEffect } from 'react';
// PENDING TASK : INFINITE SCROLL 
const useScroll = (bottomRef, fetchNextPage) => {
    // console.log(bottomRef)
  useEffect(() => {

    const handleScroll = () => {
      const container = bottomRef.current;
     
        if (
          container && (container?.scrollTop + container?.clientHeight >=
          container.scrollHeight)
        ) {
            console.log("Inside handleScroll")
          fetchNextPage();
      }
    };

    const container = bottomRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [bottomRef, fetchNextPage]);
}

export default useScroll;
