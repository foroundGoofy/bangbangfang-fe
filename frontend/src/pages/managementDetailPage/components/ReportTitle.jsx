
import React, { useState } from 'react';
function ReportTitle({ date }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800">{date}反馈报告</h1>
    </div>
  );
}

export default ReportTitle;
