import React from "react";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={` px-6 py-3 bg-[#2C3E50] text-white  hover:bg-[#16A085] transition-colors duration-300 shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
