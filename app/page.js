"use client";
import { useEffect, useState } from "react";
import { FiColumns } from "react-icons/fi";
import Layout from "./component/Layout";
import Table from "./component/Table";
import axios from "axios";
import SummaryBoxes from "./component/SummaryBoxes";
import FilterModal from "./component/FilterModal";
import EditColumnModal from "./component/EditColumnModal";
import Pagination from "./component/Pagination";
import { GoDownload } from "react-icons/go";
import { BsArrowRepeat } from "react-icons/bs";

export default function Home() {
  const [data, setData] = useState([]);
  const [waitlistData, setWaitlistData] = useState([]);
  const [editshowmodal, setEditShowModal] = useState(false);
  // const [filteredData, setFilteredData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([
    'created_on', 'payer', 'status', 'email', 'payer_phone', 'services', 'scheduled'
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://backend-data-nine.vercel.app/data`
      );
      setData(res.data);
      setWaitlistData(res.data);
      // setFilteredData(res.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleApply=()=>{
    setEditShowModal(false)
  }
  const handleRefresh=()=>{
    fetchData()
  }
  const handleFilter = (filteredData) => {
    setData(filteredData);
    setCurrentPage(1)
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <Layout>
      <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4 lg:mb-0 md:mb-0">Waitlist</h2>
        
      </div>          
      <SummaryBoxes data={data} />
      <div className="mb-2 flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <FilterModal
          data={waitlistData  }
          setData={handleFilter}
          waitlistData={waitlistData}
        />
        <div className="flex flex-row justify-between mt-2 sm:mt-0 space-x-2">
          <button className="ml-2 p-2 bg-white-600 text-black rounded-lg flex items-center" onClick={handleRefresh}>
          <BsArrowRepeat className="mr-2"/>
          </button>
          <button
          className="p-2 bg-white-600 text-black rounded-lg flex items-center" 
          onClick={() => setEditShowModal(true)}>
            <FiColumns className="mr-2"/>
          </button>
          <button className="p-2 bg-white-600 text-black rounded-lg flex items-center">
          <GoDownload className="mr-2"/>
          </button>
        </div>
        {editshowmodal && (
          <EditColumnModal
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
            onClose={handleApply}
          />
        )}
      </div>
      <div className="h-[65%] mt-1">
        <Table data={currentData} selectedColumns={selectedColumns} />
      </div>
      <div className="mt-auto flex-none w-full flex justify-between">

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      </div>
      </div>
     
    </Layout>
  );
}
