here code structure was quite different but i want previous code structure only.so i want is in this there is code so please refer following code and convert to this code accordinly previous structure use the following code not the structure. 
following code which you refer:
 components
    - Filter3.jsx
    -Filters.jsx
    -MainScreen.jsx
    -Sidebar.jsx
    -SummaryBoxes.jsx
    -Table.jsx
 pages
   -api
      -hello.js 
   - _app.js
   - _document.js
   -index.js
  services.json 
  db.json
 code i will provided accordinly to above structure

 pages/index.js:
 ==============
 import Image from "next/image";
import { Inter } from "next/font/google";
import { MainScreen } from "@/components/MainScreen";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [SlideisOpen, setSlideisOpen] = useState(true);
 return (
   <div className="w-[100%] flex flex-row">
   <Sidebar SlideisOpen={SlideisOpen} setSlideisOpen={setSlideisOpen}/>
   <MainScreen SlideisOpen={SlideisOpen}/>
   </div>
  );
}
 pages/_app.js:
  =============
  import "@/styles/globals.css";
    export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
    }
    pages/_document.js:
    ====================
    import { Html, Head, Main, NextScript } from "next/document";
    export default function Document() {
    return (
        <Html lang="en">
        <Head />
        <body>
            <Main />
            <NextScript />
        </body>
        </Html>
    );
    }
      components/Table.jsx:
      ====================
      import { GoDotFill } from "react-icons/go"
