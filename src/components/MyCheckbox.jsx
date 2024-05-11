import React, { useState } from "react";

export default function MyCheckbox({ className, setState }) {
  const [bgColor, setBgColor] = useState("bg-slate-100");
  const [checked, setChecked] = useState(false);

  function OnClick() {
    setState(!checked);
    setBgColor(checked ? "bg-slate-100" : "bg-slate-300");

    setChecked(!checked);
  }

  return (
    <button
      className={
        "transition-all duration-200 ease-out border-2 rounded-lg shadow-md " +
        bgColor +
        " " +
        className
      }
      type="button"
      onClick={OnClick}
    ></button>
  );
}
