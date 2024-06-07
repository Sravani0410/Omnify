import React, { useState } from 'react';

const FilterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl mb-4">Filter</h2>
        <div className="flex space-x-4">
          <div className="w-1/3">
            <h3>Scheduled Date</h3>
            {/* Implement the dropdown and filter logic here */}
          </div>
          <div className="w-1/3">
            <h3>People</h3>
            {/* Implement the search logic here */}
          </div>
          <div className="w-1/3">
            <h3>Services/Products</h3>
            {/* Implement the search by name/tags logic here */}
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
