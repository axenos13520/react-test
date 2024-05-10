import { useState } from 'react'
import PostList from './components/PostList'
import MyInput from './components/MyInput'
import MyButton from './components/MyButton';

function App() {
  const [posts, setPosts] = useState(JSON.parse(window.localStorage.getItem("posts")));
  const [post, setPost] = useState({ title: '', body: '' });

  function MySetPosts(newPosts) {
    setPosts(newPosts);
    window.localStorage.setItem("posts", JSON.stringify(newPosts));
  }

  function AddPost() {
    MySetPosts([...posts, { id: Date.now(), title: post.title, body: post.body }]);

    setPost({ title: '', body: '' });
  }

  function RemovePost(post) {
    MySetPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <>
      <div className='flex flex-col my-5 mx-auto w-4/5'>
        <MyInput
          value={post.title}
          onChange={e => setPost({ ...post, title: e.target.value })}
          type='text'
          placeholder='Input post title...'
        />
        <MyInput
          className='mt-2'
          value={post.body}
          onChange={e => setPost({ ...post, body: e.target.value })}
          type='text'
          placeholder='Input post description...'
        />
        <MyButton className='mt-5 bg-green-100 border-green-500' onClick={AddPost}>Add Post</MyButton>
      </div>
      <PostList posts={posts} title='About Javascript' removePostFunc={RemovePost} setPostsFunc={MySetPosts} />
    </>
  )
}

export default App
