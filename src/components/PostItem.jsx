import React, { useState } from "react";
import MyButton from "./MyButton";
import MyModal from "./MyModal/MyModal";

export default function PostItem({ post, number, removePostFunc, className }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div
      className={
        "transition-color duration-200 cursor-pointer flex flex-row justify-between items-center mx-auto p-4 w-full border-t-2 border-slate-300 hover:bg-slate-300 " +
        className
      }
    >
      <div className="w-full h-full" onClick={() => setModalVisible(true)}>
        <strong>
          {post.id}. {post.title}
        </strong>
        <p className="text-wrap break-normal whitespace-nowrap overflow-hidden text-ellipsis hover:overflow-visible">
          {post.body}
        </p>
      </div>
      <MyButton
        className="transition-all duration-300 ml-8 max-w-11 max-h-11 w-11 h-11 hover:bg-red-300 bg-trash-icon bg-no-repeat bg-center bg-[length:50%]"
        onClick={() => removePostFunc(post)}
      ></MyButton>
      <MyModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title={"Post " + post.id}
      >
        <div className="w-[50vw]">
          <h3 className="text-2xl font-semibold">{post.title}</h3>
          <p className="text-wrap break-normal whitespace-nowrap overflow-hidden text-ellipsis hover:overflow-visible">
            {post.body}
          </p>
        </div>
      </MyModal>
    </div>
  );
}
