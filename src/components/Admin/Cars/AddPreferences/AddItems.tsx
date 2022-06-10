import React, {useState} from "react";
import {SimpleCarEdit} from "types";

import {config} from "../../../../config/config";

import style from "./AddPreferences.module.css";


interface Props {
    title: string;
    name: string;
    carMarks?: SimpleCarEdit[] | undefined;
}

export const AddItems = ({title, name, carMarks}: Props) => {

    const [markValue, setMarkValue] = useState<string>('');
    const [carValue, setCarValue] = useState('');

    const handleAddCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch(`${config.URL}cars/edit/${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: carValue, mark: markValue}),
        });
        setCarValue('');
        setMarkValue('');
    }

    const markName = name === 'model'
        ? <select
            className={style.select}
            value={markValue}
            onChange={(e) => setMarkValue(e.target.value)}
        >
            <option value='select'>Wybierz markę</option>
            {carMarks?.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
        </select>
        : null;

    return (
        <form className={style.formBox} onSubmit={handleAddCar}>
            <h3 className={style.name}>{title}</h3>
            {markName}
            <div className={style.dataBox}>
                <input
                    type="text"
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                    className={style.input}/>
                <button type='submit' className='btnPrimarySmall'>Dodaj</button>
            </div>
        </form>
    );
};