import {useState } from "react";
import { FaRegCalendar, FaRegDotCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { LuHash } from "react-icons/lu";
export default function Table({filterData}) {
  const [columns, setColumns] = useState([
    "created_on",""
  ]);
  const handleColumnChange = (column) => {
    setColumns(
      columns.includes(column)
        ? columns.filter((c) => c !== column)
        : [...columns, column]
    );
  };
 return (
    <div className="overflow-auto p-2 h-full">
      <div className="overflow-scroll px-0 scroll-smooth">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <FaRegCalendar /> Created On{" "}
                </p>
              </th>
              <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <FaRegUser /> Payer{" "}
                </p>
              </th>
              <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <FaRegDotCircle /> Status{" "}
                </p>
              </th>
              <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <LuHash /> Email{" "}
                </p>
              </th>
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <LuHash /> Payer Phone{" "}
                </p>
              </th>
              <th className="border-y p-4">
              <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <LuHash /> Services
                </p>
              </th>
              <th className="border-y p-4">
                <p className="antialiased ml-2 font-sans text-sm text-gray-600 flex items-center gap-2 font-normal">
                  <FaRegCalendar /> Scheduled
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData?.map((el) => {
              console.log(el)
              return (
                <tr key={el.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                        <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                          {el.created_on}
                        </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                      <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                        {el.payer}
                      </p>                    
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div className={`flex flex-row font-sans select-none ${el.status=="Inactive"?"bg-slate-100 text-black":el.status=="Active"?"bg-green-100 text-green-700":"bg-blue-100 text-blue-700"} py-1 px-2 text-xs rounded-md`}>
                        <GoDotFill/><span className="">{el.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                      <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                        {el.email}
                      </p>                    
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {`+91 +${el.payer_phone}`}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {el.services}
                    </p>
                  </td> 
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="text-center block antialiased font-sans text-sm text-blue-gray-900 font-normal">
                      {el.scheduled}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
components/SummaryBoxes.jsx:
=============================
const SummaryBoxes = () => {
    return (
      <div className="h-[10%] grid gap-2 grid-cols-3 p-4">
        <div className="bg-white rounded-lg shadow p-2">
          <p className="lg:mt-2 text-gray-600 text-sm lg:text-md">{`All Waitlists {100}`}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-2">
          <p className="lg:mt-2 text-gray-600 text-sm lg:text-md">{`Newly Added {100}`}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-2">
          <p className="lg:mt-2 text-gray-600 text-sm lg:text-md">{`Leads {100}`}</p>
        </div>
      </div>
    );
  };
  export default SummaryBoxes;
components/Sidebar.jsx:
  =========================
  import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { GoArrowSwitch } from "react-icons/go";
import { IoEarthSharp } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";
import { MdOutlineCalendarMonth, MdOutlineHelpOutline } from "react-icons/md";
import { TbCopyCheck } from "react-icons/tb";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { BsGrid1X2 } from "react-icons/bs";
export default function Sidebar({SlideisOpen, setSlideisOpen}) {
   const [dataDate, setDataDate] = useState({});
useEffect(() => {
    function getCurrentDateTime12Hour() {
      const date = new Date();
      const year = date.getFullYear();
      let day = date.getDate();
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const dayName = days[date.getDay()];
      const monthName = months[date.getMonth()];
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours=date.getHours() % 12 || 12
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
      return {
        timeD: formattedTime,
        monthD: monthName,
        dateD: day,
        yearD: year,
        dayD: dayName,
      };
    }
    const currentTime = getCurrentDateTime12Hour();
    setDataDate(currentTime);
  }, []);

  return (
    <div
      className={`transition-all ${
        SlideisOpen ? "w-1/5" : "w-[5%]"
      } bg-gray-100 h-full hidden p-5 border-3px border-black rounded-lg lg:block md:block lg:h-screen md:h-screen`}
    >
      {SlideisOpen ? (
        <nav className=" h-full flex flex-col justify-between items-center">
          <div className="flex flex-row px-2 justify-start mt-2">
            <button>
              <BiLoaderCircle size={40} />
            </button>
            <h3 className="md:text-xl lg:text-2xl text-center text-black font-bold">
              Front-Desk
            </h3>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-end">
              <div
                className="bg-white rounded-lg shadow-2xl"
                onClick={() => setSlideisOpen(!SlideisOpen)}
              >
                <GoArrowSwitch size={30} />
              </div>
            </div>
            <div className="flex flex-row justify-center items-end">
              <h2 className="text-2xl font-bold pr-2">{dataDate.timeD}</h2>
              <h3 className="text-md">
                {dataDate.dayD} {dataDate.dateD} {dataDate.monthD}
              </h3>
            </div>
          </div>
          <div className="">
            <ul className="flex flex-col justify-between mt-2">
              <li className="flex flex-row justify-center items-center text-black">
                <HiOutlineRectangleStack />
                <p className="p-1">Orders</p>
              </li>
              <li className="flex flex-row justify-center items-center text-black">
                <TbCopyCheck />
                <p className="p-1">Subscription</p>
              </li>
              <li className="flex flex-row justify-center items-center text-black">
                <MdOutlineCalendarMonth />
                <p className="p-1">Calender</p>
              </li>
              <li className="flex flex-row justify-center items-center text-black">
                <CgSandClock />
                <p className="p-3">Waitlist</p>
              </li>
            </ul>
          </div>
          <div className="">
            <ul className="flex flex-col justify-between mt-2">
              <li className="flex flex-row justify-center items-center text-black">
                <BsGrid1X2 />
                <p className="p-1">Dashboard</p>
              </li>
              <li className="flex flex-row justify-center items-center text-black">
                <MdOutlineHelpOutline />
                <p className="p-3">help</p>
              </li>
              {/* <li className="text-black">Settings</li> */}
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="h-full flex flex-col items-center">
          <div className="h-[15%]">
            <button className="text-black">
              <BiLoaderCircle size={40} />
            </button>
          </div>
          <div className="h-[85%] flex flex-col justify-between">
            <div className="flex flex-col">
              <div
                className="bg-white rounded-lg shadow-2xl"
                onClick={() => setSlideisOpen(!SlideisOpen)}
              >
                <GoArrowSwitch size={30} />
              </div>
              <ul className="flex flex-col justify-between pt-3 mt-5">
              <li className="flex flex-row justify-center items-center text-black mb-2">
                  <IoEarthSharp />
                </li>
                <li className="flex flex-row justify-center items-center text-black mb-2">
                  <HiOutlineRectangleStack />
                </li>
                <li className="flex flex-row justify-center items-center text-black mb-2">
                  <TbCopyCheck />
                </li>
                <li className="flex flex-row justify-center items-center text-black mb-2">
                  <MdOutlineCalendarMonth />
                </li>
                <li className="flex flex-row justify-center items-center text-black mb-2">
                  <CgSandClock />
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex flex-col justify-between mt-2">
                <li className="flex flex-row justify-center items-center text-black mb-2">
                  <BsGrid1X2 />
                </li>
                <li className="flex flex-row justify-center items-center text-black">
                  <MdOutlineHelpOutline />
                </li>
                {/* <li className="text-black">Settings</li> */}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
components/MainScreen.jsx:
==========================
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Table from './Table'
import SummaryBoxes from './SummaryBoxes'
import Filters from './Filters'
import axios from 'axios'
export const MainScreen = ({SlideisOpen}) => {
  const [waitlistData, setWaitlistData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`https://backend-data-theta.vercel.app/data`).then((res) => {
          console.log("dfsadfgag",res)
          setWaitlistData(res.data.waitlistData) 
          setFilterData(res.data.waitlistData)
        });
      } catch (error) {
        console.error("Error fetching single product:", error);
        throw error;
      }
    };
    fetchData();
  }, []);
   return (
    <div className={`transition-all ${SlideisOpen? "w-4/5" : "w-[95%]"} flex flex-col justify-around m-auto h-screen`}>  
    <SummaryBoxes/>
    <Filters filterData={filterData} setFilterData={setFilterData} waitlistData={waitlistData}/>
    
      <div className="h-[70%]">

        <Table filterData={filterData}/>
      </div>
    </div>
  )
}
components/Filter3.jsx:
=======================
import axios from "axios";
import React, { useEffect, useState } from "react";
export const Filter3 = () => {
  const [serviceData, setServiceData] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("name");
  const [searchSInput, setSearchSInput] = useState("");
  const [filteredSResults, setFilteredSResults] = useState([]);
  const [searchCond, setSearchCond] = useState({});
  const [filteredTResults, setFilteredTResults] = useState([]);
  const [selectedSItem, setSelectedSItem] = useState(null);
  useEffect(() => {
    const fetchSData = async () => {
      try {
        await axios.get(`https://sarikasingh30.github.io/data-api-agent/services.json`).then((res) => {
          setServiceData(res.data.services);
        });
      } catch (error) {
        console.error("Error fetching single product:", error);
        throw error;
      }
    };
    fetchSData();
  }, []);
 // Set the Search by Name searchInput ..................................................................
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchSInput(input);
  };
 // Set the Tag based Criteria........................................................................
  const handleSetCond = (e, x) => {
    let newS = { [x]: e.target.value };
    setSearchCond({ ...searchCond, ...newS });
  };
  useEffect(() => {
    if (filterCriteria == "name") {
      if (searchSInput.length > 0) {
        const results = serviceData
          .filter((item) => item.name.toLowerCase().startsWith(searchSInput))
          .slice(0, 10);
        setFilteredSResults(results);
      } else {
        setFilteredSResults([]);
      }
    } else {
      if (searchCond.type !== "show" && searchCond.status !== "show") {
        let results = serviceData.filter(
          (item) => item.type == searchCond.type
        );
        let fullData = results
          .filter((item) => item.status == searchCond.status)
          .slice(0, 10);
        setFilteredTResults(fullData);
      } else {
        setFilteredTResults([]);
      }
    }
  }, [searchSInput, searchCond]);
  return (
    <div>
      <div>
        <div className="filter-options flex flex-row items-center">
          <input
            type="radio"
            id="search-by-name"
            name="search-option"
            onChange={() => setFilterCriteria("name")}
            className="mx-2"
          />
          <label htmlFor="search-by-name">Search by name</label>
          <input
            type="radio"
            id="search-by-tags"
            name="search-option"
            onChange={() => setFilterCriteria("tag")}
            className="mx-2"
          />
          <label htmlFor="search-by-tags">Search by tags</label>
        </div>
        {filterCriteria == "name" ? (
          <div>
            <input
              type="text"
              value={searchSInput}
              placeholder="Search service by name"
              className="w-full px-3 py-2 border rounded mb-4"
              onChange={handleSearch}
            />
            {filteredSResults.length > 0 && (
              <div className="results">
                <h4>
                  Showing {filteredSResults.length} results matching "
                  {searchSInput}":
                </h4>
                {filteredSResults.map((el) => (
                  <div
                    key={el.id}
                    className="flex flex-row justify-between m-0.5"
                  >
                    <label>
                      <input type="checkbox" />
                      {el.name}
                    </label>
                    <div className="flex flex-row justify-end">
                      {" "}
                      <div className="font-sans ml-2 bg-slate-100 text-black p-1 text-xs rounded-md">
                        <span className="">{el.type}</span>
                      </div>
                      <div
                        className={`font-sans ml-2 bg-slate-100 ${
                          el.status == "Private"
                            ? "text-green-700"
                            : el.status == "Public"
                            ? "text-amber-600"
                            : el.status == "Disable"
                            ? "text-red-600"
                            : el.status == "Draft"
                            ? "text-blue-500"
                            : ""
                        } text-green p-1 text-xs rounded-md`}
                      >
                        <span className="">{el.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            <label>Service type</label>
            <select
              value={searchCond.type}
              onChange={(e) => handleSetCond(e, "type")}
              className="w-full px-3 py-2 border rounded"
              style={{ maxHeight: "232px", overflowY: "auto" }}
            >
              <option value="show">Show All</option>
              <option value="Class">Class</option>
              <option value="Appointment">Appointment</option>
              <option value="Facility">Facility</option>
              <option value="Class Pack">Class Pack</option>
              <option value="Membership">Membership</option>
              <option value="General Items">General Items</option>
            </select>
            <label>Status</label>
           <select
              id="status"
              value={searchCond.status}
              onChange={(e) => handleSetCond(e, "status")}
              className="w-full px-3 py-2 border rounded"
              style={{ maxHeight: "232px", overflowY: "auto" }}
            >
              <option value="show">Show All</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Disable">Disable</option>
              <option value="Draft">Draft</option>
            </select>
           {filteredTResults > 0 && (
              <div className="results">
                <h4>
                  Showing {filteredTResults.length} results matching " type=
                  {searchCond.type} and status = {searchCond.status}" :
                </h4>
                {filteredTResults.map((el) => (
                  <div
                    key={el.id}
                    className="flex flex-row justify-between m-0.5"
                  >
                    <label>
                      <input type="checkbox" />
                      {el.name}
                    </label>
                    <div className="flex flex-row justify-end">
                      {" "}
                      <div className="font-sans ml-2 bg-slate-100 text-black p-1 text-xs rounded-md">
                        <span className="">{el.type}</span>
                      </div>
                      <div
                        className={`font-sans ml-2 bg-slate-100 ${
                          el.status == "Private"
                            ? "text-green-700"
                            : el.status == "Public"
                            ? "text-amber-600"
                            : el.status == "Disable"
                            ? "text-red-600"
                            : el.status == "Draft"
                            ? "text-blue-500"
                            : ""
                        } text-green p-1 text-xs rounded-md`}
                      >
                        <span className="">{el.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
components/Filters.jsx:
=======================
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect} from "react";
import { LuFilter } from "react-icons/lu";
import { Filter3 } from "./Filter3";
const Filters = ({ filterData, setFilterData, waitlistData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("scheduledDate");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeRange, setTimeRange] = useState("All time");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setTimeRange("All time");
    setSearchInput("");
    setSearchResults([]);
    setSelectedPeople([]);
  };
//  Time Filter..........................................................................
  const handleChange = (e) => {
    const selectedTimeRange = e.target.value;
    setTimeRange(selectedTimeRange);
  };
  const filterDataFn = (timeRange) => {
    let filtered = [];
    const currentDate = new Date();
    switch (timeRange) {
      case "All time":
        filtered = filterData;
        break;
      case "Last 30 days":       
        filtered = waitlistData.filter((item) => {
          const itemDate = new Date(item.createdOn);
    
          if ((currentDate - itemDate) / (1000 * 60 * 60 * 24) <= 30)
            return item;
        });
        break;
      case "This month":
        filtered = waitlistData.filter((item) => {
          const itemDate = new Date(item.createdOn);
          if (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          )
            return item;
        });
        break;
      case "Last month":
        const lastMonth = new Date(
          currentDate.setMonth(currentDate.getMonth() - 1)
        );
        filtered = waitlistData.filter((item) => {
          const itemDate = new Date(item.createdOn);
          if (
            itemDate.getMonth() == lastMonth.getMonth() &&
            itemDate.getFullYear() === lastMonth.getFullYear()
          )
            return item;
        });
        break;
      case "This quarter":
        const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);
        filtered = waitlistData.filter((item) => {
          const itemDate = new Date(item.createdOn);
          const itemQuarter = Math.floor((itemDate.getMonth() + 3) / 3);
          return (
            itemQuarter === currentQuarter &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });
        break;
      case "2 quarter ago":
        const previousQuarter =
          Math.floor((currentDate.getMonth() + 3) / 3) - 2;
        filtered = waitlistData.filter((item) => {
          const itemDate = new Date(item.createdOn);
          const itemQuarter = Math.floor((itemDate.getMonth() + 3) / 3);
          return (
            itemQuarter === previousQuarter &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        });
        break;
      case "This year":
        filtered = waitlistData.filter((item) => {
          const itemDate = new Date(item.createdOn);
          return itemDate.getFullYear() === currentDate.getFullYear();
        });
        break;
      case "Last year":
        filtered = waitlistData.filter((item) => {
          const itemDate = new Date(item.createdOn);
          return itemDate.getFullYear() === currentDate.getFullYear() - 1;
        });
        break;
      case "Custom":
        if (startDate && endDate) {
          const startVal = new Date(startDate);
          const endVal = new Date(endDate);
          filtered = waitlistData.filter((item) => {
            const itemDate = new Date(item.createdOn);
            return itemDate >= startVal && itemDate <= endVal;
          });
        }
        break;
      default:
        filtered = filterData;
    }
    setFilterData(filtered);
  };
  // Search People Filter ...................................................................
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
  };
  useEffect(() => {
    if (searchInput.length > 0) {
      const filteredPResults = waitlistData
        .filter((person) =>
          person.payer.toLowerCase().startsWith(searchInput.toLowerCase())
        )
        .slice(0, 10)
        .sort((a, b) => a.payer.localeCompare(b.payer));

      setSearchResults(filteredPResults);
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);
 const handleSelectPerson = (id) => {
    const selectedPerson = waitlistData.find((person) => person.id === id);
    if (selectedPerson) {
      if (!selectedPeople.some((person) => person.id === id)) {
        setSelectedPeople([...selectedPeople, selectedPerson]);
      } else {
        setSelectedPeople(selectedPeople.filter((person) => person.id !== id));
      }
    }
  };
const isSelected = (id) => selectedPeople.some((person) => person.id === id);
const handleRemovePerson = (person) => {
    setSelectedPeople(selectedPeople.filter((p) => p.id !== person));
  };
  const applyFilters = () => {
    // Apply filter logic here
    filterDataFn(timeRange);
    setIsOpen(false);
  };
return (
    <>
      <div className="px-3 h-[5%]">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <LuFilter />
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
              <div className="flex">
                <div className="w-1/4 border-r pr-4">
                  <button
                    className={`block w-full text-left px-4 py-2 ${
                      selectedTab === "scheduledDate" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setSelectedTab("scheduledDate")}
                  >
                    Scheduled Date
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 ${
                      selectedTab === "people" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setSelectedTab("people")}
                  >
                    People
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 ${
                      selectedTab === "servicesProducts" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setSelectedTab("servicesProducts")}
                  >
                    Services / Products
                  </button>
                </div>
                <div className="w-3/4 pl-4">
                  {selectedTab === "scheduledDate" && (
                    <div>
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="timeRange"
                      >
                        Show orders for
                      </label>
                      <div className="relative mb-4">
                        <select
                          id="timeRange"
                          value={timeRange}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border rounded"
                          style={{ maxHeight: "232px", overflowY: "auto" }}
                        >
                          <option value={"All time"}>All time</option>
                          <option value="C">Custom</option>
                          <option value={"Last 30 days"}>Last 30 days</option>
                          <option value={"This month"}>This month</option>
                          <option value={"Last month"}>Last month</option>
                          <option value={"This quarter"}>This quarter</option>
                          <option value={"2 quarter ago"}>2 quarter ago</option>
                          <option value={"This year"}>This year</option>
                          <option value={"Last year"}>Last year</option>
                        </select>
                      </div>
                      <div className="flex space-x-4">
                        <div>
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="fromDate"
                          >
                            From
                          </label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="w-full px-3 py-2 border rounded"
                            placeholderText="Pick a date"
                          />
                        </div>
                        <div>
                          <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="toDate"
                          >
                            To
                          </label>
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="w-full px-3 py-2 border rounded"
                            placeholderText="Pick a date"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedTab === "people" && (
                    <div>                      
                      <input
                        type="text"
                        id="peopleFilter"
                        value={searchInput}
                        onChange={handleSearch}
                        className="w-full px-3 py-2 border rounded mb-4"
                        placeholder="Search for people or clients' name"
                      />
                      <div>
                        <div className="search-results">
                          {selectedPeople.length > 0 && (
                            <div className="selected-people">
                              <h4>Selected:</h4>
                              {selectedPeople.map((person) => (
                                <div key={person.id} className="person">
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={isSelected(person.id)}
                                      onChange={() =>
                                        handleRemovePerson(person.id)
                                      }
                                    />
                                    {person.payer}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                          {searchResults.length>0 && (<div className="results">
                            <h4>Showing {searchResults.length} results matching "{searchInput}":</h4>
                            {searchResults.map((person) => (
                              <div key={person.id} className="flex flex-row m-0.5">
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={isSelected(person.id)}
                                    onChange={() =>
                                      handleSelectPerson(person.id)
                                    }
                                  />
                                  {person.payer}
                                </label>
                                <div className="flex flex-row font-sans ml-2 bg-slate-100 text-black p-1 text-xs rounded-md">
                        <span className="">payer</span>
                      </div>
                              </div>
                            ))}
                          </div>)}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedTab === "servicesProducts" && <Filter3/>}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Reset to Default
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Filters;
 this was code i want implement means convert this code according to my structure


app
 -component
    -EditColumnModal.jsx
    -FilterModal.jsx
    -Layout.jsxx
    -Sidebar.js
    -SummaryBoxes.jsx
    -Table.jsx
 -layout.js
 -page.js
