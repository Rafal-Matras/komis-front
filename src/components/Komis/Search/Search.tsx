import React, {useEffect, useState} from 'react';

import {SearchCar} from 'types';

import {config} from '../../../config/config';
import {Select} from '../../common/Select/Select';
import {Input} from '../../common/Input/Input';
import {Button} from '../../common/Button/Button';
import {AddEquipments} from '../../Admin/Cars/New/AddEquipments';
import {CarsList} from '../CarsList/CarsList';

import style from './Search.module.css';

interface Name {
    name: string;
}

interface Preferences {
    markPreferences: Name[];
    modelPreferences: Name[];
    typePreferences: Name[];
    fuelPreferences: Name[];
}

export const Search = () => {

    const [openEquipments, setOpenEquipments] = useState(false);
    const [carsList, setCarsList] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        markPreferences: [],
        modelPreferences: [],
        typePreferences: [],
        fuelPreferences: [],
    });
    const [valuePreferences, setValuePreferences] = useState<SearchCar>({
        mark: 'select',
        model: '',
        type: '',
        fuel: '',
        priceFrom: 0,
        priceTo: 0,
        yearProductionFrom: 0,
        yearProductionTo: 0,
        mileageFrom: 0,
        mileageTo: 0,
        engineCapacityFrom: 0,
        engineCapacityTo: 0,
        powerFrom: 0,
        powerTo: 0,
        transmission: '',
        equipment: '',
    });

    useEffect(() => {
        (async () => {
            const markPreferences = await getDataFetch(`${config.URL}cars/edit/car/mark`);
            const typePreferences = await getDataFetch(`${config.URL}cars/edit/car/type`);
            const fuelPreferences = await getDataFetch(`${config.URL}cars/edit/car/fuel`);
            setPreferences(preferences => ({
                ...preferences,
                markPreferences,
                typePreferences,
                fuelPreferences,
            }));
        })();
    }, []);

    useEffect(() => {
        if (valuePreferences.mark !== 'select') {
            (async () => {
                const modelPreferences =
                    await getDataFetch(`${config.URL}cars/edit/car/model/${valuePreferences.mark}`);
                setPreferences(preferences => ({
                    ...preferences,
                    modelPreferences,
                }));
            })();
        }
    }, [valuePreferences.mark]);

    const getDataFetch = async (url: string) => {
        const res = await fetch(url);
        return await res.json();
    };

    const updateForm = (key: string, value: string | number) => {
        setValuePreferences(valuePreferences => ({
            ...valuePreferences,
            [key]: value,
        }));
    };

    return (
        <>
            {!carsList
                ?
                <div className={style.container}>
                    <div className={style.boxForm}>
                        <div className={style.boxItem}>
                            <Select
                                name="mark"
                                textName="Marka"
                                value={valuePreferences.mark}
                                change={updateForm}
                                options={preferences.markPreferences}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Select
                                name="model"
                                textName="Model"
                                value={valuePreferences.model}
                                change={updateForm}
                                options={preferences.modelPreferences}
                                disabled={valuePreferences.mark === 'select'}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Select
                                name="type"
                                textName="Nadwozie"
                                value={valuePreferences.type}
                                change={updateForm}
                                options={preferences.typePreferences}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Select
                                name="fuel"
                                textName="Paliwo"
                                value={valuePreferences.fuel}
                                change={updateForm}
                                options={preferences.fuelPreferences}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                type="number"
                                name="priceFrom"
                                textName="Cena od"
                                value={valuePreferences.priceFrom}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                type="number"
                                name="priceTo"
                                textName="Cena do"
                                value={valuePreferences.priceTo}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                type="number"
                                name="mileageFrom"
                                textName="Przebieg od"
                                value={valuePreferences.mileageFrom}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                type="number"
                                name="mileageTo"
                                textName="Przebieg do"
                                value={valuePreferences.mileageTo}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                type="number"
                                name="engineCapacityFrom"
                                textName="Pojemność od"
                                value={valuePreferences.engineCapacityFrom}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                type="number"
                                name="engineCapacityTo"
                                textName="Pojemność do"
                                value={valuePreferences.engineCapacityTo}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                type="number"
                                name="powerFrom"
                                textName="Moc od"
                                value={valuePreferences.powerFrom}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                type="number"
                                name="powerTo"
                                textName="Moc do"
                                value={valuePreferences.powerTo}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Select
                                name="transmission"
                                textName="Skrzynia"
                                value={valuePreferences.transmission}
                                change={updateForm}
                                options={[{name: 'Automatyczna'}, {name: 'Pół automatyczna'}, {name: 'Manualna'}]}
                            />
                        </div>
                        <div className={style.boxItemBtn}>
                            <p>Wyposarzenie</p>
                            <Button
                                type="button"
                                textName="Wybierz"
                                click={() => setOpenEquipments(true)}
                            />
                        </div>
                        {openEquipments && <AddEquipments
                            closePopup={setOpenEquipments}
                            searchCarEquipment={setValuePreferences}
                        />}
                    </div>
                    <div className={style.boxBtn}>
                        <Button
                            type="button"
                            textName="Szukaj"
                            click={() => setCarsList(true)}
                        />
                    </div>
                </div>
                : <CarsList
                    branch=""
                    role="USER"
                    whereFromCarsList="search"
                    searchResults={valuePreferences}
                />
            }
        </>
    );
};
