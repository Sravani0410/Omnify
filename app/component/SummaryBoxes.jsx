import React from 'react';

const SummaryBoxes = ({ data }) => {
  return (
    <div className="flex space-x-4">
      <div className="p-4 bg-blue-500 text-white rounded">All Waitlists {data.all}</div>
      <div className="p-4 bg-green-500 text-white rounded">Newly Added {data.newlyAdded}</div>
      <div className="p-4 bg-yellow-500 text-white rounded">Leads {data.leads}</div>
    </div>
  );
};

export default SummaryBoxes;
