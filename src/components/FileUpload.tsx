import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { uploadBankStatement } from "../api/mockApi";

interface FileUploadProps {
  onUploadSuccess: () => void;
  onUploadError: (error: string) => void;
}

export function FileUpload({ onUploadSuccess, onUploadError }: FileUploadProps) {
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
      onUploadError(error instanceof Error ? error.message : "Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
        isDragging
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900"
          : "border-gray-300 dark:border-gray-600 dark:bg-gray-800"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".csv"
        className="hidden"
      />
      <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Upload Bank Statement
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Drag and drop your CSV file here, or{" "}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300"
        >
          browse
        </button>
      </p>
      {isUploading && <div className="text-sm text-indigo-500 dark:text-indigo-400">Uploading file...</div>}
    </div>
  );
}
