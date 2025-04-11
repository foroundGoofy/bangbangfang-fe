
import React from "react";

const DocumentUpload = ({ documents, onDocumentsChange }) => {
  const handleFileChange = (e) => {
    // In a real app, you would handle file uploads here
    // For this demo, we'll just store the file names
    const files = Array.from(e.target.files);
    onDocumentsChange([...documents, ...files.map(file => file.name)]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">上传房本、身份证件（选填）</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="doc-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>上传文件</span>
              <input
                id="doc-upload"
                name="doc-upload"
                type="file"
                className="sr-only"
                multiple
                accept="application/pdf,image/png,image/jpeg"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">或拖放文件</p>
          </div>
          <p className="text-xs text-gray-500">PDF, JPG, PNG 最大 5MB</p>
          
          {documents.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">已选择 {documents.length} 个文件</p>
              <ul className="mt-1 text-xs text-left text-gray-500">
                {documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
