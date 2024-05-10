import React from 'react'

export default function MyInput({ children, ...props }) {
    return (
        <input {...props} className={'pl-1 border-2 rounded-lg ' + props.className} />
    )
}
