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
    <div className="mt-auto flex-none w-full flex justify-between space-y-2 sm:space-y-0">
      <div className="text-center sm:text-left">Displaying {itemsPerPage} out of {totalItems}</div>
      <div className="flex justify-center items-center space-x-2">
        <button
          className={`p-2 ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft  size={30} />
          {/* <p className='p-1'>Previous</p>  */}
        </button>
        <ul className="flex space-x-1 sm:space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => setCurrentPage(number)}
                className={`p-2 ${
                  currentPage === number
                    ? "bg-black text-white"
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
              : "text-black"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
          }
          disabled={currentPage === pageNumbers.length}
        >
          <MdKeyboardArrowRight  size={30} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
