import React, {SetStateAction, useContext, useEffect, useState} from 'react';
import {Car, ConsumerReserved} from 'types';

import {config} from '../../../../../config/config';
import {CarsListContext} from '../../../../contexts/carsListContext';

import {Input} from '../../../../common/Input/Input';
import {Button} from '../../../../common/Button/Button';

import style from './Advance.module.css';

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
        name: '',
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
            }));
        }
    }, [consumer]);

    const editConsumer = (key: string, value: string | number) => {
        setConsumer(consumer => ({
            ...consumer,
            [key]: value
        }));
    };

    const validation = () => {
        if (consumer.name.length < 5) {
            setAlertText('uzupełnij  Nazwę co najmniej 5 znaki');
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
    };

    const addReserve = async () => {
        if (reserved) {
            if (validation()) {
                return;
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
                            <div className={style.boxItem}>
                                <Input
                                    name="name"
                                    textName="Nazwa"
                                    type="text"
                                    value={consumer.name}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.boxItem}>
                                <Input
                                    name="phone"
                                    textName="Telefon"
                                    type="text"
                                    value={consumer.phone}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.boxItemEmail}>
                                <Input
                                    name="email"
                                    textName="E-mail"
                                    type="email"
                                    value={consumer.email}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.boxItem}>
                                <Input
                                    name="priceAdvance"
                                    textName="Zaliczka"
                                    type="number"
                                    value={consumer.priceAdvance}
                                    change={editConsumer}
                                />
                            </div>
                        </form>
                        <p style={{color: fillIn ? 'red' : 'transparent'}}>{alertText}</p>

                    </>
                    : <>
                        <p className={style.text}>Napewno anulowac rezerwację</p>
                    </>
                }
                <div className={style.btnBox}>
                    <Button
                        textName="Potwierdz"
                        type="button"
                        click={addReserve}
                    />
                    <Button
                        textName="Anuluj"
                        type="reset"
                        click={() => closePopup(false)}
                    />
                </div>
            </div>
        </div>
    );
};
