// Pagination.js
import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'}`}
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => setCurrentPage(number)}
              className={`p-2 ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={`p-2 ${currentPage === pageNumbers.length ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600'}`}
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageNumbers.length))}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
