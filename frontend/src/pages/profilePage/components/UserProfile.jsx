
import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-semibold">
          {user.avatar}
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-500 text-sm">注册时间：{user.registrationDate}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
