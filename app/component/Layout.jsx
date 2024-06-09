"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [slideropen,setSliderOpen]=useState(true)
  return (
    <div className="w-[100%] flex flex-row">
      <Sidebar slideropen={slideropen} setSliderOpen={setSliderOpen}/>
      <main className="flex-1 p-6">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { slideropen })
        )}
      </main>
    </div>
  );
}
