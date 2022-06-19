import React, {SetStateAction, useEffect, useState} from 'react';
import {Car} from 'types';

import {AddDescription} from './AddDescription';
import {AddEquipments} from './AddEquipments';
import {Input} from '../../../common/Input/Input';
import {Select} from '../../../common/Select/Select';
import {config} from '../../../../config/config';

import style from './New.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    branchId: string;
}

interface Name {
    name: string;
}

interface Preferences {
    markPreferences: Name[];
    modelPreferences: Name[];
    typePreferences: Name[];
    fuelPreferences: Name[];
}

export const New = ({closePopup, branchId}: Props) => {


    const [openAddEquipment, setOpenAddEquipment] = useState(false);
    const [openAddDescriptions, setOpenAddDescriptions] = useState(false);
    const [fillIn, setFillIn] = useState(false);
    const [alertText, setAlertText] = useState('alert');
    const [preferences, setPreferences] = useState<Preferences>({
        markPreferences: [],
        modelPreferences: [],
        typePreferences: [],
        fuelPreferences: [],
    });

    const [valuePreferences, setValuePreferences] = useState<Car>({
        mark: 'select',
        model: '',
        type: '',
        fuel: '',
        yearProduction: '',
        engineCapacity: '',
        power: '',
        color: '',
        mileage: '',
        doers: '',
        seats: '',
        price: '',
        reserved: 'N',
        sold: 'N',
        location: branchId,
        transmission: '',
        drive: '',
        pricePurchase: '',
        vin: '',
        dateOverview: '',
        dateOC: '',
        datePurchase: '',
        registration: '',
        equipment: '',
        description: '',
        advance: 'N',
    });

    useEffect(() => {
        (async () => {
            const markPreferences = await getDataFetch(`${config.URL}cars/edit/car/?name=mark`);
            const typePreferences = await getDataFetch(`${config.URL}cars/edit/car/?name=type`);
            const fuelPreferences = await getDataFetch(`${config.URL}cars/edit/car/?name=fuel`);
            setPreferences(preferences => ({
                ...preferences,
                markPreferences,
                typePreferences,
                fuelPreferences,
            }));
        })();
    }, []);

    useEffect(() => {
        if (preferences.markPreferences) {
            (async () => {
                const modelPreferences = await getDataFetch(`${config.URL}cars/edit/car/?name=model&model=${valuePreferences.mark}`);
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

    const updateForm = (key: string, value: string) => {
        setValuePreferences(valuePreferences => ({
            ...valuePreferences,
            [key]: value,
        }));
    };

    const validation = () => {
        if (valuePreferences.mark === 'select') {
            setAlertText('Uzupełnij pole: Marka');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.model === '') {
            setAlertText('Uzupełnij pole: Model');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.type === '') {
            setAlertText('Uzupełnij pole: Nadwozie');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.fuel === '') {
            setAlertText('Uzupełnij pole: Paliwo');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.yearProduction === '') {
            setAlertText('Uzupełnij pole: Rok produkcji');
            setFillIn(true);
            return true;
        }
        if (!/^1|2+[0-9]{3}$/.test(valuePreferences.yearProduction)) {
            setAlertText('Niepoprawny rok produkcji');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.engineCapacity === '') {
            setAlertText('Uzupełnij pole: Pojemność');
            setFillIn(true);
            return true;
        }
        if (/[0-9]{3,4}]/.test(valuePreferences.model)) {
            setAlertText('Niepoprawna pojemność 3 lub 4 cyfry');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.power === '') {
            setAlertText('Uzupełnij pole: Moc');
            setFillIn(true);
            return true;
        }
        if (!/[0-9]{2,4}/.test(valuePreferences.power)) {
            setAlertText('Niepoprawna Moc silnika 2-4 cyfry');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.transmission === '') {
            setAlertText('Uzupełnij pole: Skrzynia');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.color === '') {
            setAlertText('Uzupełnij pole: Kolor');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.mileage === '') {
            setAlertText('Uzupełnij pole: Przebieg');
            setFillIn(true);
            return true;
        }
        if (!/[0-9]{1,7}/.test(valuePreferences.mileage)) {
            setAlertText('Uzupełnij pole: Model');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.doers === '') {
            setAlertText('Uzupełnij pole: Liczba dzwi');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.seats === '') {
            setAlertText('Uzupełnij pole: Liczba siedzeń');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.price === '') {
            setAlertText('Uzupełnij pole: Cena');
            setFillIn(true);
            return true;
        }
        if (!/[0-9]{1,7}/.test(valuePreferences.price)) {
            setAlertText('niepoprawna cena');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.pricePurchase === '') {
            setAlertText('Uzupełnij pole: Cena zakupu');
            setFillIn(true);
            return true;
        }
        if (!/[0-9]{1,7}/.test(valuePreferences.pricePurchase)) {
            setAlertText('niepoprawna cena zakupu');
            setFillIn(true);
            return true;
        }
        if (valuePreferences.vin === '') {
            setAlertText('Uzupełnij pole: VIN');
            setFillIn(true);
            return true;
        }
        if (!/[0-9A-Z]{17}/.test(valuePreferences.vin)) {
            setAlertText('Niepoprawny VIN powinien zawierać cyfry i duże litery');
            setFillIn(true);
            return true;
        }
    };
    const handleAddCar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validation()) {
            return;
        }
        await fetch(`${config.URL}cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(valuePreferences),
        });
        closePopup(false);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                <p className={style.errorText} style={{color: fillIn ? 'red' : 'transparent'}}>{alertText}</p>
                <form className={style.formContainer} onSubmit={handleAddCar}>
                    <div className={style.formBox}>
                        <div className={style.inputBox}>
                            <Select
                                name="mark"
                                textName="Marka"
                                value={valuePreferences.mark}
                                change={updateForm}
                                options={preferences.markPreferences}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Select
                                name="model"
                                textName="Model"
                                value={valuePreferences.model}
                                change={updateForm}
                                options={preferences.modelPreferences}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Select
                                name="type"
                                textName="Nadwozie"
                                value={valuePreferences.type}
                                change={updateForm}
                                options={preferences.typePreferences}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Select
                                name="fuel"
                                textName="Paliwo"
                                value={valuePreferences.fuel}
                                change={updateForm}
                                options={preferences.fuelPreferences}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="yearProduction"
                                textName="Rok produkcji"
                                type="text"
                                value={valuePreferences.yearProduction}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="engineCapacity"
                                textName="Pojemność"
                                type="text"
                                value={valuePreferences.engineCapacity}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="power"
                                textName="Moc"
                                type="text"
                                value={valuePreferences.power}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="color"
                                textName="Kolor"
                                type="text"
                                value={valuePreferences.color}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Select
                                name="transmission"
                                textName="Skrzynia"
                                value={valuePreferences.transmission}
                                change={updateForm}
                                options={[{name: 'Automatyczna'}, {name: 'Pół automatyczna'}, {name: 'Manualna'}]}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Select
                                name="drive"
                                textName="Napęd"
                                value={valuePreferences.drive}
                                change={updateForm}
                                options={[{name: 'Przednie koła'}, {name: 'Tylne koła'}, {name: '4x4'}]}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Select
                                name="doers"
                                textName="Liczba dzwi"
                                value={valuePreferences.doers}
                                change={updateForm}
                                options={[{name: '2'}, {name: '3'}, {name: '4'}, {name: '5'}, {name: '6'}]}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Select
                                name="seats"
                                textName="Liczba siedzeń"
                                value={valuePreferences.seats}
                                change={updateForm}
                                options={[{name: '2'}, {name: '3'}, {name: '4'}, {name: '5'}, {name: '6'}, {name: '7'}, {name: '8'}, {name: '9'}]}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="mileage"
                                textName="Przebieg"
                                type="text"
                                value={valuePreferences.mileage}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="vin"
                                textName="Vin"
                                type="text"
                                value={valuePreferences.vin}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="price"
                                textName="Cena"
                                type="text"
                                value={valuePreferences.price}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="pricePurchase"
                                textName="Cena zakupu"
                                type="text"
                                value={valuePreferences.pricePurchase}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="registraction"
                                textName="Nr. rejestracyjny"
                                type="text"
                                value={valuePreferences.registration}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="dateOverview"
                                textName="Przegląd"
                                type="date"
                                value={valuePreferences.dateOverview}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="dateOC"
                                textName="Data OC"
                                type="date"
                                value={valuePreferences.dateOC}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.inputBox}>
                            <Input
                                name="darePurchase"
                                textName="Data zakupu"
                                type="date"
                                value={valuePreferences.datePurchase}
                                change={updateForm}
                            />
                        </div>
                        <button
                            type="reset"
                            className={style.btnForm}
                            onClick={() => setOpenAddDescriptions(true)}
                        >Opis
                        </button>
                        {openAddDescriptions && <AddDescription
                            closePopup={setOpenAddDescriptions}
                            setValuePreferences={setValuePreferences}
                        />}
                        <button
                            type="reset"
                            className={style.btnForm}
                            onClick={() => setOpenAddEquipment(true)}
                        >Wyposarzenie
                        </button>
                        {openAddEquipment && <AddEquipments
                            closePopup={setOpenAddEquipment}
                            setValuePreferences={setValuePreferences}
                        />}
                    </div>
                    <div className={style.btnBox}>
                        <button
                            type="submit"
                            className="btnPrimarySmall"
                        >Dodaj
                        </button>
                        <button
                            type="reset"
                            className="btnPrimarySmall"
                            onClick={() => closePopup(false)}
                        >Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};