import React from "react";

export default function MySelect({ options, defaultValue, value, onChange }) {
  return (
    <select
      className="p-1 rounded-lg max-w-max bg-slate-100 border-2 border-slate-300s"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
