import React from 'react'
import MyButton from './MyButton'

export default function PostItem({ post, number, removePostFunc }) {
    return (
        <div className="flex flex-row justify-between mt-5 mx-auto p-4 w-full border-2 border-green-600 rounded-lg">
            <div>
                <strong>{number}. {post.title}</strong>
                <p className='w-3/4 text-wrap break-normal'>{post.body}</p>
            </div>
            <MyButton onClick={() => removePostFunc(post)}>Delete</MyButton>
        </div>
    )
}
