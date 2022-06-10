import React, {FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {Car, ConsumerReserved} from "types";

import style from '../Reserve/Reserve.module.css';
import {config} from "../../../../../config/config";
import {CarsListContext} from "../../../../contexts/carsListContext";

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    fullCar: Car;
    reserved: boolean;
}

export const Advance = ({closePopup, fullCar, reserved}: Props) => {

    const {setCarsListC} = useContext(CarsListContext);
    const [car, setCar] = useState<Car>(fullCar);
    const [fillIn, setFillIn] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [consumer, setConsumer] = useState<ConsumerReserved>({
        firstName: '',
        surName: '',
        phone: '',
        email: '',
        dateFinishReservation: 0,
        priceAdvance: '',
    });

    useEffect(() => {
        if (reserved) {
            if (consumer.dateFinishReservation === 0) {
                const date = (Date.now() + 10 * 86400000);
                editConsumer('dateFinishReservation', date);
            }
            setCar(car => ({
                ...car,
                reserved: JSON.stringify(consumer),
                advance: 'T'
            }));
        } else {
            setCar(car => ({
                ...car,
                reserved: 'N',
                advance: 'N',
            }))
        }
    }, [consumer]);

    const editConsumer = (key: string, value: string | number) => {
        setConsumer(consumer => ({
            ...consumer,
            [key]: value
        }));
    };

    const validation = () => {
        if (consumer.firstName.length < 3) {
            setAlertText('uzupełnij  Imię co najmniej 3 znaki');
            setFillIn(true);
            return true;
        }
        if (consumer.surName.length < 2) {
            setAlertText('uzupełnij Nazwisko co najmniej 2 znaki');
            setFillIn(true);
            return true;
        }
        if (consumer.phone === '' || !/[0-9]{6,9}/.test(consumer.phone)) {
            setAlertText('uzupełnij Telefon bądz niepoprawny numer same cyfry bez spacji');
            setFillIn(true);
            return true;
        }
        if (!/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i.test(consumer.email) && consumer.email !== '') {
            setAlertText('niepoprawny E-mail');
            setFillIn(true);
            return true;
        }
        if (consumer.priceAdvance === '' || !/[0-9]{1,10}/.test(consumer.priceAdvance)) {
            setAlertText('uzupełnij Zaliczkę bądz niepoprawna cena same cyfry');
            setFillIn(true);
            return true;
        }
    }

    const addReserve = async (e: FormEvent) => {
        e.preventDefault();
        if (reserved) {
            if (validation()) {
                return
            }
        }

        await fetch(`${config.URL}cars/${car.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(car),
        });
        closePopup(false);
        setCarsListC(`${new Date()}`);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                {reserved
                    ? <>
                        <form className={style.formBox} onSubmit={addReserve}>
                            <label htmlFor="firstName">Imię:
                                <input
                                    id='firstName'
                                    type="text"
                                    value={consumer.firstName}
                                    onChange={e => editConsumer('firstName', e.target.value)}
                                />
                            </label>
                            <label htmlFor="surName">Nazwisko:
                                <input
                                    id='surName'
                                    type="text"
                                    value={consumer.surName}
                                    onChange={e => editConsumer('surName', e.target.value)}
                                />
                            </label>
                            <label htmlFor="surName">Telefon:
                                <input
                                    id='surName'
                                    type="text"
                                    value={consumer.phone}
                                    onChange={e => editConsumer('phone', e.target.value)}
                                />
                            </label>
                            <label htmlFor="surName">E-mail:
                                <input
                                    id='surName'
                                    type="email"
                                    value={consumer.email}
                                    onChange={e => editConsumer('email', e.target.value)}
                                />
                            </label>
                            <label htmlFor="priceAdvance">Zaliczka:
                                <input
                                    id='priceAdvance'
                                    type="text"
                                    value={consumer.priceAdvance}
                                    onChange={e => editConsumer('priceAdvance', e.target.value)}
                                />
                            </label>

                        </form>
                        <p style={{color: fillIn ? 'red' : 'transparent'}}>{alertText}</p>

                    </>
                    : <>
                        <p>Napewno anulowac rezerwację</p>
                    </>
                }
                <div className={style.btnBox}>
                    <button
                        type='button'
                        className='btnPrimarySmall'
                        onClick={addReserve}
                    >Potwierdz
                    </button>
                    <button
                        type='reset'
                        className='btnPrimarySmall'
                        onClick={() => closePopup(false)}
                    >Anuluj
                    </button>
                </div>

            </div>
        </div>
    )
}
