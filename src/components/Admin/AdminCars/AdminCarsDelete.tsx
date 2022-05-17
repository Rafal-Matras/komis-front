import React, {useEffect, useState} from "react";
import {CarEquipments, CarFuels, CarMarks, CarModels, CarTypes} from "types";

import {carEquipments, carFuels, carMarks, carModels, carTypes,} from '../../../data/Data'

import style from "./AdminCars.module.css";

interface Props {
    title: string;
    name: string;
}

export const AdminCarsDelete = ({title, name}: Props) => {

    const [carValue, setCarValue] = useState<string | undefined>(undefined);
    const [carSelect, setCarSelect] = useState<CarMarks[] | CarModels[] | CarEquipments[] | CarFuels[] | CarTypes[] | undefined>(undefined);
    const [markValue, setMarkValue] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (name === 'carMark') {
            setCarSelect(carMarks);
        } else if (name === 'carModel') {
            setCarSelect(carModels);
        } else if (name === 'carEquipment') {
            setCarSelect(carEquipments);
        } else if (name === 'carFuel') {
            setCarSelect(carFuels);
        } else if (name === 'carType') {
            setCarSelect(carTypes);
        } else {
            setCarSelect(undefined);
        }
    }, [])

    useEffect(() => {
        const mark = carMarks.find(mark => mark.name === markValue);
        const models = carModels.filter(model => model.markId === mark?.id);
        setCarSelect(models);
    }, [markValue])

    if (!carSelect) {
        return null
    }

    const handleCarSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMarkValue(e.target.value);
    }


    const markName = name === 'carModel'
        ? <select
            className={style.select}
            value={markValue}
            onChange={handleCarSelected}
        >
            <option value='select'>Wybierz markę</option>
            {carMarks.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
        </select>
        : null;

    return (
        <form className={style.formBox}>
            <h3 className={style.name}>{title}</h3>
            {markName}
            <div className={style.dataBox}>
                <select
                    className={style.inputSelect}
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                >
                    <option value='select'>Wybierz {title}</option>
                    {carSelect.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
                </select>
                <button type='submit' className={style.btn}>Usuń</button>
            </div>
        </form>
    )
}