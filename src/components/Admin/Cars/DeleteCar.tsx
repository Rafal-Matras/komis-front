import React, {useContext, useEffect, useState} from "react";
import {CarEdit, SimpleCarEdit} from "types";

import {config} from "../../../config/config";
import {ChangeCarsEditContext} from "../../contexts/changeCarsEditContext";


import style from "./Cars.module.css";

interface Props {
    title: string;
    name: string;
    carMarks?: SimpleCarEdit[] | undefined;
}

export const DeleteCar = ({title, name, carMarks}: Props) => {

    const {setChangeCarItem} = useContext(ChangeCarsEditContext);

    const [markValue, setMarkValue] = useState<string>('select');
    const [carValue, setCarValue] = useState<string>('');
    const [carSelect, setCarSelect] = useState<CarEdit[] | null>(null);

    useEffect(() => {
        (async () => {
            const req = await fetch(`${config.URL}cars/edit/car/?name=${encodeURIComponent(name)}&model=${encodeURIComponent(markValue)}`);
            const data = await req.json();
            setCarSelect(data);
        })();
    }, [markValue, name]);

    const handleDeleteCarItem = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch(`${config.URL}cars/edit/${name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({carValue})
        });
        const data = await res.json();
        setChangeCarItem(data);
        setCarValue('');
        setMarkValue('select');
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
        <form className={style.formBox} onSubmit={handleDeleteCarItem}>
            <h3 className={style.name}>{title}</h3>
            {markName}
            <div className={style.dataBox}>
                <select
                    className={style.inputSelect}
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                >
                    <option value='select'>Wybierz {name === 'mark' ? 'Markę' : title}</option>
                    {carSelect?.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
                </select>
                <button type='submit' className='btnPrimarySmall'>Usuń</button>
            </div>
        </form>
    );
};