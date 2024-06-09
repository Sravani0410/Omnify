"use client";
import { useEffect, useState } from "react";
import { FiColumns } from "react-icons/fi";
import Layout from "./component/Layout";
import Table from "./component/Table";
import axios from "axios";
import SummaryBoxes from "./component/SummaryBoxes";
import FilterModal from "./component/FilterModal";
import EditColumnModal from "./component/EditColumnModal";

export default function Home() {
  const [data, setData] = useState([]);
  const [waitlistData, setWaitlistData] = useState([]);
  const [editshowmodal, setEditShowModal] = useState();
  const [selectedColumns, setSelectedColumns] = useState([
    'created_on', 'payer', 'status', 'email', 'payer_phone', 'services', 'scheduled'
  ]);
  useEffect(() => {
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
    fetchData();
  }, []);

  const handleApply=()=>{
    setEditShowModal(false)
  }
  return (
    <Layout>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Waitlist</h1>
      </div>
      <SummaryBoxes data={data} />
      <div className="flex flex-row justify-between">
        <FilterModal
          data={data}
          setData={setData}
          waitlistData={waitlistData}
        />
        <div className="flex flex-row justify-between">
          <button onClick={() => setEditShowModal(true)}>
            <FiColumns />
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
      <div className="h-[70%]">
        <Table data={data} selectedColumns={selectedColumns} />
      </div>
    </Layout>
  );
}
