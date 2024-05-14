import React from "react";
import MyButton from "./MyButton";

export default function PostItem({ post, number, removePostFunc, className }) {
  return (
    <div
      className={
        "transition-colors duration-150 ease-out hover:cursor-pointer flex flex-row justify-between items-center mx-auto p-4 w-full hover:bg-slate-300 border-t-2 border-slate-300 " +
        className
      }
    >
      <div className="w-5/6 h-full">
        <strong>
          {number}. {post.title}
        </strong>
        <p className="text-wrap break-normal whitespace-nowrap overflow-hidden text-ellipsis hover:overflow-visible">
          {post.body}
        </p>
      </div>
      <MyButton
        className="transition-all duration-300 max-w-11 max-h-11 w-11 h-11 hover:bg-red-300 bg-trash-icon bg-no-repeat bg-center bg-[length:50%]"
        onClick={() => removePostFunc(post)}
      ></MyButton>
    </div>
  );
}
