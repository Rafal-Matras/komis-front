import React, {SetStateAction, useEffect, useState} from 'react';
import {Car} from 'types';

import {config} from '../../../../config/config';
import {AddDescription} from './AddDescription';
import {AddEquipments} from './AddEquipments';
import {Input} from '../../../common/Input/Input';
import {Select} from '../../../common/Select/Select';
import {Button} from '../../../common/Button/Button';

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
    const [alert, setAlert] = useState(false);
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
        yearProduction: 0,
        engineCapacity: 0,
        power: 0,
        color: '',
        mileage: 0,
        doers: '',
        seats: '',
        price: 0,
        reserved: 'N',
        sold: 'N',
        location: branchId,
        transmission: '',
        drive: '',
        pricePurchase: 0,
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
        if (valuePreferences.mark !== '') {
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

    const validation = () => {
        if (valuePreferences.mark === 'select') {
            setAlertText('Uzupełnij pole: Marka');
            setAlert(true);
            return true;
        }
        if (valuePreferences.model === '') {
            setAlertText('Uzupełnij pole: Model');
            setAlert(true);
            return true;
        }
        if (valuePreferences.type === '') {
            setAlertText('Uzupełnij pole: Nadwozie');
            setAlert(true);
            return true;
        }
        if (valuePreferences.fuel === '') {
            setAlertText('Uzupełnij pole: Paliwo');
            setAlert(true);
            return true;
        }
        if (valuePreferences.yearProduction < 1930 || valuePreferences.yearProduction > new Date().getFullYear()) {
            setAlertText(`Pole rok produkcji musi być w przedziale 1930 - ${new Date().getFullYear()}`);
            setAlert(true);
            return true;
        }
        if (valuePreferences.engineCapacity < 500 || valuePreferences.engineCapacity > 8300) {
            setAlertText('Pole Pojemność musi być w przedziale 500 - 8300');
            setAlert(true);
            return true;
        }
        if (valuePreferences.power < 40 || valuePreferences.power > 1200) {
            setAlertText('pole Moc musi być w przedziale 40 - 1200');
            setAlert(true);
            return true;
        }
        if (valuePreferences.color === '' || valuePreferences.color.length > 16) {
            setAlertText('pole Kolor nie może być puste i przekaraczać 16 znaków');
            setAlert(true);
            return true;
        }
        if (valuePreferences.transmission === '' || valuePreferences.transmission === 'select') {
            setAlertText('Uzupełnij pole Skrzynia');
            setAlert(true);
            return true;
        }
        if (valuePreferences.drive === '' || valuePreferences.drive === 'select') {
            setAlertText('Uzupełnij pole Napęd');
            setAlert(true);
            return true;
        }
        if (valuePreferences.doers === '' || valuePreferences.doers === 'select') {
            setAlertText('Uzupełnij pole: Liczba dzwi');
            setAlert(true);
            return true;
        }
        if (valuePreferences.seats === '' || valuePreferences.seats === 'select') {
            setAlertText('Uzupełnij pole: Liczba siedzeń');
            setAlert(true);
            return true;
        }
        if (valuePreferences.mileage === 0 || valuePreferences.mileage > 9999999) {
            setAlertText('pole Przebieg musi być w przedziale 1 - 9999999');
            setAlert(true);
            return true;
        }
        if (!/[0-9A-Z]{17}/.test(valuePreferences.vin)) {
            setAlertText('Niepoprawny VIN powinien zawierać cyfry, duże litery w sumie 17 znaków');
            setAlert(true);
            return true;
        }
        if (valuePreferences.price === 0 || valuePreferences.price > 9999999) {
            setAlertText('pole Cena musi być w przedziale 1 - 9999999');
            setAlert(true);
            return true;
        }
        if (valuePreferences.pricePurchase === 0 || valuePreferences.pricePurchase > 9999999) {
            setAlertText('pole Cena zakupu musi być w przedziale 1 - 9999999');
            setAlert(true);
            return true;
        }
        if (!/[0-9A-Z]{2,3} [0-9A-Z]{1,5}/.test(valuePreferences.registration)) {
            setAlertText('Niepoprawny Nr. rejestracyjny powinien zawierać cyfry, duże litery');
            setAlert(true);
            return true;
        }
        if (valuePreferences.dateOverview === '') {
            setAlertText('Uzupełnij pole Przegląd');
            setAlert(true);
            return true;
        }
        if (valuePreferences.dateOC === '') {
            setAlertText('Uzupełnij pole Data OC');
            setAlert(true);
            return true;
        }
        if (valuePreferences.datePurchase === '') {
            setAlertText('Uzupełnij pole Data zakupu');
            setAlert(true);
            return true;
        }
        if (valuePreferences.description === '') {
            setAlertText('Uzupełnij Opis');
            setAlert(true);
            return true;
        }
        if (valuePreferences.equipment === '') {
            setAlertText('Uzupełnij Wyposarzenie');
            setAlert(true);
            return true;
        }
    };

    const handleAddCar = async () => {
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
                <p className={style.alertText} style={{color: alert ? 'red' : 'transparent'}}>{alertText}</p>
                <div className={style.formContainer}>
                    <div className={style.formBox}>
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
                                name="yearProduction"
                                textName="Rok produkcji"
                                type="text"
                                value={valuePreferences.yearProduction}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="engineCapacity"
                                textName="Pojemność"
                                type="text"
                                value={valuePreferences.engineCapacity}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="power"
                                textName="Moc"
                                type="text"
                                value={valuePreferences.power}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="color"
                                textName="Kolor"
                                type="text"
                                value={valuePreferences.color}
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
                        <div className={style.boxItem}>
                            <Select
                                name="drive"
                                textName="Napęd"
                                value={valuePreferences.drive}
                                change={updateForm}
                                options={[{name: 'Przednie koła'}, {name: 'Tylne koła'}, {name: '4x4'}]}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Select
                                name="doers"
                                textName="Liczba dzwi"
                                value={valuePreferences.doers}
                                change={updateForm}
                                options={[{name: '2'}, {name: '3'}, {name: '4'}, {name: '5'}, {name: '6'}]}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Select
                                name="seats"
                                textName="Liczba miejsc"
                                value={valuePreferences.seats}
                                change={updateForm}
                                options={[{name: '2'}, {name: '3'}, {name: '4'}, {name: '5'}, {name: '6'}, {name: '7'}, {name: '8'}, {name: '9'}]}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="mileage"
                                textName="Przebieg"
                                type="text"
                                value={valuePreferences.mileage}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="vin"
                                textName="Vin"
                                type="text"
                                value={valuePreferences.vin}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="price"
                                textName="Cena"
                                type="text"
                                value={valuePreferences.price}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="pricePurchase"
                                textName="Cena zakupu"
                                type="text"
                                value={valuePreferences.pricePurchase}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="registration"
                                textName="Nr. rejestracyjny"
                                type="text"
                                value={valuePreferences.registration}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="dateOverview"
                                textName="Przegląd"
                                type="date"
                                value={valuePreferences.dateOverview}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="dateOC"
                                textName="Data OC"
                                type="date"
                                value={valuePreferences.dateOC}
                                change={updateForm}
                            />
                        </div>
                        <div className={style.boxItem}>
                            <Input
                                name="datePurchase"
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
                            carEquipment={setValuePreferences}
                        />}
                    </div>
                    <div className={style.btnBox}>
                        <Button
                            type="button"
                            textName="Dodaj"
                            click={handleAddCar}
                        />
                        <Button
                            type="button"
                            textName="Anuluj"
                            click={() => closePopup(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};