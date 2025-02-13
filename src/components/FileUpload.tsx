import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { uploadBankStatement } from "../api/mockApi";

interface FileUploadProps {
  onUploadSuccess: () => void;
  onUploadError: (error: string) => void;
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    await handleFileUpload(file);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      await uploadBankStatement(file);
      onUploadSuccess();
    } catch (error) {
      onUploadError(
        error instanceof Error ? error.message : "Failed to upload file"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 mx-auto bg-white border rounded-xl dark:bg-gray-900 dark:border-gray-700">
      {/* Info Section */}
      <div className="w-full md:w-1/3 p-6 flex flex-col justify-center h-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Important Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Please upload your bank statement in CSV format. Ensure the file is
          formatted correctly to avoid processing errors.
        </p>
      </div>

      {/* Upload Section */}
      <div className="w-full md:w-2/3 border-2 border-dashed rounded-lg p-6 text-center transition-all border-gray-300 dark:border-gray-600 dark:bg-gray-800 flex flex-col justify-center h-full">
        <input type="file" accept=".csv" className="hidden" />
        <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Upload Bank Statement
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Drag and drop your CSV file here, or{' '}
          <button
            type="button"
            className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300"
          >
            browse
          </button>
        </p>
      </div>
    </div>
    <div className="mt-6 p-6 bg-white dark:bg-gray-900 border rounded-lg flex items-center justify-between w-full">
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-200">
            Need Help with the tool?
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please check out step by step guide
          </p>
        </div>
        <a href="/help" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
          Connect
        </a>
      </div>
    </div>
  );
}
