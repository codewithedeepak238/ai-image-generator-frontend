import React, { useEffect, useState } from 'react'
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

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
    <div className='w-[100vw] px-[3%]'>
      <div className="grid md:grid-cols-3 gap-[10px] items-center">
        {
          data && data.map((ele, index) => (
            <div key={index} className='rounded-[10px] cursor-pointer overflow-hidden'>
              <img className='post-img w-full h-auto object-cover' alt={ele.prompt} src={`data:image/png;base64,${ele.photo}`} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
