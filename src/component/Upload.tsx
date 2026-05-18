"use client";
import React, { useState, useRef } from "react";
import clsx from "clsx";

type FileUploadProps = {
  id: string;
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  darkMode?: boolean;
  onChange?: any;
};

const CustomFileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  label,
  accept = ".pdf,.doc,.docx",
  required = false,
  darkMode = false,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || "");
    onChange?.(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={clsx(
          "block text-sm font-sora mb-2",
          darkMode ? "text-white" : "text-gray-700"
        )}
      >
        {label}
      </label>

      <div
        onClick={triggerFileSelect}
        className={clsx(
          "cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-full border transition-colors",
          darkMode
            ? "bg-transparent border-white text-white hover:bg-white hover:text-black"
            : "bg-white border-[#A1A1A1] text-[#333] hover:bg-gray-100",
          "text-sm font-sora"
        )}
      >
        <span>{fileName || "Upload Resume/CV"}</span>
        <span className="text-blue-600 font-semibold">Browse</span>
      </div>

      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        required={required}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <p className={clsx("mt-1 text-xs", darkMode ? "text-gray-400" : "text-gray-500")}>
        PDF, DOC, or DOCX (Max. 5MB)
      </p>
    </div>
  );
};

export default CustomFileUpload;
