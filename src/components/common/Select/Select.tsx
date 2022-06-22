import React from 'react';

import style from './Select.module.css';

interface Name {
    name: string;
}

interface Props {
    name: string;
    textName: string;
    value: string;
    change: (name: string, value: string) => void;
    options: Name[];
    disabled?: boolean;
}

export const Select = ({name, textName, value, change, options, disabled}: Props) => {

    return (
        <label
            htmlFor={name}
            className={style.label}
        >{textName}
            <select
                id={name}
                className={style.select}
                value={value}
                onChange={e => change(name, e.target.value)}
                disabled={disabled}
            >
                <option value="select">Wybierz</option>
                {options.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
            </select>
        </label>
    );
};