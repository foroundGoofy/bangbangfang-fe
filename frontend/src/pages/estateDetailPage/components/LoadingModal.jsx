import React, { useEffect, useState, useRef } from "react";

const LoadingModal = () => {
  const [status, setStatus] = useState(0);
  const statusRef = useRef(0)
  useEffect(() => {
    let tm = setInterval(() => {
      statusRef.current = Math.min(statusRef.current + 3, 99)
      setStatus(statusRef.current)
    }, 200)
    return () => {
      clearInterval(tm)
    }
  }, [])
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">正在生成中请稍等</h2>
          {/* 这里使用一个简单的进度条示例，你可以根据需要替换为更复杂的进度条组件 */}
          <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: status+"%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;