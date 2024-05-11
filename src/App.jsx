import { useState } from "react";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [postListTitle, setPostListTitle] = useState("About Javascript");

  window.onload = () => {
    MySetPosts(JSON.parse(window.localStorage.getItem("posts")));
  };

  function MySetPosts(newPosts) {
    setPosts(newPosts);
    setCurrentPosts(newPosts);
    window.localStorage.setItem("posts", JSON.stringify(newPosts));

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

  return (
    <>
      <PostList
        posts={posts}
        currentPosts={currentPosts}
        title={postListTitle}
        removePostFunc={RemovePost}
        setPostsFunc={MySetPosts}
        setCurrentPostsFunc={setCurrentPosts}
        checkListEmptyFunc={CheckListEmpty}
      />
    </>
  );
}

export default App;
