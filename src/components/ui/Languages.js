import React from 'react';
import {useState, useEffect} from 'react';

function Languages({lang}) {
  
  const [langUsed, setLangUsed] = useState([]);

  useEffect(() => {
    fetch(lang)
      .then((res) => res.json())
      .then((data) => {
        setLangUsed(data);
      });
  }, [lang]);

  const langNames = Object.keys(langUsed);

  return (
    <ul className='flex gap-2 flex-wrap'>
    {
      langNames.map((lang, index) => (
        <li key={index} className='text-white font-semibold text-[10px] lg:text-[14px] bg-[#4551BD]
        shadow-inner pl-1 pr-1 rounded-2xl hover:scale-105 transition-all cursor-not-allowed'>{lang}</li>
      ))
    }
    </ul>
  )
}

export default Languages