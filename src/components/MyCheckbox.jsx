import React, { useState } from 'react'

export default function MyCheckbox({ className, setState }) {
    const [bgColor, setBgColor] = useState('bg-slate-100');
    const [checked, setChecked] = useState(true);

    function OnClick() {
        setChecked(!checked);
        setBgColor(checked ? 'bg-slate-300' : 'bg-slate-100');

        setState(checked);
    }

    return (
        <button className={'border-2 border-slate-300 rounded-lg ' + bgColor + ' ' + className} type='button' onClick={OnClick}></button>
    )
}
