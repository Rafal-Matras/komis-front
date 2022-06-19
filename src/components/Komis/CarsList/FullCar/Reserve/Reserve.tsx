import React, {SetStateAction, useContext, useEffect, useState} from 'react';
import {Car, ConsumerReserved} from 'types';

import {config} from '../../../../../config/config';
import {CarsListContext} from '../../../../contexts/carsListContext';
import {Input} from '../../../../common/Input/Input';
import {Button} from '../../../../common/Button/Button';

import style from './Reserve.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    fullCar: Car;
    reserved: boolean;
}

export const Reserve = ({closePopup, fullCar, reserved}: Props) => {

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
                const date = (Date.now() + 3 * 86400000);
                editConsumer('dateFinishReservation', date);
            }
            setCar(car => ({
                ...car,
                reserved: JSON.stringify(consumer),
            }));
        } else {
            setCar(car => ({
                ...car,
                reserved: 'N',
                advance: 'N',
            }));
        }
    }, [consumer]);

    const editConsumer = (name: string, value: string | number) => {
        setConsumer(consumer => ({
            ...consumer,
            [name]: value
        }));
    };

    const validation = () => {
        if (consumer.name.length < 5) {
            setAlertText('uzupełnij Nazwa co najmniej 5 znaki');
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
    };

    const handleReserved = () => {
        setCarsListC(`${consumer}`);
        closePopup(false);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                {reserved
                    ? <>
                        <form className={style.formBox} onSubmit={addReserve}>
                            <div className={style.inputBox}>
                                <Input
                                    name="name"
                                    textName="Nazwa"
                                    type="text"
                                    value={consumer.name}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="phone"
                                    textName="Telefon"
                                    type="text"
                                    value={consumer.phone}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBoxEmail}>
                                <Input
                                    name="email"
                                    textName="E-mail"
                                    type="email"
                                    value={consumer.email}
                                    change={editConsumer}
                                />
                            </div>
                        </form>
                        <p style={{color: fillIn ? 'red' : 'transparent'}}>{alertText}</p>
                    </>
                    : <h2>Napewno anulowac rezerwację</h2>
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
                        click={handleReserved}
                    />
                </div>

            </div>
        </div>
    );
};
