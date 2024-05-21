import React, { useState, useEffect } from "react";

export default function PaginationButtons({
  page,
  setPage,
  pageLimit,
  elementCount,
  buttonsCount,
}) {
  const [buttons, setButtons] = useState([]);

  const defaultClassNames =
    "transition-all duration-200 mx-1 min-w-8 min-h-8 w-8 h-8 ease-out bg-slate-100 border-2 border-slate-300 rounded-lg shadow-md hover:font-bold text-slate-600";

  useEffect(() => {
    let newButtons = [
      <button
        key={-1}
        className={`${defaultClassNames.replace(
          "mx-1",
          ""
        )} active:shadow-inner hover:animate-pagination_left_hover`}
        onClick={() => {
          setPage(1);
        }}
      >
        <div className="flex flex-row justify-center items-center w-full opacity-70">
          <img
            className="rotate-180 w-3"
            src="/src/images/pagination-arrow.svg"
            alt="<"
          />
          <img
            className="rotate-180 ml-[-3px] w-3"
            src="/src/images/pagination-arrow.svg"
            alt="<"
          />
        </div>
      </button>,
      <button
        key={-2}
        className={`${defaultClassNames} active:shadow-inner hover:animate-pagination_left_hover mr-auto`}
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
      >
        <div className="flex flex-row justify-center items-center w-full opacity-70">
          <img
            className="rotate-180 w-3"
            src="/src/images/pagination-arrow.svg"
            alt="<"
          />
        </div>
      </button>,
    ];

    const pagesCount = Math.ceil(elementCount / pageLimit);
    let firstPage = buttonsCount * Math.floor((page - 1) / buttonsCount) + 1;

    if (firstPage === 0) firstPage = 1;
    if (page > pagesCount && pagesCount > 0) setPage(pagesCount);

    for (let i = firstPage; i < firstPage + buttonsCount; ++i)
      if (i <= pagesCount)
        newButtons.push(
          <button
            key={i}
            className={
              i === page
                ? `${defaultClassNames} bg-slate-300 font-bold`
                : defaultClassNames
            }
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        );

    newButtons.push(
      <button
        key={-3}
        className={`${defaultClassNames} active:shadow-inner hover:animate-pagination_right_hover ml-auto`}
        onClick={() => {
          if (page < pagesCount) setPage(page + 1);
        }}
      >
        <div className="flex flex-row justify-center items-center w-full opacity-70">
          <img className="w-3" src="/src/images/pagination-arrow.svg" alt=">" />
        </div>
      </button>
    );

    newButtons.push(
      <button
        key={-4}
        className={`${defaultClassNames.replace(
          "mx-1",
          ""
        )} active:shadow-inner hover:animate-pagination_right_hover`}
        onClick={() => {
          if (pagesCount > 0) setPage(pagesCount);
        }}
      >
        <div className="flex flex-row justify-center items-center w-full opacity-70">
          <img className="w-3" src="/src/images/pagination-arrow.svg" alt=">" />
          <img
            className="ml-[-3px] w-3"
            src="/src/images/pagination-arrow.svg"
            alt="<"
          />
        </div>
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
