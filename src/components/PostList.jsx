import React, { useState } from 'react'
import PostItem from './PostItem'
import MySelect from './MySelect'
import MyCheckbox from './MyCheckbox'

export default function PostList({ posts, title, removePostFunc, setPostsFunc }) {
    const [selectedSort, setSelectedSort] = useState('');
    const [isDescending, setIsDescending] = useState(false);

    function OnDescendingChanged(value) {
        setIsDescending(value);

        if (selectedSort != '')
            SortPosts(selectedSort, value);
    }

    function OnSelectChanged(value) {
        setSelectedSort(value);
        SortPosts(SortPosts(value, isDescending));
    }

    function SortPosts(sort, descending) {
        if (descending)
            setPostsFunc([...posts].sort((a, b) => b[sort].localeCompare(a[sort])));
        else
            setPostsFunc([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    return (
        <div className='mx-auto w-4/5'>
            <div className='grid grid-cols-3'>
                <div className='flex flex-row'>
                    <MySelect options={[{ value: 'title', name: 'by title' },
                    { value: 'body', name: 'by description' }]}
                        defaultValue='Sort by'
                        value={selectedSort}
                        onChange={OnSelectChanged}
                    />
                    <MyCheckbox className='ml-4 h-8 w-8 bg-descending-icon bg-no-repeat bg-center bg-[length:80%]'
                        setState={OnDescendingChanged} />
                </div>
                <h1 className='text-center text-2xl font-bold'>{title}</h1>
            </div>
            {posts.map((post, index) => <PostItem removePostFunc={removePostFunc} number={index + 1} post={post} key={post.id} />)}
        </div>
    )
}
