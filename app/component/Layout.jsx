"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [slideropen,setSliderOpen]=useState(true)
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar slideropen={slideropen} setSliderOpen={setSliderOpen}/>
      <main className={`flex-1 p-2 bg-gray-100 overflow-auto ${slideropen ? 'w-full' : 'lg:w-full'}`}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { slideropen })
        )}
      </main>
    </div>
  );
}
