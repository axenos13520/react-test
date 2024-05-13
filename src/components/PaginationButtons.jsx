import React, { useState, useEffect } from "react";
import MyButton from "./MyButton";

export default function PaginationButtons({
  page,
  setPage,
  pageLimit,
  elementCount,
}) {
  const [buttons, setButtons] = useState([]);

  function SetActivePage(pageNumber) {
    setPage(pageNumber);
  }

  useEffect(() => {
    let newButtons = [];

    for (let i = 0; i < Math.ceil(elementCount / pageLimit); ++i)
      newButtons.push(
        <button
          key={i}
          className={
            i + 1 === page
              ? "w-8 h-8 transition-all duration-200 ease-out bg-slate-300 border-2 border-slate-300 rounded-lg shadow-md"
              : "w-8 h-8 transition-all duration-200 ease-out bg-slate-100 border-2 border-slate-300 rounded-lg shadow-md"
          }
          onClick={() => SetActivePage(i + 1)}
        >
          {i + 1}
        </button>
      );

    setButtons(newButtons);
  }, [page, pageLimit, elementCount]);
  return (
    <div className="flex flex-row items-center justify-between w-full">
      {buttons}
    </div>
  );
}
