import React from "react";

export default function MyButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={
        "transition-all duration-300 ease-out p-1 w-20 border-2 rounded-lg border-slate-400 bg-slate-200 shadow-md shadow-slate-400 hover:shadow-transparent active:shadow-inner active:shadow-gray-700 " +
        props.className
      }
      type="button"
    >
      {children}
    </button>
  );
}
