import React, {SetStateAction, useEffect, useState} from "react";
import {Car} from "types";

import {AddDescription} from "./AddDescription";
import {AddEquipments} from "./AddEquipments";
import {config} from "../../../../config/config";

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
        pricePurchase: '',
        vin: '',
        dateOverview: '',
        dateOC: '',
        datePurchase: '',
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
            }))
        })();
    }, []);

    useEffect(() => {
        if (preferences.markPreferences) {
            (async () => {
                const modelPreferences = await getDataFetch(`${config.URL}cars/edit/car/?name=model&model=${valuePreferences.mark}`);
                setPreferences(preferences => ({
                    ...preferences,
                    modelPreferences,
                }))
            })();
        }
    }, [valuePreferences.mark]);

    const getDataFetch = async (url: string) => {
        const res = await fetch(url);
        return await res.json()
    }

    const updateForm = (key: string, value: string) => {
        setValuePreferences(valuePreferences => ({
            ...valuePreferences,
            [key]: value,
        }));
    };

    const markValue = <select
        id='mark'
        className={style.select}
        value={valuePreferences.mark}
        onChange={e => updateForm('mark', e.target.value)}
    >
        <option value='select'>Wybierz</option>
        {preferences.markPreferences.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
    </select>

    const modelValue = <select
        id='model'
        disabled={valuePreferences.mark === 'select'}
        className={style.select}
        value={valuePreferences.model}
        onChange={e => updateForm('model', e.target.value)}
    >
        <option value='select'>Wybierz</option>
        {preferences.modelPreferences.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
    </select>

    const typeValue = <select
        id='type'
        className={style.select}
        value={valuePreferences.type}
        onChange={e => updateForm('type', e.target.value)}
    >
        <option value='select'>Wybierz</option>
        {preferences.typePreferences.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
    </select>

    const fuelValue = <select
        id='fuel'
        className={style.select}
        value={valuePreferences.fuel}
        onChange={e => updateForm('fuel', e.target.value)}
    >
        <option value='select'>Wybierz</option>
        {preferences.fuelPreferences.map(el => <option key={el.name} value={el.name}>{el.name}</option>)}
    </select>

    const validation = () => {
        if (valuePreferences.mark === 'select') {
            setAlertText('Uzupełnij pole: Marka');
            setFillIn(true);
            return true
        }
        if (valuePreferences.model === '') {
            setAlertText('Uzupełnij pole: Model');
            setFillIn(true);
            return true
        }
        if (valuePreferences.type === '') {
            setAlertText('Uzupełnij pole: Nadwozie');
            setFillIn(true);
            return true
        }
        if (valuePreferences.fuel === '') {
            setAlertText('Uzupełnij pole: Paliwo');
            setFillIn(true);
            return true
        }
        if (valuePreferences.yearProduction === '') {
            setAlertText('Uzupełnij pole: Rok produkcji');
            setFillIn(true);
            return true
        }
        if (!/^1|2+[0-9]{3}$/.test(valuePreferences.yearProduction)) {
            setAlertText('Niepoprawny rok produkcji');
            setFillIn(true);
            return true
        }
        if (valuePreferences.engineCapacity === '') {
            setAlertText('Uzupełnij pole: Pojemność');
            setFillIn(true);
            return true
        }
        if (/[0-9]{3,4}]/.test(valuePreferences.model)) {
            setAlertText('Niepoprawna pojemność 3 lub 4 cyfry');
            setFillIn(true);
            return true
        }
        if (valuePreferences.power === '') {
            setAlertText('Uzupełnij pole: Moc');
            setFillIn(true);
            return true
        }
        if (!/[0-9]{2,4}/.test(valuePreferences.power)) {
            setAlertText('Niepoprawna Moc silnika 2-4 cyfry');
            setFillIn(true);
            return true
        }
        if (valuePreferences.transmission === '') {
            setAlertText('Uzupełnij pole: Skrzynia');
            setFillIn(true);
            return true
        }
        if (valuePreferences.color === '') {
            setAlertText('Uzupełnij pole: Kolor');
            setFillIn(true);
            return true
        }
        if (valuePreferences.mileage === '') {
            setAlertText('Uzupełnij pole: Przebieg');
            setFillIn(true);
            return true
        }
        if (!/[0-9]{1,7}/.test(valuePreferences.mileage)) {
            setAlertText('Uzupełnij pole: Model');
            setFillIn(true);
            return true
        }
        if (valuePreferences.doers === '') {
            setAlertText('Uzupełnij pole: Liczba dzwi');
            setFillIn(true);
            return true
        }
        if (valuePreferences.seats === '') {
            setAlertText('Uzupełnij pole: Liczba siedzeń');
            setFillIn(true);
            return true
        }
        if (valuePreferences.price === '') {
            setAlertText('Uzupełnij pole: Cena');
            setFillIn(true);
            return true
        }
        if (!/[0-9]{1,7}/.test(valuePreferences.price)) {
            setAlertText('niepoprawna cena');
            setFillIn(true);
            return true
        }
        if (valuePreferences.pricePurchase === '') {
            setAlertText('Uzupełnij pole: Cena zakupu');
            setFillIn(true);
            return true
        }
        if (!/[0-9]{1,7}/.test(valuePreferences.pricePurchase)) {
            setAlertText('niepoprawna cena zakupu');
            setFillIn(true);
            return true
        }
        if (valuePreferences.vin === '') {
            setAlertText('Uzupełnij pole: VIN');
            setFillIn(true);
            return true
        }
        if (!/[0-9A-Z]{17}/.test(valuePreferences.vin)) {
            setAlertText('Niepoprawny VIN powinien zawierać cyfry i duże litery');
            setFillIn(true);
            return true
        }
    }
    const handleAddCar = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validation()) {
            return
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
                        <label htmlFor="mark">Marka
                            {markValue}
                        </label>
                        <label htmlFor="model">Model
                            {modelValue}
                        </label>
                        <label htmlFor="type">Nadwozie
                            {typeValue}
                        </label>
                        <label htmlFor="fuel">Paliwo
                            {fuelValue}
                        </label>
                        <label htmlFor="yearProduction">Rok produkcji
                            <input
                                id='yearProduction'
                                type="text"
                                value={valuePreferences.yearProduction}
                                onChange={e => updateForm('yearProduction', e.target.value)}
                            />
                        </label>
                        <label htmlFor="engineCapacity">Pojemność
                            <input
                                id='engineCapacity'
                                type="text"
                                value={valuePreferences.engineCapacity}
                                onChange={e => updateForm('engineCapacity', e.target.value)}
                            />
                        </label>
                        <label htmlFor="power">Moc
                            <input
                                id='power'
                                type="text"
                                value={valuePreferences.power}
                                onChange={e => updateForm('power', e.target.value)}
                            />
                        </label>
                        <label htmlFor="transmission">Skrzynia
                            <select
                                id='transmission'
                                value={valuePreferences.transmission}
                                onChange={e => updateForm('transmission', e.target.value)}
                            >
                                <option value='none'>Wybierz</option>
                                <option value='automatic'>Automatyczna</option>
                                <option value='manual'>Manualna</option>
                            </select>
                        </label>
                        <label htmlFor="color">Kolor
                            <input
                                id='color'
                                type="text"
                                value={valuePreferences.color}
                                onChange={e => updateForm('color', e.target.value)}
                            />
                        </label>
                        <label htmlFor="mileage">Przebieg
                            <input
                                id='mileage'
                                type="text"
                                value={valuePreferences.mileage}
                                onChange={e => updateForm('mileage', e.target.value)}
                            />
                        </label>
                        <label htmlFor="doers">Liczba dzwi
                            <select
                                id='doers'
                                value={valuePreferences.doers}
                                onChange={e => updateForm('doers', e.target.value)}
                            >
                                <option value="dors">Wybierz</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </label>
                        <label htmlFor="seats">Liczba siedzeń
                            <select
                                id='seats'
                                value={valuePreferences.seats}
                                onChange={e => updateForm('seats', e.target.value)}
                            >
                                <option value="seats">Wybierz</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </label>
                        <label htmlFor="price">Cena
                            <input
                                id='price'
                                type="text"
                                value={valuePreferences.price}
                                onChange={e => updateForm('price', e.target.value)}
                            />
                        </label>
                        <label htmlFor="pricePurchase">Cena zakupu
                            <input
                                id='pricePurchase'
                                type="text"
                                value={valuePreferences.pricePurchase}
                                onChange={e => updateForm('pricePurchase', e.target.value)}
                            />
                        </label>
                        <label htmlFor="vin">VIN
                            <input
                                id='vin'
                                type='text'
                                value={valuePreferences.vin}
                                onChange={e => updateForm('vin', e.target.value)}
                            />
                        </label>
                        <label htmlFor="dateOverview">Przegląd
                            <input
                                id='dateOverview'
                                type='date'
                                value={valuePreferences.dateOverview}
                                onChange={e => updateForm('dateOverview', e.target.value)}
                            />
                        </label>
                        <label htmlFor="dateOC">OC
                            <input
                                id='dateOC'
                                type='date'
                                value={valuePreferences.dateOC}
                                onChange={e => updateForm('dateOC', e.target.value)}
                            />
                        </label>
                        <label htmlFor="datePurchase">Data zakupu
                            <input
                                id='datePurchase'
                                type='date'
                                value={valuePreferences.datePurchase}
                                onChange={e => updateForm('datePurchase', e.target.value)}
                            />
                        </label>
                        <button
                            type='reset'
                            className={style.btnForm}
                            onClick={() => setOpenAddDescriptions(true)}
                        >Opis
                        </button>
                        {openAddDescriptions && <AddDescription
                            closePopup={setOpenAddDescriptions}
                            setValuePreferences={setValuePreferences}
                        />}
                        <button
                            type='reset'
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
                            type='submit'
                            className='btnPrimarySmall'
                        >Dodaj
                        </button>
                        <button
                            type='reset'
                            className='btnPrimarySmall'
                            onClick={() => closePopup(false)}
                        >Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};