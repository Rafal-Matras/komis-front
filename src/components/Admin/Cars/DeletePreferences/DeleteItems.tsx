import React, {useContext, useEffect, useState} from 'react';
import {CarEdit, SimpleCarEdit} from 'types';

import {config} from '../../../../config/config';
import {Button} from '../../../common/Button/Button';

import style from './DeletePreferences.module.css';
import {EditCarsContext} from '../../../contexts/editCarsContext';

interface Props {
    title: string;
    name: string;
    carMarks?: SimpleCarEdit[] | undefined;
}

export const DeleteItems = ({title, name, carMarks}: Props) => {

    const {editCarsContext, setEditCarsContext} = useContext(EditCarsContext);
    const [markValue, setMarkValue] = useState<string>('select');
    const [carValue, setCarValue] = useState<string>('');
    const [carSelect, setCarSelect] = useState<CarEdit[] | null>(null);

    useEffect(() => {
        (async () => {
            const req = await fetch(`${config.URL}cars/edit/car/${name}/${markValue}`);
            const data = await req.json();
            setCarSelect(data);
        })();
    }, [markValue, name, editCarsContext]);

    const handleDeleteCarItem = async () => {
        if (carValue !== '') {
            await fetch(`${config.URL}cars/edit/${name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({carValue})
            });
            setCarValue('');
            setMarkValue('select');
            setEditCarsContext(`${new Date()}`);
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
            <h3 className={style.name}>{title}</h3>
            {markName}
            <div className={style.dataBox}>
                <select
                    className={style.inputSelect}
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                >
                    <option value="select">Wybierz {name === 'mark' ? 'Markę' : title}</option>
                    {carSelect?.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
                </select>
                <Button type="button" textName="Usuń" click={handleDeleteCarItem}/>
            </div>
        </div>
    );
};