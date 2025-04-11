import React from 'react';

function FeedbackReportDetail({ report, onBack }) {
  if (!report) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{report.date}反馈报告详情</h1>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-300"
        >
          返回列表
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">成交总量</h3>
          <p className="text-3xl font-bold text-blue-600">{report.totalTransactions}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">平均评分</h3>
          <p className="text-3xl font-bold text-green-600">{report.averageRating}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">客户满意度</h3>
          <p className="text-3xl font-bold text-purple-600">{report.details.customerSatisfaction}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">平均响应时间</h3>
          <p className="text-xl">{report.details.responseTime}</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">完成率</h3>
          <p className="text-xl">{report.details.completionRate}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">用户评价</h3>
        <div className="space-y-4">
          {report.details.comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">{comment.user}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{comment.rating}</span>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedbackReportDetail;
