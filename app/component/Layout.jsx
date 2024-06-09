"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [slideropen,setSliderOpen]=useState(true)
  return (
    <div className="w-[100%] flex flex-row h-screen ">
      <Sidebar slideropen={slideropen} setSliderOpen={setSliderOpen} className="flex-none h-screen"/>
      <main className="flex-1 p-2 h-screen bg-gray-100 hidden border-2px rounded-lg lg:block md:block lg:h-screen md:h-screen">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { slideropen })
        )}
      </main>
    </div>
  );
}
