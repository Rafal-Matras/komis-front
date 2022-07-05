import React, {SetStateAction, useEffect, useState} from 'react';

import {SimpleCarEdit} from 'types';

import {config} from '../../../../config/config';
import {AddItems} from './AddItems';
import {Button} from '../../../common/Button/Button';

import style from './AddPreferences.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
}

export const AddPreferences = ({closePopup}: Props) => {

    const [carMarks, setCarMarks] = useState<SimpleCarEdit[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}cars/edit/car/mark`);
            const data = await res.json();
            setCarMarks(data);
        })();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.boxItems}>
                    <AddItems
                        name="mark"
                        title="Marka"
                    />
                    <AddItems
                        name="model"
                        title="Model"
                        carMarks={carMarks}
                    />
                    <AddItems
                        name="equipment"
                        title="Wyposażenie"
                    />
                    <AddItems
                        name="fuel"
                        title="Typ paliwa"
                    />
                    <AddItems
                        name="type"
                        title="Typ nadwozia"
                    />
                </div>
                <Button
                    type="button"
                    textName="Anuluj"
                    click={() => closePopup(false)}
                />
            </div>
        </div>
    );
};
