import React, {useEffect, useState} from 'react';

import {Car} from 'types';

import {config} from '../../../config/config';
import {New} from './New/New';
import {AddPreferences} from './AddPreferences/AddPreferences';
import {DeletePreferences} from './DeletePreferences/DeletePreferences';
import {Configuration} from './Configuration/Configuration';
import {Button} from '../../common/Button/Button';

import style from './Cars.module.css';
import {CarSold} from './CarSold/CarSold';

interface Props {
    role: string;
    branch: string;
}

export const Cars = ({role, branch}: Props) => {

    const [branchId, setBranchId] = useState('');
    const [openAddNew, setOpenAddNew] = useState(false);
    const [openAddPreferences, setOpenAddPreferences] = useState(false);
    const [openDeletePreferences, setOpenDeletePreferences] = useState(false);
    const [openConfiguration, setOpenConfiguration] = useState(false);
    const [carsSold, setCarsSold] = useState<Car[]>([]);
    const [openCarsSold, setOpenCarsSold] = useState(false);
    const [carSoldId, setCarSoldId] = useState('');

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}branches/getid/${branch}`);
            const data = await res.json();
            setBranchId(data);
        })();
    }, [branch]);

    useEffect(() => {
        (async () => {
            const branchName = await fetch(`${config.URL}branches/getid/${branch}`);
            const branchId = await branchName.json();
            const res = await fetch(`${config.URL}cars`);
            const allCars = await res.json();
            const carsAdmin = allCars.filter((el: Car) => el.sold === 'T');
            const carsRegAdmin = carsAdmin.filter((el: Car) => el.location === branchId);
            setCarsSold(role === 'ADMIN' ? carsAdmin : carsRegAdmin);
        })();
    }, [openCarsSold]);

    const handleSoldCar = (id: string | undefined) => {
        if (!id) {
            return;
        }
        setCarSoldId(id);
        setOpenCarsSold(true);
    };

    const carSold = carsSold.length > 0
        ? carsSold.map(el => (
            <li key={el.id} onClick={() => handleSoldCar(el.id)}><p>{el.mark}</p><p>{el.vin}</p></li>
        ))
        : <li>Brak</li>;

    return (
        <div className={style.container}>
            <div className={style.boxActivities}>
                <div className={style.boxBtn}>
                    <Button
                        type="button"
                        textName="Dodaj nowy"
                        click={() => setOpenAddNew(true)}
                    />
                    <Button
                        type="button"
                        textName="Dodaj preferencje"
                        click={() => setOpenAddPreferences(true)}
                    />
                    <Button
                        type="button"
                        textName="Usuń preferencje"
                        click={() => setOpenDeletePreferences(true)}
                    />
                    {role === 'ADMIN'
                        ? <Button
                            type="button"
                            textName="Konfiguracja"
                            click={() => setOpenConfiguration(true)}
                        />
                        : null
                    }
                </div>
                {openAddNew && <New
                    closePopup={setOpenAddNew}
                    branchId={branchId}
                />}
                {openAddPreferences && <AddPreferences
                    closePopup={setOpenAddPreferences}
                />}
                {openDeletePreferences && <DeletePreferences
                    closePopup={setOpenDeletePreferences}
                />}
                {openConfiguration && <Configuration
                    closePopup={setOpenConfiguration}
                />}
            </div>
            <div className={style.boxInfo}>
                <h2>Samochody sprzedane</h2>
                <ul className={style.boxInfoUl}>
                    {carSold}
                    {openCarsSold && <CarSold
                        closePopup={setOpenCarsSold}
                        carSoldId={carSoldId}
                    />}
                </ul>
            </div>
        </div>
    );
};