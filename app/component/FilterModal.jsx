import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuFilter } from "react-icons/lu";
import FilterServicesAndProducts from "./FilterServicesAndProducts";

export default function FilterModal({ data, setData, waitlistData }) {
  console.log("waitlistDatea===============>", waitlistData);
  const [isopen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("scheduledDate");
  const [dateRange, setDateRange] = useState("All time");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchPeople, setSearchPeople] = useState("");
  const [searchPayer, setSearchPayer] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [filteredServices,setFilteredServices]=useState([])

  // filter with Secheduled Date----------------------------------

  const handleDateRange = (e) => {
    const selectedDateRange = e.target.value;
    setDateRange(selectedDateRange);
  };

  const filterTableData = (dateRange,selectedPerson,filteredServices) => {
    const currentDate = new Date();
    let filteredData = waitlistData;

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
        filteredData = filterByMonth(
          waitlistData,
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        );
        break;
      case "This quarter":
        filteredData = filterByQuarter(waitlistData, currentDate);
        break;
      case "2 quarter ago":
        filteredData = filterByQuarter(
          waitlistData,
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 6)
        );
        break;
      case "This year":
        filteredData = filterByYear(waitlistData, currentDate);
        break;
      case "Last year":
        filteredData = filterByYear(
          waitlistData,
          new Date(currentDate.getFullYear() - 1, 0)
        );
        break;
      default:
        filteredData = data;
    }
    if (selectedPerson.length > 0) {
      filteredData = filteredData.filter((data) =>
        selectedPerson.some((item) => item.id === data.id)
      );
    }
    console.log("filteredServices-------->",filteredServices)
    if (filteredServices.length > 0) {
      // console.log("ghgfhg")  
      const serviceIds = filteredServices.map(service => service.id);
      console.log("serviceIds",serviceIds) 
      filteredData = filteredData.filter(item => serviceIds.includes(parseInt(item.serviceId)));
      console.log("filteredData11111",filteredData) 
    }
    console.log("filteredData====>",filteredData)
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
  const handleSearch = (e) => {
    const searchvalue = e.target.value;
    setSearchPeople(searchvalue);
  };

  useEffect(() => {
    if (searchPeople.length > 0) {
      const filteredData = waitlistData
        .filter((ele) =>
          ele.payer.toLowerCase().startsWith(searchPeople.toLowerCase())
        )
        .slice(0, 10)
        .sort((a, b) => a.payer.localeCompare(b.payer));
      setSearchPayer(filteredData);
    } else {
      setSearchPayer([]);
    }
  }, [searchPeople]);

  const handleSelectedPayer = (id) => {
    const selectedPayer = waitlistData.find((p) => p.id === id);
    if (selectedPayer) {
      if (!selectedPerson.some((p) => p.id === id)) {
        setSelectedPerson([...selectedPerson, selectedPayer]);
      } else {
        setSelectedPerson(selectedPerson.filter((person) => person.id !== id));
      }
    }
  };
  

  const removePayer = (item) => {
    setSelectedPerson(selectedPerson.filter((p) => p.id !== item));
  };
  const selectedResult = (id) =>
    selectedPerson.some((person) => person.id === id);
  // filter with services and products-------------------------

  const applyDataFilter = () => {
    filterTableData(dateRange, selectedPerson,filteredServices);
    setIsOpen(false);
  };
  const resetDefaultFilter = () => {
    setIsOpen(false);
    setStartDate(null);
    setEndDate(null);
    setDateRange("All time");
    setSearchPayer([]);
    setSearchPeople("");
    setSelectedPerson([]);
  };
console.log("filteredServices",filteredServices)
  return (
    <>
      <div className="px-3 h-[1.5%]">
        <button className="p-4 flex" onClick={() => setIsOpen(!isopen)}>
          <LuFilter className="mr-2"/>
          Filter
        </button>
        {isopen && (
          <div className="fixed inset-0 bg-opacity-20 bg-gray-900  flex justify-center items-center">
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
                            onChange={(e) => setStartDate(e)}
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
                            onChange={(e) => setEndDate(e)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "people" && (
                    <div>
                      <input
                        type="text"
                        className="px-3 py-2 w-full border rounded mb-4"
                        placeholder="Search for People or Client name"
                        onChange={handleSearch}
                        id="peopleFilter"
                        value={searchPeople}
                      />

                     <div>
                     {selectedPerson.length > 0 && (
                        <div>
                          <h4>Selected :</h4>
                          {selectedPerson.map((ele) => (
                            <div key={ele.id}>
                              <label>
                                <input
                                  type="checkbox"
                                  onChange={() => removePayer(ele.id)}
                                  checked={selectedResult(ele.id)}
                                />
                                {ele.payer}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                     </div>
                      {searchPeople.length > 0 && (
                        <div>
                          <h4>
                            Showing {searchPayer.length} results matching "
                            {searchPeople}":
                          </h4>
                          {searchPayer.map((p) => (
                            <div key={p.id} className="m-0.5 flex flex-row">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedResult(p.id)}
                                  onChange={() => handleSelectedPayer(p.id)}
                                />
                                {p.payer}
                              </label>
                              <div className="flex flex-row font-sans ml-2 bg-slate-100 text-black p-1 text-xs rounded-md"></div>
                              <span>payer</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === "servicesAndProducts" && (
                    <FilterServicesAndProducts onFilter={setFilteredServices}/>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-slate-100 text-black rounded mr-2"
                  onClick={resetDefaultFilter}
                >
                  Reset to Default
                </button>
                <button
                  className="px-4 py-2 bg-black text-white rounded"
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
