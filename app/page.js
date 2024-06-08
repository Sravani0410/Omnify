"use client"
import { useEffect, useState } from 'react';
import Layout from './component/Layout';
import FilterModal from './component/FilterModal';
import Table from './component/Table';
import axios from 'axios';



const filterData = (data, filters) => {
  return data.filter(item => {
    let isMatch = true;

    if (filters.dateRange) {
      // Apply date range filter logic here
    }

    if (filters.fromDate && filters.toDate) {
      const itemDate = new Date(item.createdOn);
      const fromDate = new Date(filters.fromDate);
      const toDate = new Date(filters.toDate);
      if (!(itemDate >= fromDate && itemDate <= toDate)) {
        isMatch = false;
      }
    }

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      if (!(item.payer.toLowerCase().includes(searchTerm) || item.attendee?.toLowerCase().includes(searchTerm))) {
        isMatch = false;
      }
    }

    if (filters.serviceSearchType && filters.serviceSearchValue) {
      const searchValue = filters.serviceSearchValue.toLowerCase();
      if (filters.serviceSearchType === 'name' && !item.services.toLowerCase().includes(searchValue)) {
        isMatch = false;
      }
      if (filters.serviceSearchType === 'tags' && !item.serviceTags?.toLowerCase().includes(searchValue)) {
        isMatch = false;
      }
    }

    return isMatch;
  });
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);

  // const applyFilter = (filterValues) => {
  //   const filteredData = filterData(initialData, filterValues);
  //   setData(filteredData);
  //   setFilters(filterValues);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://backend-data-theta.vercel.app/data`);
        setData(res.data);
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Filter
        </button>
      </div>
      {/* <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applyFilter={applyFilter}
      /> */}
      <div className="h-[70%]">
        <Table data={data} />
      </div>
    </Layout>
  );
}
