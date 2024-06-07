"use client"
import { useState } from 'react';
import Layout from './component/Layout';
import FilterModal from './component/FilterModal';

const initialData = [
  { createdOn: '2023-05-01', payer: 'John Doe', status: 'Pending', email: 'john@example.com', phone: '123-456-7890', services: 'Service A', scheduled: '2023-06-01' },
  { createdOn: '2023-05-02', payer: 'Jane Smith', status: 'Confirmed', email: 'jane@example.com', phone: '987-654-3210', services: 'Service B', scheduled: '2023-06-02' },
];

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
  const [data, setData] = useState(initialData);

  const applyFilter = (filterValues) => {
    const filteredData = filterData(initialData, filterValues);
    setData(filteredData);
    setFilters(filterValues);
  };

  return (
    <Layout>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Waitlist</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md">Filter</button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Created On</th>
            <th className="py-2">Payer</th>
            <th className="py-2">Status</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Services</th>
            <th className="py-2">Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{row.createdOn}</td>
              <td className="py-2">{row.payer}</td>
              <td className="py-2">{row.status}</td>
              <td className="py-2">{row.email}</td>
              <td className="py-2">{row.phone}</td>
              <td className="py-2">{row.services}</td>
              <td className="py-2">{row.scheduled}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applyFilter={applyFilter}
      />
    </Layout>
  );
}
