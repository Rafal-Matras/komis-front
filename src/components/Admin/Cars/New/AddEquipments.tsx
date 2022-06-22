import React, {SetStateAction, useEffect, useState} from 'react';
import {Car, SearchCar} from 'types';

import {Spinner} from '../../../common/Spinner/Spinner';
import {config} from '../../../../config/config';

import style from './New.module.css';
import {Button} from '../../../common/Button/Button';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    carEquipment?: React.Dispatch<SetStateAction<Car>>;
    searchCarEquipment?: React.Dispatch<SetStateAction<SearchCar>>;
}

interface Equipments {
    name: string;
}

export const AddEquipments = ({closePopup, carEquipment, searchCarEquipment}: Props) => {

    const [equipments, setEquipments] = useState<Equipments[] | null>(null);
    const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${config.URL}cars/edit/car/equipment`);
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

    const equipment = equipments?.map(el => (
        <div className={style.checkBox} key={el.name}>
            <label className={style.labelCheckBox}>{el.name}
                <input
                    className={style.inputCheckBox}
                    type="checkbox"
                    name={el.name}
                    value={el.name}
                    onChange={handleCheckEquipment}
                />
                <span className={style.markCheckBox}> </span>
            </label>
        </div>
    ));

    const handleAddEquipment = () => {
        const data = selectedEquipments.join(';');
        if (carEquipment) {
            carEquipment(valuePreferences => ({
                ...valuePreferences,
                equipment: data
            }));
        }
        if (searchCarEquipment) {
            searchCarEquipment(valuePreferences => ({
                ...valuePreferences,
                equipment: data
            }));
        }
        closePopup(false);
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.equipmentBox}>
                        {
                            equipments === null
                                ? <Spinner/>
                                : equipment
                        }
                    </div>
                    <div className={style.btnBox}>
                        <Button
                            type="button"
                            textName="Dodaj"
                            click={handleAddEquipment}
                        />
                        <Button
                            type="button"
                            textName="Anuluj"
                            click={() => closePopup(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
