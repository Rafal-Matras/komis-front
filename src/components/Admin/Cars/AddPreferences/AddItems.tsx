import React, {useContext, useState} from 'react';
import {SimpleCarEdit} from 'types';

import {config} from '../../../../config/config';
import {EditCarsContext} from '../../../contexts/editCarsContext';
import {Button} from '../../../common/Button/Button';

import style from './AddPreferences.module.css';

interface Props {
    title: string;
    name: string;
    carMarks?: SimpleCarEdit[] | undefined;
}

export const AddItems = ({title, name, carMarks}: Props) => {

    const {setEditCarsContext} = useContext(EditCarsContext);
    const [markValue, setMarkValue] = useState<string>('');
    const [carValue, setCarValue] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const validation = () => {
        if (carValue === '') {
            setAlertText('pole nie może być puste');
            setAlert(true);
            return true;
        }
        if (carValue.length > 100) {
            setAlertText('przekroczonna liczba znaków max 100');
            setAlert(true);
            return true;
        }
    };

    const handleAddCar = async () => {
        if (validation()) {
            return;
        }
        if (carValue !== '') {
            const exist = await fetch(`${config.URL}cars/edit/${name}/${carValue}`);
            const data = await exist.json();
            if (data) {
                setAlert(true);
                setAlertText('Już istnieje');
            } else {
                setAlert(false);
                await fetch(`${config.URL}cars/edit/${name}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name: carValue, mark: markValue}),
                });
                setCarValue('');
                setMarkValue('');
                setEditCarsContext(`${new Date()}`);
            }
        }
    };

    const markName = name === 'model'
        ? <select
            className={style.select}
            value={markValue}
            onChange={(e) => setMarkValue(e.target.value)}
        >
            <option value="select">Wybierz markę</option>
            {carMarks?.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
        </select>
        : null;

    return (
        <div className={style.formBox}>
            <div className={style.boxTitle}>
                <h3 className={style.name}>{title}</h3>
                <p style={{color: alert ? 'red' : 'transparent'}}>{alertText}</p>
            </div>
            {markName}
            <div className={style.dataBox}>
                <input
                    type="text"
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                    className={style.input}
                    disabled={name === 'model' && markValue === ''}
                />
                <Button
                    type="button"
                    textName="Dodaj"
                    click={handleAddCar}
                />
            </div>
        </div>
    );
};