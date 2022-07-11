import React, {SetStateAction} from 'react';

import {Button} from '../../../common/Button/Button';

import style from './CarSold.module.css';
import {config} from '../../../../config/config';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    carSoldId: string;
}

export const CarSold = ({closePopup, carSoldId}: Props) => {

    const handleRemoveCar = async () => {
        await fetch(`${config.URL}cars/${carSoldId}`, {
            method: 'DELETE'
        });
        closePopup(false);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.boxTitle}>
                    <h2>Usunąć samochód z bazy?</h2>
                </div>

                <div className={style.boxBtn}>
                    <Button
                        type="button"
                        textName="Usuń"
                        click={handleRemoveCar}
                    />
                    <Button
                        type="button"
                        textName="Anuluj"
                        click={() => closePopup(false)}
                    />
                </div>
            </div>
        </div>
    );
};