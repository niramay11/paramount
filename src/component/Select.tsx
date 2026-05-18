"use client";
import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  darkMode?: boolean;
};

const CustomSelect: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  className,
  darkMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);



  return (
    <div className="w-full flex flex-col" ref={ref}>
      <label
        htmlFor={id}
        className={clsx(
          "mb-1 text-sm font-sora",
          darkMode ? "text-white" : "text-[#A1A1A1]"
        )}
      >
        {label}
      </label>

      <div
        className={clsx(
          "relative w-full cursor-pointer p-2 pl-4 pr-10 text-sm font-sora rounded-full border",
          darkMode
            ? "border-white text-white bg-transparent"
            : "border-[#A1A1A1] text-[#333] bg-white",
          className
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={clsx(value ? "" : "text-[#A1A1A1]")}>
          {selectedLabel || "Select an option"}
        </span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">
          <ChevronDown />
        </span>

        {isOpen && (
          <div
            className={clsx(
              "absolute z-10 top-10 left-0 mt-2 w-full rounded-xl shadow-lg max-h-60 overflow-auto",
              darkMode ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
            )}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className={clsx(
                  "px-4 py-2 text-sm cursor-pointer font-sora hover:bg-gray-400 hover:text-white transition-colors",
                  value === opt.value && "bg-[#3a1822] text-white"
                )}
                onClick={(e) => {
                  e.stopPropagation(); // prevent bubbling to parent
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
