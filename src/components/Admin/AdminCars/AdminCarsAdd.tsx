import React, {useState} from "react";

import {carMarks} from '../../../data/Data'

import style from "./AdminCars.module.css";

interface Props {
    car: string;
    title: string;
    name: string;
    change: (e: string, name: string) => void;
}

export const AdminCarsAdd = ({car, title, name, change}: Props) => {

    const [markValue, setMarkValue] = useState<string | undefined>(undefined);

    const markName = name === 'carModel'
        ? <select
            className={style.select}
            value={markValue}
            onChange={(e) => setMarkValue(e.target.value)}
        >
            <option value='select'>Wybierz markę</option>
            {carMarks.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
        </select>
        : null;

    const handleAddCar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // fetch()                  //todo fetch

    }

    return (
        <form className={style.formBox} onSubmit={handleAddCar}>
            <h3 className={style.name}>{title}</h3>
            {markName}
            <div className={style.dataBox}>
                <input
                    type="text"
                    value={car}
                    onChange={(e) => change(e.target.value, name)}
                    className={style.input}/>
                <button type='submit' className={style.btn}>Dodaj</button>
            </div>
        </form>
    )
}