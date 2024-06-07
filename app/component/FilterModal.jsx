import { useState } from 'react';

export default function FilterModal({ isOpen, onClose, applyFilter }) {
  const [activeTab, setActiveTab] = useState('Date');
  const [filters, setFilters] = useState({
    dateRange: '',
    fromDate: '',
    toDate: '',
    searchTerm: '',
    serviceSearchType: 'name',
    serviceSearchValue: ''
  });

  const handleApply = () => {
    applyFilter(filters);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/2">
        <h2 className="text-2xl font-bold mb-4">Filter</h2>
        <div className="flex mb-4">
          <button onClick={() => setActiveTab('Date')} className={`mr-4 ${activeTab === 'Date' ? 'font-bold' : ''}`}>Date</button>
          <button onClick={() => setActiveTab('People')} className={`mr-4 ${activeTab === 'People' ? 'font-bold' : ''}`}>People</button>
          <button onClick={() => setActiveTab('Service')} className={`mr-4 ${activeTab === 'Service' ? 'font-bold' : ''}`}>Service</button>
        </div>
        {activeTab === 'Date' && (
          <div>
            <h3 className="text-lg font-semibold">Show Orders For</h3>
            <select name="dateRange" className="border p-2 rounded-md w-full mt-2" onChange={handleInputChange}>
              <option value="">All</option>
              <option value="30days">Last 30 days</option>
              <option value="thisMonth">This month</option>
              <option value="lastMonth">Last month</option>
              <option value="thisQuarter">This quarter</option>
              <option value="lastQuarter">Last quarter</option>
              <option value="thisYear">This year</option>
              <option value="lastYear">Last year</option>
            </select>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Or Select Date Range</h3>
              <div className="flex space-x-2 mt-2">
                <input
                  type="date"
                  name="fromDate"
                  className="border p-2 rounded-md w-full"
                  onChange={handleInputChange}
                />
                <input
                  type="date"
                  name="toDate"
                  className="border p-2 rounded-md w-full"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex mt-4">
              <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-200 rounded-md">Reset to Default</button>
              <button onClick={handleApply} className="px-4 py-2 bg-blue-500 text-white rounded-md">Apply</button>
            </div>
          </div>
        )}
        {activeTab === 'People' && (
          <div>
            <h3 className="text-lg font-semibold">Search Payer or Attendee</h3>
            <input
              type="text"
              name="searchTerm"
              className="border p-2 rounded-md w-full mt-2"
              placeholder="Search by Name..."
              onChange={handleInputChange}
            />
            <div className="flex mt-4">
              <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-200 rounded-md">Reset to Default</button>
              <button onClick={handleApply} className="px-4 py-2 bg-blue-500 text-white rounded-md">Apply</button>
            </div>
          </div>
        )}
        {activeTab === 'Service' && (
          <div>
            <h3 className="text-lg font-semibold">Search Service</h3>
            <div className="flex items-center mb-2">
              <label className="mr-2">
                <input
                  type="radio"
                  name="serviceSearchType"
                  value="name"
                  checked={filters.serviceSearchType === 'name'}
                  onChange={handleInputChange}
                /> Name
              </label>
              <label>
                <input
                  type="radio"
                  name="serviceSearchType"
                  value="tags"
                  checked={filters.serviceSearchType === 'tags'}
                  onChange={handleInputChange}
                /> Tags
              </label>
            </div>
            <input
              type="text"
              name="serviceSearchValue"
              className="border p-2 rounded-md w-full mt-2"
              placeholder={`Search Service ${filters.serviceSearchType === 'name' ? 'Name' : 'Tags'}...`}
              onChange={handleInputChange}
            />
            <div className="flex mt-4">
              <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-200 rounded-md">Reset to Default</button>
              <button onClick={handleApply} className="px-4 py-2 bg-blue-500 text-white rounded-md">Apply</button>
            </div>
          </div>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Close</button>
      </div>
    </div>
  );
}
