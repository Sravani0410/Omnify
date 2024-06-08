import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuFilter } from "react-icons/lu";

export default function FilterModal({ data, setData, waitlistData }) {
  const [isopen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("scheduledDate");
  const [dateRange, setDateRange] = useState("All time");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // filter with Secheduled Date----------------------------------

  const handleDateRange = (e) => {
    const selectedDateRange = e.target.value;
    setDateRange(selectedDateRange);
  };

  const filterTableData = (dateRange) => {
    const currentDate = new Date();
    let filteredData = [];

    switch (dateRange) {
      case "All time":
        filteredData = data;
        break;
      case "Custom":
        if (startDate && endDate) {
          const startingValue = new Date(startDate);
          const endingValue = new Date(endDate);
          filteredData = waitlistData.filter((val) => {
            const dateValue = new Date(val.created_on);
            return dateValue >= startingValue && dateValue <= endingValue;
          });
        }
        break;
        case "Last 30 days":
          filteredData = filterByDateRange(waitlistData, currentDate, 30);
          break;
        case "This month":
          filteredData = filterByMonth(waitlistData, currentDate);
          break;
        case "Last month":
          filteredData = filterByMonth(waitlistData, new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
          break;
        case "This quarter":
          filteredData = filterByQuarter(waitlistData, currentDate);
          break;
        case "2 quarter ago":
          filteredData = filterByQuarter(waitlistData, new Date(currentDate.getFullYear(), currentDate.getMonth() - 6));
          break;
        case "This year":
          filteredData = filterByYear(waitlistData, currentDate);
          break;
        case "Last year":
          filteredData = filterByYear(waitlistData, new Date(currentDate.getFullYear() - 1, 0));
          break;
          default: filteredData=data
    }
    setData(filteredData);
  };
  const filterByDateRange = (waitlistData, currentDate, days) => {
    return waitlistData.filter((item) => {
      const itemDate = new Date(item.created_on);
      return (currentDate - itemDate) / (1000 * 60 * 60 * 24) <= days;
    });
  };
  
  const filterByMonth = (waitlistData, currentDate) => {
    return waitlistData.filter((item) => {
      const itemDate = new Date(item.created_on);
      return (
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };
  
  const filterByQuarter = (waitlistData, currentDate) => {
    const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);
    return waitlistData.filter((item) => {
      const itemDate = new Date(item.created_on);
      const itemQuarter = Math.floor((itemDate.getMonth() + 3) / 3);
      return (
        itemQuarter === currentQuarter &&
        itemDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };
  
  const filterByYear = (waitlistData, currentDate) => {
    return waitlistData.filter((item) => {
      const itemDate = new Date(item.created_on);
      return itemDate.getFullYear() === currentDate.getFullYear();
    });
  };
  //  filter with people--------------------------------------

  // filter with services and products-------------------------

  const applyDataFilter = () => {
    filterTableData(dateRange);
    setIsOpen(false);
  };
  const resetDefaultFilter=()=>{
    setIsOpen(false);
    setStartDate(null);
    setEndDate(null);
    setDateRange("All time")
  }

  return (
    <>
      <div className="px-3 h-[5%]">
        <button className="p-2" onClick={() => setIsOpen(!isopen)}>
          <LuFilter />
        </button>
        {isopen && (
          <div className="fixed inset-0 bg-opacity-30 bg-gray-900  flex justify-center items-center">
            <div className="w-3/4 p-6 bg-white rounded-lg shadow-lg max-w-4xl">
            <div className="flex">
              <div className="w-1/4 pr-4 border-r">
                <button
                  onClick={() => setActiveTab("scheduledDate")}
                  className={`block w-full text-left px-4 py-2 ${
                    activeTab === "scheduledDate" ? "bg-gray-200" : ""
                  }`}
                >
                  Scheduled Date
                </button>
                <button
                  onClick={() => setActiveTab("people")}
                  className={`block w-full text-left px-4 py-2 ${
                    activeTab === "people" ? "bg-gray-200" : ""
                  }`}
                >
                  People
                </button>
                <button
                  onClick={() => setActiveTab("servicesAndProducts")}
                  className={`block w-full text-left px-4 py-2 ${
                    activeTab === "servicesAndProducts" ? "bg-gray-200" : ""
                  }`}
                >
                  Services / Products
                </button>
              </div>
              <div className="w-3/4 pl-4">
                {activeTab === "scheduledDate" && (
                  <div>
                    <label
                      className="font-bold text-gray-700 block mb-2"
                      htmlFor="timeRange"
                    >
                      Show orders for
                    </label>
                    <div className="relative mb-4">
                      <select
                        className="px-2 py-2 w-full border rounded"
                        id="timeRange"
                        style={{ maxHeight: "232px", overflowY: "auto" }}
                        onChange={handleDateRange}
                        value={dateRange}
                      >
                        <option value={"All time"}>All time</option>
                        <option value={"Custom"}>Custom</option>
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
                          className="text-gray-700 block font-bold mb-2"
                          htmlFor="fromDate"
                        >
                          From
                        </label>
                        <DatePicker
                          className="px-3 py-2 w-full border rounded"
                          placeholderText="Pick the Date"
                          onChange={(e)=>setStartDate(e)}
                          selected={startDate}
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 block font-bold mb-2"
                          htmlFor="toDate"
                        >
                          To
                        </label>
                        <DatePicker
                          className="px-3 py-2 w-full border rounded"
                          placeholderText="Pick the Date"
                          selected={endDate}
                          onChange={(e)=>setEndDate(e)}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "people" && (
                  <div>
                    <input
                      className="px-3 py-2 w-full border rounded mb-4"
                      placeholder="Search for People or Client name"
                    />
                  </div>
                )}
                {activeTab === "servicesAndProducts" && (
                  <div className="filter-options flex flex-row items-center">
                    <input
                      type="radio"
                      id="search-by-name"
                      name="search-option"
                      className="mx-2"
                    />
                    <label htmlFor="search-by-name">Search by name</label>
                    <input
                      type="radio"
                      id="search-by-tags"
                      name="search-option"
                      className="mx-2"
                    />
                    <label htmlFor="search-by-tags">Search by tags</label>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2" onClick={resetDefaultFilter}>
                Reset to Default
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={applyDataFilter}
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
}
