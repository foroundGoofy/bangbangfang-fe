
import React, { useState } from 'react';
function ActionButton() {
  return (
    <button 
      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
      onClick={() => alert('报告已提交！')}
    >
      一键自评级
    </button>
  );
}

export default ActionButton;
