import React, { useState, useEffect } from "react";
import PostService from "./PostService";
import PostItem from "./PostItem";
import MySelect from "./MySelect";
import MyCheckbox from "./MyCheckbox";
import MyInput from "./MyInput";
import MyButton from "./MyButton";
import MyModal from "./MyModal/MyModal";
import PaginationButtons from "./pagination/PaginationButtons";

export default function PostList({ className }) {
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [postListTitle, setPostListTitle] = useState("About Javascript");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({ title: "", body: "" });
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);

  let isDescending = false;

  useEffect(() => {
    const fetchPosts = async () => {
      let recievedPosts = await PostService.GetAll(setLoadingStatus, (e) =>
        console.log("ERROR! " + e.message)
      );

      MySetPosts(recievedPosts);
    };

    fetchPosts();
  }, []);

  function MySetPosts(newPosts) {
    setPosts(newPosts);
    setCurrentPosts(newPosts);

    CheckListEmpty(newPosts);
  }

  function CheckListEmpty(list) {
    if (list.length == 0 && postListTitle !== "Empty List")
      setPostListTitle("Empty List");
    else if (list.length > 0 && postListTitle === "Empty List")
      setPostListTitle("About Javascript");
  }

  function RemovePost(post) {
    MySetPosts(posts.filter((p) => p.id !== post.id));
  }

  function AddPost() {
    MySetPosts([
      ...posts,
      { id: Date.now(), title: post.title, body: post.body },
    ]);

    setPost({ title: "", body: "" });
  }

  function OnDescendingChanged(value) {
    isDescending = value;

    if (selectedSort != "") {
      SortPosts(selectedSort);
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

    setCurrentPosts(filtered);
    CheckListEmpty(filtered);
  }

  function SortPosts(sort) {
    if (isDescending)
      MySetPosts([...posts].sort((a, b) => b[sort].localeCompare(a[sort])));
    else MySetPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
  }

  return (
    <div
      className={
        "py-3 px-2 mx-auto w-4/5 bg-slate-200 border-4 rounded-lg border-slate-400 shadow-lg shadow-slate-300 " +
        className
      }
    >
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
        {loadingStatus ? (
          <div className="flex flex-row items-center justify-center">
            <h1 className="text-2xl font-bold">{"Loading..."}</h1>
            <div className="ml-4 border-gray-300 h-7 w-7 animate-spin rounded-full border-4 border-t-blue-600"></div>
          </div>
        ) : (
          <h1 className="text-center text-2xl font-bold">{postListTitle}</h1>
        )}
        <div className="flex flex-row justify-end align-middle w-full">
          <MyInput
            className="pl-8 w-5/6 bg-search-bar-icon bg-no-repeat bg-[0.3rem] bg-[length:6%] border-slate-300"
            value={searchQuery}
            onChange={(e) => OnSearchBarChanged(e.target.value)}
          />
        </div>
      </div>
      {currentPosts.map((post, index) => {
        if (index >= pageLimit * page || index < pageLimit * (page - 1)) return;

        if (index - (page - 1) * pageLimit === pageLimit - 1)
          return (
            <PostItem
              className="border-b-2 max-h-24 h-24 whitespace-nowrap overflow-hidden text-ellipsis"
              removePostFunc={RemovePost}
              number={index + 1}
              post={post}
              key={post.id}
            />
          );

        return (
          <PostItem
            className="max-h-24 h-24 whitespace-nowrap overflow-hidden text-ellipsis"
            removePostFunc={RemovePost}
            number={index + 1}
            post={post}
            key={post.id}
          />
        );
      })}
      <div className="grid auto-cols-max grid-flow-col justify-between mt-4 w-full">
        <MyButton
          className="transition-all duration-300 p-2 ml-3 w-max bg-yellow-300 font-semibold"
          onClick={() => setModalVisible(true)}
        >
          Create New
        </MyButton>
        <PaginationButtons
          page={page}
          setPage={setPage}
          pageLimit={pageLimit}
          elementCount={currentPosts.length}
          buttonsCount={9}
        />
        <h1 className="min-w-24 mt-auto mr-4 text-right font-medium text-slate-400">
          {currentPosts.length > 0
            ? `${(page - 1) * pageLimit + 1}..${
                (page - 1) * pageLimit + pageLimit <= currentPosts.length
                  ? (page - 1) * pageLimit + pageLimit
                  : currentPosts.length
              }/${currentPosts.length}`
            : "0/0"}
        </h1>
      </div>
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
