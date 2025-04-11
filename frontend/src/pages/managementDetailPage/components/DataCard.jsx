
import React, { useState } from 'react';
function DataCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default DataCard;
