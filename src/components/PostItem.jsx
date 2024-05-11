import React from "react";
import MyButton from "./MyButton";

export default function PostItem({ post, number, removePostFunc, className }) {
  return (
    <div
      className={
        "[&:last-child]:hidden flex flex-row justify-between mx-auto p-4 w-full border-t-2 last:border-b-2 border-slate-300 " +
        className
      }
    >
      <div>
        <strong>
          {number}. {post.title}
        </strong>
        <p className="w-3/4 text-wrap break-normal">{post.body}</p>
      </div>
      <MyButton
        className="hover:bg-red-300 transition-all duration-300"
        onClick={() => removePostFunc(post)}
      >
        Delete
      </MyButton>
    </div>
  );
}
