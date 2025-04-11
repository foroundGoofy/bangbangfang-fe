
import React,{ useEffect, useState } from 'react';

function SearchModal({ progress, currentStep, extractedTags }) {
  const [animatedTags, setAnimatedTags] = useState([]);
  
  // Set up tag animation
  useEffect(() => {
    const tagObjects = extractedTags.map((tag, index) => ({
      id: index,
      text: tag,
      top: Math.random() * 60 + 20, // Random position between 20% and 80%
      left: Math.random() * 60 + 20,
      direction: Math.random() > 0.5 ? 1 : -1, // Random direction
      speed: Math.random() * 0.3 + 0.1 // Random speed
    }));
    
    setAnimatedTags(tagObjects);
    
    const interval = setInterval(() => {
      setAnimatedTags(prevTags => 
        prevTags.map(tag => ({
          ...tag,
          top: tag.top + tag.speed * tag.direction,
          direction: (tag.top <= 20 || tag.top >= 80) ? -tag.direction : tag.direction
        }))
      );
    }, 100);
    
    return () => clearInterval(interval);
  }, [extractedTags]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <h2 className="text-xl font-semibold mb-4 text-center">正在为您匹配房源</h2>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Current step */}
        <div className="text-center font-medium text-blue-600 mb-4">
          {currentStep}
        </div>
        
        {/* Animated tags */}
        <div className="relative h-40 mb-6 border border-gray-100 rounded-lg bg-gray-50 overflow-hidden">
          {animatedTags.map(tag => (
            <div 
              key={tag.id}
              className="absolute bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium"
              style={{ 
                top: `${tag.top}%`, 
                left: `${tag.left}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'top 0.5s ease-in-out'
              }}
            >
              {tag.text}
            </div>
          ))}
        </div>
        
        {/* Message */}
        <div className="text-center text-gray-600 mb-2">
          小房子正在努力为您寻找最适合的房源，请稍候...
        </div>
        <div className="text-center text-sm text-gray-500">
          匹配完成后将获得不看房里程分
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
