import React from 'react';

import style from './Button.module.css';

interface Props {
    type: 'button' | 'submit' | 'reset';
    textName: string;
    click: () => void;
    disabled?: boolean;
}

export const Button = ({type, textName, click, disabled}: Props) => {
    return <button
        type={type}
        className={style.btn}
        onClick={click}
        disabled={disabled}
    >{textName}
    </button>;
};