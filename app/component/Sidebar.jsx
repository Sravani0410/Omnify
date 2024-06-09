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
import { BiLoaderCircle } from "react-icons/bi";
import { LuPanelRightClose } from "react-icons/lu";
import { useEffect, useState } from "react";

export default function Sidebar({ slideropen, setSliderOpen }) {
  const [date,setDate]=useState({})
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
    <div className={`transition-all ${
      slideropen ? "w-1/5" : "w-[8%]"
    } bg-gray-100 h-full hidden p-5 border-3px border-black rounded-lg lg:block md:block lg:h-screen md:h-screen`}>
     {
     slideropen? (
     <div className="h-full bg-white shadow-md">
        <div className="p-4 border-b flex flex-row justify-between">
        <BiLoaderCircle size={30}/>
          <h3 className="text-xl font-bold">Front-Desk</h3>
          <button className="p-2 flex" onClick={()=>setSliderOpen(!slideropen)}>
            <LuPanelRightClose />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-5 p-2 flex flex-row justify-between border-b shadow-md">
            <h2 className="text-sm font-bold">{date.formattedTime}</h2>
             <p>{date.currentDayName} {date.currentDay} {date.currentMonthName} </p>
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
          <div className="mb-4">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </div>
          <div className="mb-4">
            <FaUserShield className="mr-2" /> Admin Name
          </div>
          <div>
            <FaQuestionCircle className="mr-2" /> Help Center
          </div>
        </div>
      </div>
      ):(
        <div className="h-full bg-white shadow-md">
        <div className="p-6 border-b flex flex-row justify-between">
          <button className="p-2 flex" onClick={()=>setSliderOpen(!slideropen)}>
           <BiLoaderCircle size={30}/>
          </button>
        </div>
        <div className="p-4">
          <nav>
            <ul>
              <li className="mb-2 flex  justify-center items-center gap-20">
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
