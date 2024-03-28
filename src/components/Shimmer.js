

const Shimmer = () => {
  return (
   <div className="flex flex-wrap">
        {Array(12).fill([])
        .map((box,index)=>(
            <div key={index} className="m-2 p-3 w-80 h-80">
                <div className='w-full h-1/2 border rounded-xl bg-slate-300 animate-pulse'></div>
                <div className='w-[90%] h-[10%] mt-3 border rounded-full bg-slate-300 animate-pulse '></div>
                <div className='w-[70%] h-[7%]  mt-3 border rounded-full bg-slate-300 animate-pulse'></div>
            </div>
        ))
        }
   </div>
  )
}

export default Shimmer