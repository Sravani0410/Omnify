import { useState } from 'react';

const EditColumnModal = ({ selectedColumns, setSelectedColumns, onClose }) => {
 
  const handleColumnChange = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  return (
    <div className="modal">
      <h3>Edit Columns</h3>
      <div className="checkboxes">
        {['created_on', 'payer', 'status', 'email', 'payer_phone', 'services', 'scheduled'].map((column) => (
          <label key={column}>
            <input
              type="checkbox"
              checked={selectedColumns.includes(column)}
              onChange={() => handleColumnChange(column)}
            />
            {column.replace('_', ' ')}
          </label>
        ))}
      </div>
      <button onClick={onClose}>Apply</button>
    </div>
  );
};

export default EditColumnModal;
