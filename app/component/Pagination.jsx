// Pagination.js
import React from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between items-center mt-4">
      <div>Displaying {itemsPerPage} out of {totalItems}</div>
      <div className="flex justify-end items-center mt-2">
        <button
          className={`p-2 ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft className="mt-2" size={30} />
          {/* <p className='p-1'>Previous</p>  */}
        </button>
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => setCurrentPage(number)}
                className={`p-2 ${
                  currentPage === number
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`p-2 ${
            currentPage === pageNumbers.length
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
          }
          disabled={currentPage === pageNumbers.length}
        >
          <MdKeyboardArrowRight className="mt-2" size={30} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
