const commentsData = [
    {
    name:"Zafar Imam",
    text:"I am creating youtube comment nesting upto n level",
    replies:[
        {
            name:"Zafar Imam",
            text:"I am creating youtube comment nesting upto n level",
            replies:[
                
            ]
        }
    ]
    },
    {
    name:"Zafar Imam",
    text:"I am creating youtube comment nesting upto n level",
    replies:[]
    },
    {
    name:"Zafar Imam",
    text:"I am creating youtube comment nesting upto n level",
    replies:[
        {
            name:"Zafar Imam",
            text:"I am creating youtube comment nesting upto n level",
            replies:[
                {
                    name:"Zafar Imam",
                    text:"I am creating youtube comment nesting upto n level",
                    replies:[
                        {
                            name:"Zafar Imam",
                            text:"I am creating youtube comment nesting upto n level",
                            replies:[
                                
                            ]
                        }
                    ]
                },
                {
                    name:"Zafar Imam",
                    text:"I am creating youtube comment nesting upto n level",
                    replies:[
                        
                    ]
                }, {
                    name:"Zafar Imam",
                    text:"I am creating youtube comment nesting upto n level",
                    replies:[
                        
                    ]
                }
            ]
        }
    ]
    },
    {
    name:"Zafar Imam",
    text:"I am creating youtube comment nesting upto n level",
    replies:[]
    },
    {
    name:"Zafar Imam",
    text:"I am creating youtube comment nesting upto n level",
    replies:[]
    }

]

const Comment = ({data})=>{
    const {name,text} = data;

    return(
         <div className="flex mt-4 shadow-sm bg-gray-100 p-2 rounded-lg">
            <img
                className="w-8 h-8"
                alt="profile-icon"
                src="https://yt3.ggpht.com/ytc/AIf8zZR9ZquN21siKXYcAqkMzSu-GeDe2VEkwKvmyuV_=s48-c-k-c0x00ffffff-no-rj"
            />
        <div className="px-3">
                <p className="font-bold">{name}</p>
                <p>{text}</p>
        </div>
    </div>
    )
}


const CommentList = ({comments})=>{
    return (
    comments.map((comment,index)=>{
       return <div key={index}> 
            <Comment data={comment}/>
            <div className="pl-5 ml-5 border-l-2">
                <CommentList comments={comment.replies}/>
            </div>
        </div>
    })
    )
}



export const CommentsContainer = ()=>{
    return (
        <div>   
            <div className="flex">
                <img
                className="w-8 h-8"
                alt="comment-icon"
                src="https://www.svgrepo.com/show/522069/comment-2.svg"
                />
                <h1 className="text-xl font-bold ml-2">Comments:</h1>
            </div>
                <CommentList  comments={commentsData}/>
        </div>
    )
}