import React from "react";

export default function MyInput({ ...props }) {
  return (
    <input
      {...props}
      className={
        "transition-all duration-300 ease-out px-1 bg-slate-100 border-slate-300 border-2 focus:border-slate-400 rounded-lg outline-none shadow-md focus:shadow-slate-400 " +
        props.className
      }
    />
  );
}
