import axios from '../axios/axios';
import React, { useEffect, useState } from 'react'
import "./ForumComment.css"

const ForumComment = (id) => {
    const [data, setData] = useState([]);

    // const handleRootComment = () => {
    //     axios
    // }
    console.log(data)
    useEffect(()=> {
        console.log(id.id);
         axios.post("/api/forums/usercommentlist/", 
         {forum_id: id.id},
         )
        .then(response=>{
            console.log(response.data)
            setData(response.data);
        })
        .catch(err=>
            console.log(err)
            )
    }, [id]);


  return (
    <div className='comments'>
      <div className='comments-title'>কমেন্টস</div>
      <div className='comments-container'>
        {data.map((eachData)=>(
            <div key={eachData.id}>{eachData.comment}</div>
        ))}

      </div>
    </div>
  )
}

export default ForumComment
