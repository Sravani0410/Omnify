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
  const [editshowmodal, setEditShowModal] = useState();
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <Layout>
      <div className="mb-2 flex justify-between items-center">
        <h1 className="mb-2 text-2xl font-bold">Waitlist</h1>
      </div>
      <SummaryBoxes className="mt-4" data={data} />
      <div className="mb-2 flex flex-row justify-between">
        <FilterModal
          data={data}
          setData={setData}
          waitlistData={waitlistData}
        />
        <div className="flex flex-row justify-between">
          <button className="p-4 rounded bg-gray-100 hover:bg-gray-200" onClick={handleRefresh}>
          <BsArrowRepeat />
          </button>
          <button
          className="p-4 rounded bg-gray-100 hover:bg-gray-200" 
          onClick={() => setEditShowModal(true)}>
            <FiColumns />
          </button>
          <button className="p-4 rounded bg-gray-100 hover:bg-gray-200">
          <GoDownload />
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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Layout>
  );
}
