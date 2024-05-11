import React, { useState } from "react";
import PostItem from "./PostItem";
import MySelect from "./MySelect";
import MyCheckbox from "./MyCheckbox";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import MyModal from "./MyModal/MyModal";

export default function PostList({
  posts,
  currentPosts,
  title,
  removePostFunc,
  setPostsFunc,
  setCurrentPostsFunc,
  checkListEmptyFunc,
}) {
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({ title: "", body: "" });

  let isDescending = false;

  function AddPost() {
    setPostsFunc([
      ...posts,
      { id: Date.now(), title: post.title, body: post.body },
    ]);

    setPost({ title: "", body: "" });
  }

  function OnDescendingChanged(value) {
    isDescending = value;

    if (selectedSort != "") {
      SortPosts(selectedSort, value);
      OnSearchBarChanged(searchQuery);
    }
  }

  function OnSelectChanged(value) {
    setSelectedSort(value);
    SortPosts(value);

    OnSearchBarChanged(searchQuery);
  }

  function OnSearchBarChanged(value) {
    setSearchQuery(value);

    let filtered = posts.filter((post) =>
      post[selectedSort ? selectedSort : "title"]
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setCurrentPostsFunc(filtered);
    checkListEmptyFunc(filtered);
  }

  function SortPosts(sort) {
    if (!isDescending)
      setPostsFunc([...posts].sort((a, b) => b[sort].localeCompare(a[sort])));
    else
      setPostsFunc([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
  }

  return (
    <div className="py-3 px-2 mx-auto w-4/5 bg-slate-200 border-4 rounded-lg border-slate-400 shadow-lg shadow-slate-300">
      <div className="grid grid-cols-3 mb-3">
        <div className="flex flex-row">
          <MySelect
            options={[
              { value: "title", name: "by title" },
              { value: "body", name: "by description" },
            ]}
            defaultValue="Sort by"
            value={selectedSort}
            onChange={OnSelectChanged}
          />
          <MyCheckbox
            className="ml-4 h-8 w-8 bg-descending-icon bg-no-repeat bg-center bg-[length:80%]"
            setState={OnDescendingChanged}
          />
        </div>
        <h1 className="text-center text-2xl font-bold">{title}</h1>
        <div className="flex flex-row justify-end align-middle w-full">
          <MyInput
            className="pl-8 w-5/6 bg-search-bar-icon bg-no-repeat bg-[0.3rem] bg-[length:7%] border-slate-300"
            value={searchQuery}
            onChange={(e) => OnSearchBarChanged(e.target.value)}
          />
        </div>
      </div>
      {currentPosts.map((post, index) => {
        if (index === currentPosts.length - 1)
          return (
            <PostItem
              className="border-b-2"
              removePostFunc={removePostFunc}
              number={index + 1}
              post={post}
              key={post.id}
            />
          );

        return (
          <PostItem
            removePostFunc={removePostFunc}
            number={index + 1}
            post={post}
            key={post.id}
          />
        );
      })}
      <MyButton
        className="transition-all duration-300 p-2 mt-3 w-max bg-yellow-300"
        onClick={() => setModalVisible(true)}
      >
        Create New
      </MyButton>
      <MyModal visible={modalVisible} setVisible={setModalVisible}>
        <div className="flex flex-col items-center mx-auto w-4/5">
          <MyInput
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            placeholder="Input post title..."
          />
          <MyInput
            className="mt-2"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            type="text"
            placeholder="Input post description..."
          />
          <MyButton
            className="mt-5 bg-green-100 border-green-500"
            onClick={() => {
              AddPost();
              setModalVisible(false);
            }}
          >
            Add Post
          </MyButton>
        </div>
      </MyModal>
    </div>
  );
}
