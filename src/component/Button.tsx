import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children = "Submit Now",
  className = "",
  ...props
}) => {
  return (
    <button
      type="submit"
      className={`button-bg cursor-pointer border-[0.5px] flex items-center justify-center gap-1 border-white text-white text-sm font-sora px-10 py-3 rounded-full font-semibold mt-2 transition-colors duration-200 hover:from-[#20608a] hover:to-[#a14a62] hover:border-[#f3f3f3] hover:text-[#ffe6e6] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
