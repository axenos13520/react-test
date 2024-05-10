import React from 'react'

export default function MyButton({ children, ...props }) {
    return (
        <button {...props} className={'p-1 w-20 border-2 rounded-lg border-slate-400 bg-slate-200 ' + props.className} type='button'>{children}</button>
    )
}
