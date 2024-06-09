import { useState } from "react";

const EditColumnModal = ({ selectedColumns, setSelectedColumns, onClose }) => {
  const handleColumnChange = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Edit Columns</h3>
        <div className="space-y-2">
          {[
            "created_on",
            "payer",
            "status",
            "email",
            "payer_phone",
            "services",
            "scheduled",
          ].map((column) => (
            <label key={column} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedColumns.includes(column)}
                onChange={() => handleColumnChange(column)}
                className="form-checkbox h-4 w-4 text-black"
              />
              <span className="text-gray-700">{column.replace("_", " ")}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-slate-100 text-black rounded mr-2"
            onClick={onClose}
          >
            Reset to Default
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditColumnModal;
