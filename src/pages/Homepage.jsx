import React, { useEffect, useState } from 'react'
import { Mosaic } from "react-loading-indicators";

export const Homepage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/api/all-posts");
      const result = await response.json();
      setData(result.allPosts);
    }
    fetchData()
  }, [])
  return (
    <div className='px-[3%]'>
      <div className="grid md:grid-cols-3 gap-[10px] items-center">
        {
          data.length===0? <div className='w-[100vw] h-[100vh] flex items-center justify-center'><Mosaic size="large" color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} /></div> : data.map((ele, index) => (
            <div key={index} className='rounded-[10px] cursor-pointer overflow-hidden'>
              <img className='post-img w-full h-auto object-cover' alt={ele.prompt} src={`data:image/png;base64,${ele.photo}`} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
