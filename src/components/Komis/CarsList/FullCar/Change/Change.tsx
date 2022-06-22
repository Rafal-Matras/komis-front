import React, {SetStateAction, useContext, useEffect, useState} from 'react';

import {Branch, BranchNames, Car} from 'types';

import {config} from '../../../../../config/config';
import {Button} from '../../../../common/Button/Button';
import {Select} from '../../../../common/Select/Select';

import style from './Change.module.css';
import {CarsListContext} from '../../../../contexts/carsListContext';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    fullCar: Car;
}

export const Change = ({closePopup, fullCar}: Props) => {

    const {setCarsListC} = useContext(CarsListContext);
    const [car, setCar] = useState<Car>(fullCar);
    const [branches, setBranches] = useState<BranchNames[]>([]);
    const [branchName, setBranchName] = useState('');


    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}branches/all`);
            const data = await res.json();
            const names = data.map((el: Branch) => Object({id: el.id, name: el.branchName}));
            setBranches(names);
        })();
    }, []);

    useEffect(() => {
        if (branchName === '' || branchName === 'select') {
            return;
        }
        const locationId = branches.find(el => branchName === el.name);
        if (locationId === undefined) {
            return;
        }
        setCar(car => ({
            ...car,
            location: locationId.id
        }));
    }, [branchName]);

    const updateBranch = (name: string, value: string) => {
        setBranchName(value);
    };


    const handleChange = async () => {
        const res = await fetch(`${config.URL}cars/${car.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(car),
        });
        const data = await res.json();
        setCarsListC(data);
        closePopup(false);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.boxSelect}>
                    <Select
                        name="branchList"
                        textName="Wybierz oddział"
                        value={branchName}
                        change={updateBranch}
                        options={branches}
                    />
                </div>
                <div className={style.boxBtn}>
                    <Button
                        type="button"
                        textName="Potwierdź"
                        click={handleChange}
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