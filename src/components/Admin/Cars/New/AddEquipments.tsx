import React, {SetStateAction, useEffect, useState} from "react";
import {Car} from "types";

import {Spinner} from "../../../common/Spinner/Spinner";
import {config} from "../../../../config/config";

import style from "./New.module.css";

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    setValuePreferences: React.Dispatch<SetStateAction<Car>>;
}

interface Equipments {
    name: string;
}

export const AddEquipments = ({closePopup, setValuePreferences}: Props) => {

    const [equipments, setEquipments] = useState<Equipments[] | null>(null);
    const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${config.URL}cars/edit/car/?name=equipment`);
            const data = await response.json();
            setEquipments(data);
        })();
    }, []);

    const handleCheckEquipment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (selectedEquipments.includes(value)) {
            const newSelectedEquipments = selectedEquipments.filter(el => el !== value);
            setSelectedEquipments(newSelectedEquipments);
        } else {
            setSelectedEquipments(prevSelectedEquipments => [...prevSelectedEquipments, value])
        }
    }

    const equpment = equipments?.map(el => (
        <div className={style.checkBox} key={el.name}>
            <label className={style.labelCheckBox}>{el.name}
                <input
                    className={style.inputCheckBox}
                    type='checkbox'
                    name={el.name}
                    value={el.name}
                    onChange={handleCheckEquipment}
                />
                <span className={style.markCheckBox}> </span>
            </label>
        </div>
    ));

    const handleAddEquipment = () => {
        const data = selectedEquipments.join(';')
        console.log(data)
        setValuePreferences(valuePreferences => ({
            ...valuePreferences,
            equipment: data
        }))
        closePopup(false)
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.equipmentBox}>
                        {
                            equipments === null
                                ? <Spinner/>
                                : equpment
                        }
                    </div>
                    <div className={style.btnBox}>
                        <button
                            type='reset'
                            className='btnPrimarySmall'
                            onClick={handleAddEquipment}
                        >dodaj
                        </button>
                        <button
                            type='reset'
                            className='btnPrimarySmall'
                            onClick={() => closePopup(false)}
                        >anuluj
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
