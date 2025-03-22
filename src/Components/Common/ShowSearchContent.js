import React from 'react'
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/authHooks';
import HighlightedText from "./HighlightedText"

const ShowSearchContent = () => {
  const { searchData, marginDiv } = useAuth();
  // console.log(text);
  // console.log(searchData)
  const params = useParams();
  // console.log(params.id)
  // console.log(typeof(params.id))
  // console.log(searchData)

  const getSearchDataById = (id) => {
    return searchData.find((data) => data.id === id);
  };


  const data = getSearchDataById(parseInt(params.id, 10));
  // console.log(data.content)
  
  return (
    < >
      {/* {searchData.map((result, i) => ( */}
        <div key={params.id} style={{ margin: '100px' }}>
          {/* <HighlightedText text={JSON.stringify(result.content)} searchKey={query} /> */}
          {/* {console.log(result.content)} */}
          <HighlightedText text={data.content} />
        </div>
      {/* ))} */}

    </>
    // <>
    //   <HighlightedText text={text} searchKey={query} />
    // </>
  )
}

export default ShowSearchContent
