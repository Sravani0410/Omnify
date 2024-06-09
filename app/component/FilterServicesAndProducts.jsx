import axios from "axios";
import React, { useEffect, useState } from "react";

const FilterServicesAndProducts = ({ onFilter }) => {
  const [servicedata, setServiceData] = useState([]);
  const [filterbycategory, setFilterByCategory] = useState("name");
  const [serviceName, setServiceName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchbytag,setSearchByTag]=useState({});
  const [filteredTagsResult,setFilteredTagsResult]=useState([])

  useEffect(() => {
    const serviceFetchData = async () => {
      try {
        const res = await axios.get(`https://backend-data-nine.vercel.app/services`);
        setServiceData(res.data);
        // console.log("Fetched services data:", res.data);
      } catch (err) {
        console.error("Error while fetching services data:", err);
      }
    };
    serviceFetchData();
  }, []);

  useEffect(() => {
    if (filterbycategory === "name") {
      if (serviceName.length > 0) {
        const result = servicedata
          .filter((e) => e.name.toLowerCase().startsWith(serviceName))
          .slice(0, 10);
        setSearchResult(result);
        // console.log("Filtered search results:", result); 
      } else {
        setSearchResult([]);
      }
    }
  }, [serviceName, servicedata]);

  useEffect(() => {
    onFilter(searchResult);
  }, [searchResult, onFilter]);

  useEffect(()=>{
    if(filterbycategory=="name"){
        if(serviceName.length>0){
            const result=servicedata
            .filter((e)=>e.name.toLowerCase().startsWith(serviceName))
            .slice(0,10);
            setSearchResult(result);
        }
        else{
            setSearchResult([])
        }
    }
    else{
        if(searchbytag.type!=="show" && searchbytag.status!=="show"){
            let result=servicedata
            .filter((e)=>e.type==searchbytag.type)
            let Data=result.filter((e)=>e.status==searchbytag.status)
            .slice(0,10);
            setFilteredTagsResult(Data)
        }else{
            setFilteredTagsResult([])
        }
    }
  },[serviceName,searchbytag])

  const handleSearchByName = (e) => {
    const searchname = e.target.value.toLowerCase();
    setServiceName(searchname);
  };

//   Search by tags-----------------------------

const handleServiceType=(e,type)=>{
    let updatedServiceSelction={
        ...searchbytag,[type]:e.target.value
    };
    setSearchByTag(updatedServiceSelction)
}
  return (
    <div>
      <div className="filter-options flex flex-row items-center">
        <input
          type="radio"
          id="search-by-name"
          name="search-option"
          className="mx-2"
          onChange={() => setFilterByCategory("name")}
          checked={filterbycategory === "name"}
        />
        <label htmlFor="search-by-name">Search by name</label>
        <input
          type="radio"
          id="search-by-tags"
          name="search-option"
          className="mx-2"
          onChange={() => setFilterByCategory("tag")}
        />
        <label htmlFor="search-by-tags">Search by tags</label>
      </div>
      {filterbycategory === "name" ? (
        <div>
          <input
            type="text"
            className="px-3 py-2 w-full mb-4 border rounded"
            placeholder="Search Service By Name"
            onChange={handleSearchByName}
            value={serviceName}
          />
          {searchResult.length > 0 && (
            <div>
              <h4>
                Showing {searchResult.length} results matching  &quot;{serviceName}&quot;:
              </h4>
              {searchResult.map((el) => (
                <div className="flex flex-row justify-between m-0.5" key={el.id}>
                  <label>
                    <input type="checkbox" />
                    {el.name}
                  </label>
                  <div className="p-1 ml-2 bg-slate-100 text-black text-xs rounded-md font-sans">
                    <span>{el.type}</span>
                  </div>
                  <div
                    className={`ml-2 p-1 bg-slate-100 font-sans text-green text-xs rounded-md ${
                      el.status === "Private"
                        ? "text-green-700"
                        : el.status === "Public"
                        ? "text-amber-600"
                        : el.status === "Disable"
                        ? "text-red-600"
                        : el.status === "Draft"
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    <span>{el.status}</span>
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
            className="px-3 py-2 w-full border rounded"
            onChange={(e)=>handleServiceType(e,"type")}
            value={searchbytag.type}
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
              className="px-3 py-2 w-full border rounded"
              onChange={(e)=>handleServiceType(e,"status")}
              value={searchbytag.status}
            >
                <option value="show">Show All</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Disable">Disable</option>
                <option value="Draft">Draft</option>
            </select>
             {filteredTagsResult>0&&(
                <div>
                    <h4>Showing {filteredTagsResult.length} results matching &quot;type={searchbytag.type} and status ={searchbytag.status}&quot;:</h4>
                    {filteredTagsResult.map((el)=>(
                        <div key={el.id} className="flex flex-row justify-between m-0.5">
                            <label>
                                <input type="checkout"/>
                                {el.name}
                            </label>
                            <div className="flex flex-row justify-end">
                                <div className="ml-2 p-1 bg-slate-100 text-black text-xs rounded-md">
                                    <span>{el.type}</span>
                                </div>
                                <div className={`${
                                     el.status == "Private"
                                     ? "text-green-700"
                                     : el.status == "Public"
                                     ? "text-amber-600"
                                     : el.status == "Disable"
                                     ? "text-red-600"
                                     : el.status == "Draft"
                                     ? "text-blue-500"
                                     : ""
                                } ml-2 p-1 font-sans text-green text-xs rounded-md `}>
                                    <span>{el.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             )}
        </div>
      )}
    </div>
  );
};

export default FilterServicesAndProducts;
