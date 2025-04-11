
import React,{ useEffect, useState } from 'react';

function SearchInput({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };
  useEffect(() => {
    const sampleRequirements = "我需要一个杨浦区的房子，最好是朝南的，可以养猫，离地铁站近一点，预算7000左右，最好是电梯房";
    setSearchText(sampleRequirements);
  })

  const handleSmartRecognition = () => {
    // In a real application, this would call an AI service
    // For now, we'll just simulate by adding some sample text
    const sampleRequirements = "我需要一个两室一厅的房子，最好是朝南的，可以养猫，离地铁站近一点，预算7000左右，最好是电梯房";
    setSearchText(sampleRequirements);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <textarea
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="输入对房子的需求，例如：一室一厅、朝南、可以养猫..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />
        <button
          type="button"
          onClick={handleSmartRecognition}
          className="absolute right-3 bottom-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded-md text-sm transition-colors"
        >
          智能识别需求
        </button>
      </div>
      
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors self-end"
      >
        开始找房
      </button>
    </form>
  );
}

export default SearchInput;
