import React from 'react';

import style from './Button.module.css';

interface Props {
    type: 'button' | 'submit' | 'reset';
    textName: string;
    click: () => void;
    disabled?: boolean;
}

export const Button = ({type, textName, click}: Props) => {
    return <button
        type={type}
        className={style.btn}
        onClick={click}
    >{textName}
    </button>;
};