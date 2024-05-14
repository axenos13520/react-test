import PostList from "../components/PostList";

function Posts() {
  let a = {
    name: "aboba",
    func() {
      console.log(this.name);
    },
  };

  a.func();

  return (
    <>
      <PostList className="mt-4" />
    </>
  );
}

export default Posts;
