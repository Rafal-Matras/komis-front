import React from 'react';

import style from './Button.module.css';

interface Props {
    type: 'button' | 'submit' | 'reset';
    textName: string;
    click?: () => void;
    submit?: (e: React.SyntheticEvent) => void;
    disabled?: boolean;
}

export const Button = ({type, textName, click, submit, disabled}: Props) => {
    return type === 'submit'
        ? <button
            type={type}
            className={style.btn}
            onClick={submit}
            disabled={disabled}
        >{textName}
        </button>
        : <button
            type={type}
            className={style.btn}
            onClick={click}
            disabled={disabled}
        >{textName}
        </button>;
};