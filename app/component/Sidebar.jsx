import {
  FaRegCalendarAlt,
  FaUser,
  FaBox,
  FaListAlt,
  FaTachometerAlt,
  FaUserShield,
  FaQuestionCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { LuPanelRightClose } from "react-icons/lu";
import { useEffect, useState } from "react";
import { BsArrowLeftRight } from "react-icons/bs";

export default function Sidebar({ slideropen, setSliderOpen }) {
  const [date,setDate]=useState({})
  // const setSliderOpens=setSliderOpen.toString()
  useEffect(() => {
    function getCurrentDateTime() {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentDay = now.getDate();
  
      // Convert the numerical value (0-11) to the month name
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
  
      // Convert the numerical value (0-6) to the day name
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const currentDayName = dayNames[now.getDay()];
      const currentMonthName = monthNames[now.getMonth()];
  
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;  // Convert to 12-hour format and handle midnight
  
      // Format the time string with leading zeros for single digits
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
  
      return {
        formattedTime,
        currentMonthName,
        currentDay,
        currentYear,
        currentDayName,
      };
    }
  
    const currentDateTime = getCurrentDateTime();
    setDate(currentDateTime);
  }, []);
  
  
  return (
    <div className={`bg-gray-100 p-5 border-r transition-all ${slideropen ? "w-70" : "w-20"} flex-shrink-0`}>
     {
     slideropen? (
     <div className="h-full flex flex-col bg-white shadow-md">
        <div className="p-2 border-b flex justify-between">
          <BiLoaderCircle size={30} className="mt-2"/>
          <h3 className="text-xl font-bold mt-2">Front-Desk</h3>
          <button className="p-1 ml-2 mb-3" onClick={()=>setSliderOpen(!slideropen)}>
            <LuPanelRightClose size={20} className="mt-2"/>
          </button>
        </div>
        <div className="p-4">
          <div className="mb-5 p-2 flex justify-between border-b shadow-md">
           <h2 className="text-sm font-bold">Location name</h2> <BsArrowLeftRight />
          </div>
          <div className="mb-5 p-2 border-b shadow-md bg-gray-100">
            <div className="flex justify-between ">
            <h2 className="text-sm mr-2 font-bold mb-2">{date.formattedTime}</h2>
            <p className="mb-2">{date.currentDayName} {date.currentDay} {date.currentMonthName} </p>
            </div>
            <div className="flex items-center">
              <AiOutlineGlobal className="mr-2"/> 
              <p>UTC +5hours</p>
            </div>
          </div>
          <nav>
            <ul>
              <li className="mb-2 flex items-center">
                <FaRegCalendarAlt className="mr-2" /> Orders
              </li>
              <li className="mb-2 flex items-center">
                <FaBox className="mr-2" /> Subscriptions
              </li>
              <li className="mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" /> Calendar
              </li>
              <li className="mb-2 flex items-center font-bold">
                <FaListAlt className="mr-2" /> Waitlist
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <div className="mb-2 flex items-center">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </div>
          <div className="mb-2 flex items-center">
            <FaUserShield className="mr-2" /> Admin Name
          </div>
          <div className="mb-2 flex items-center">
            <FaQuestionCircle className="mr-2" /> Help Center
          </div>
        </div>
      </div>
      ):(
        <div className="h-full flex flex-col bg-white shadow-md">
        <div className="border-b flex justify-between">
          <button className="p-2" onClick={()=>setSliderOpen(!slideropen)}>
           <BiLoaderCircle size={30}/>
          </button>
        </div>
        <div className="p-2">
          <nav>
            <ul>
              <li className="mb-2 flex justify-center items-center">
              <AiOutlineGlobal />
              </li>
              <li className="mb-2 flex  justify-center items-center">
                <FaRegCalendarAlt  /> 
              </li>
              <li className="mb-2 flex  justify-center items-center">
                <FaBox  /> 
              </li>
              <li className="mb-2 flex  justify-center items-center">
                <FaCalendarAlt /> 
              </li>
              <li className="mb-2 flex  justify-center items-center">
                <FaListAlt  /> 
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col justify-end mt-auto p-4 items-center ">
          <div className="mb-4">
            <FaTachometerAlt className="mr-2" /> 
          </div>
          <div className="mb-4">
            <FaUserShield className="mr-2" /> 
          </div>
          <div>
            <FaQuestionCircle className="mr-2" />
          </div>
        </div>
      </div>)
      }
    </div>
  );
}
