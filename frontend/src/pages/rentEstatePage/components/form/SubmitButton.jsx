
import React from "react";

const SubmitButton = () => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        提交房屋信息
      </button>
    </div>
  );
};

export default SubmitButton;
