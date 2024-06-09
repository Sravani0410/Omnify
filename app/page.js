"use client"
import { useEffect, useState } from 'react';
import { FiColumns } from "react-icons/fi";
import Layout from './component/Layout';
import Table from './component/Table';
import axios from 'axios';
import SummaryBoxes from './component/SummaryBoxes';
import FilterModal from './component/FilterModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
   const [waitlistData,setWaitlistData]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://backend-data-nine.vercel.app/data`);
        setData(res.data);
        setWaitlistData(res.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Waitlist</h1>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Filter
        </button> */}
      </div>
      <SummaryBoxes/>
      <div className='flex flex-row justify-between'>
      <FilterModal
         data={data}
         setData={setData}
         waitlistData={waitlistData}
      />
      <FiColumns />
      </div>
      
      <div className="h-[70%]">
        <Table data={data} />
      </div>
    </Layout>
  );
}
