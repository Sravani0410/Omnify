"use client"
import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [sliderOpen,setSliderOpen]=useState(true)
  return (
    <div className="w-[100%] flex flex-row">
      <Sidebar sliderOpen={sliderOpen} setSliderOpen={setSliderOpen}/>
      <main className="flex-1 p-6">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { sliderOpen })
        )}
      </main>
    </div>
  );
}
