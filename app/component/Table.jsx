import React from "react";

const Table = ({ data }) => {
  console.log(data);
  return (
    <table className="min-w-full bg-white shadow-md rounded-md">
      <thead>
        <tr>
          <th className="p-4 border-b">Created On</th>
          <th className="p-4 border-b">Payer</th>
          <th className="p-4 border-b">Status</th>
          <th className="p-4 border-b">Email</th>
          <th className="p-4 border-b">Payer Phone</th>
          <th className="p-4 border-b">Services</th>
          <th className="p-4 border-b">Scheduled</th>
        </tr>
      </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.CreatedOn}</td>
              <td>{row.Payer}</td>
              <td>{row.Status}</td>
              <td>{row.Email}</td>
              <td>{row.PayerPhone}</td>
              <td>{row.Services}</td>
              <td>{row.Scheduled}</td>
            </tr>
          ))}
        </tbody>
    </table>
  );
};

export default Table;
