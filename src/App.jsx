import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import PostService from "./components/PostService";

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [postListTitle, setPostListTitle] = useState("About Javascript");

  useEffect(() => {
    const fetchPosts = async () => {
      let recievedPosts = await PostService.GetAll((e) =>
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

  return (
    <>
      <PostList
        className="mt-4"
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
