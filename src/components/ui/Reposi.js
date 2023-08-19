import React from "react";
import { BiBookBookmark } from "react-icons/bi";
import {useState, useEffect} from 'react'

function Reposi({ url }) {
 
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
      });
  }, [url]);

  return (
    <div className='flex justify-center items-center gap-1 text-gray-400'>
        
      <BiBookBookmark />
      {repos.length}
    </div>
  );
}

export default Reposi;
