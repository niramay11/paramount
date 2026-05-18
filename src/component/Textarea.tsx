import clsx from "clsx";
import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  darkMode?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  name,
  placeholder,
  rows = 6,
  darkMode = false,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={id} className={clsx("mb-1 text-sm font-sora", darkMode ? "text-white" : "text-[#A1A1A1]")}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={clsx("p-2 rounded-2xl pl-4 text-sm border font-sora bg-transparent focus:outline-none", darkMode ? "border-white text-white" : "border-[#A1A1A1] text-[#A1A1A1]")}
        {...props}
      />
    </div>
  );
};

export default Textarea;
