
import React from "react";

const UnreadMessages = ({ messages, markAsRead }) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold">未读消息</h3>
        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {messages.length}
        </span>
      </div>
      <div className="divide-y divide-gray-100">
        {messages.map((message) => (
          <div key={message.id} className="p-4 bg-blue-50">
            <div className="mb-1 font-medium">{message.type}</div>
            <p className="text-sm text-gray-600 mb-1">{message.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{message.date}</span>
              <button 
                className="text-xs text-white bg-red-500 rounded px-2 py-1"
                onClick={() => markAsRead(message.id)}
              >
                已读
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnreadMessages;
