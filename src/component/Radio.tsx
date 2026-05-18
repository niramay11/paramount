"use client";

import React from "react";

type Option = {
  label: string;
  value: string;
};

type RadioProps = {
  name: string;
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const Radio: React.FC<RadioProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`w-full flex gap-2 items-center font-sora ${className}`}>
      {label && (
        <label className="text-sm font-medium text-[#646464]">{label}</label>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              className="custom-radio"
            />
            <span className="ml-2 text-[#646464]">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .custom-radio {
          appearance: none;
          background-color: #d1d5db; /* Tailwind's gray-300 */
          border-radius: 9999px;
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          display: grid;
          place-content: center;
          cursor: pointer;
        }

        .custom-radio::before {
          content: "";
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1rem 1rem white;
        }

        .custom-radio:checked::before {
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

export default Radio;
