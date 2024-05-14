import React from "react";

export default function WindowPanelButton({ ...props }) {
  return (
    <button
      {...props}
      className={"w-3 h-3 rounded-full " + props.className}
      type="button"
    ></button>
  );
}
