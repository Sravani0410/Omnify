import React from 'react';

const SummaryBoxes = ({ data }) => {
  return (
    <div className="h-[3%] grid gap-2 grid-cols-3 p-4">
      <div className="p-4 bg-white rounded-lg shadow">All Waitlists </div>
      <div className="p-4 bg-white rounded-lg shadow">Newly Added </div>
      <div className="p-4 bg-white rounded-lg shadow">Leads </div>
    </div>
  );
};

export default SummaryBoxes;
