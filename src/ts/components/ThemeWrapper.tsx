'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { FaRegMoon } from "react-icons/fa";


export default function ThemeWrapper({children, }: Readonly<{ children: React.ReactNode; }>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);  //prevmode ideal to correctly keep track of asynchronous state toggling 
  };

  return (
    <>
        <div className={isDarkMode ? "bg-black text-white" : "bg-slate-200 text-black"}>
            {children}
            <div className='w-100 flex justify-end sticky bottom-0 bg-opacity-0'> 
                <button className='p-4 bg-opacity-0' onClick={toggleDarkMode}><FaRegMoon className='h-[25px] w-[25px]'/></button>
            </div>
        </div>
    </>
  )
}