import React from 'react';

import style from './Input.module.css';

interface Props {
    name: string;
    textName: string;
    type: string;
    value: string;
    change: (name: string, value: string) => void;
    blur?: () => void;
}

export const Input = ({name, textName, type, value, change, blur}: Props) => {

    return (
        <label
            htmlFor={name}
            className={style.label}
        >{textName}
            <input
                id={name}
                type={type}
                className={style.input}
                value={value}
                onChange={e => change(name, e.target.value)}
                onBlur={blur}
            >
            </input>
        </label>
    );
};