import clsx from "clsx";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  darkMode?: boolean;
}

const Input: React.FC<InputProps> = ({ label, id, name, darkMode, ...rest }) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={id} className={clsx("mb-1 text-sm text-[#A1A1A1] font-sora", darkMode && "text-white")}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={clsx("p-2 pl-4 rounded-full text-sm border font-sora bg-transparent focus:outline-none", darkMode ? "border-white text-white" : "border-[#A1A1A1] text-[#A1A1A1]")}
        {...rest}
      />
    </div>
  );
};

export default Input;
