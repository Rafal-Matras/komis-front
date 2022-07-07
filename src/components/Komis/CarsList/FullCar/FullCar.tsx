import React, {useContext, useEffect, useState} from 'react';
import {Branch, Car, ConsumerReserved} from 'types';

import {CarsListContext} from '../../../contexts/carsListContext';
import {config} from '../../../../config/config';
import {Button} from '../../../common/Button/Button';
import {Spinner} from '../../../common/Spinner/Spinner';
import {Sell} from './Sell/Sell';
import {Reserve} from './Reserve/Reserve';
import {Advance} from './Advance/Advance';

import style from './FullCar.module.css';
import {Change} from './Change/Change';

interface Props {
    role: string;
    carId: string;
    showFullCar: (el: string) => void;
}

export const FullCar = ({role, carId, showFullCar}: Props) => {

    const {carsListContext, setCarsListContext} = useContext(CarsListContext);
    const [openSell, setOpenSell] = useState(false);
    const [openReserve, setOpenReserve] = useState(false);
    const [openAdvance, setOpenAdvance] = useState(false);
    const [openChange, setOpenChange] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [fullCar, setFullCar] = useState<Car>({
        id: '',
        mark: '',
        model: '',
        type: '',
        fuel: '',
        yearProduction: 0,
        engineCapacity: 0,
        power: 0,
        color: '',
        mileage: 0,
        drive: '',
        doers: '',
        seats: '',
        price: 0,
        reserved: '',
        sold: '',
        location: '',
        transmission: '',
        pricePurchase: 0,
        vin: '',
        dateOverview: '',
        dateOC: '',
        datePurchase: '',
        registration: '',
        equipment: '',
        description: '',
        advance: '',
    });
    const [branch, setBranch] = useState<Branch>({
        id: '',
        branchName: '',
        city: '',
        postCode: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}cars/${carId}`);
            const data = await res.json();
            setFullCar(data);
            const resBranch = await fetch(`${config.URL}branches/${data.location}`);
            const branch = await resBranch.json();
            setBranch(branch);
        })();
    }, [carId, openReserve, openAdvance, carsListContext]);

    useEffect(() => {
        if (fullCar.reserved.length > 1) {
            const {
                name,
                phone,
                email,
                dateFinishReservation,
                priceAdvance
            }: ConsumerReserved = JSON.parse(fullCar.reserved);
            const date = new Date(dateFinishReservation);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const fullDate = ` ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute} dnia ${day < 10 ? '0' + day : day}.${month < 10 ? '0' +
                month : month}`;
            const advanceText = priceAdvance.length > 1 ? 'Wpłacona zaliczka w kwocie ' + priceAdvance + ' zł' : '';
            const telText = phone.length > 1 ? `tel: ${phone}` : '';
            const emailText = email.length > 1 ? `e-mail: ${email}` : '';
            const text = `${advanceText} Rezerwacja do godziny ${fullDate}, przez ${name} ${telText} ${emailText}`;
            setAlertText(text);
        }
    }, [fullCar.reserved]);

    const equipment = fullCar.equipment.split(';').map(el => <li className={style.text} key={el}>{el}</li>);

    const handleReturn = () => {
        setCarsListContext(`${new Date()}`);
        showFullCar('');
    };

    return (
        <div className={style.container}>
            <div className={style.topBox}>
                <p
                    style={{color: fullCar.reserved.length > 1 ? '#e30000' : 'transparent'}}
                >{alertText}
                </p>
            </div>
            {fullCar
                ? <>
                    <div className={style.box}>
                        <div className={style.infoBox}>
                            <div className={style.carInfoBox}>
                                <div className={style.textCarInfoBox}><p>Marka:</p><span>{fullCar.mark}</span></div>
                                <div className={style.textCarInfoBox}><p>Model:</p> <span>{fullCar.model}</span></div>
                                <div className={style.textCarInfoBox}><p>Typ nadwozia:</p> <span>{fullCar.type}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Rodzaj paliwa:</p> <span>{fullCar.fuel}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Rok produkcji:</p>
                                    <span>{fullCar.yearProduction}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Silnik:</p>
                                    <span>{fullCar.engineCapacity}</span></div>
                                <div className={style.textCarInfoBox}><p>Ilość koni:</p> <span>{fullCar.power} KM</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Nr. rejestracyjny:</p>
                                    <span>{fullCar.registration}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Skrzynia biegów:</p>
                                    <span>{fullCar.transmission}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>VIN:</p> <span>{fullCar.vin}</span></div>
                            </div>
                            <div className={style.carInfoBox}>
                                <div className={style.textCarInfoBox}><p>Kolor:</p> <span>{fullCar.color}</span></div>
                                <div className={style.textCarInfoBox}><p>Przebieg:</p> <span>{fullCar.mileage} km</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Napęd:</p> <span>{fullCar.drive}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Liczba dzwi:</p> <span>{fullCar.doers}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Liczba miejsc:</p> <span>{fullCar.seats}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Cena:</p> <span>{fullCar.price} zł</span></div>
                                <div className={style.textCarInfoBox}><p>Cena zakupu:</p>
                                    <span>{fullCar.pricePurchase} zł</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>kolejny przegląd:</p>
                                    <span>{fullCar.dateOverview}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Koniec polisy OC:</p>
                                    <span>{fullCar.dateOC}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>Data zakupu:</p>
                                    <span>{fullCar.datePurchase}</span></div>
                            </div>
                        </div>
                        <div className={style.menuBox}>
                            <Button
                                textName="Sprzedaj"
                                type="button"
                                click={() => setOpenSell(true)}
                            />
                            <Button
                                textName={fullCar.reserved === 'N' ? 'Rezerwuj' : 'anuluj rezerwację'}
                                type="button"
                                click={() => setOpenReserve(true)}
                            />
                            <Button
                                textName="Zaliczka"
                                type="button"
                                click={() => setOpenAdvance(true)}
                                disabled={fullCar.advance === 'T' || fullCar.reserved !== 'N'}
                            />
                            {role === 'REG_ADMIN'
                                ? <Button
                                    textName="Zmień komis"
                                    type="button"
                                    click={() => setOpenChange(true)}
                                />
                                : null
                            }
                            <Button
                                textName="Powrót"
                                type="button"
                                click={handleReturn}
                            />
                            {openSell && <Sell
                                closePopup={setOpenSell}
                                fullCar={fullCar}
                            />}
                            {openReserve && <Reserve
                                closePopup={setOpenReserve}
                                fullCar={fullCar}
                                reserved={fullCar.reserved === 'N'}
                            />}
                            {openAdvance && <Advance
                                closePopup={setOpenAdvance}
                                fullCar={fullCar}
                                reserved={fullCar.reserved === 'N'}
                            />}
                            {openChange && <Change
                                closePopup={setOpenChange}
                                fullCar={fullCar}
                            />}
                        </div>
                    </div>

                    <div className={style.bottomBox}>
                        <div className={style.location}>
                            <p
                                className={style.branch}
                            >{`Komis ${branch.branchName}, ul.${branch.address}, ${branch.city} tel: ${branch.phone} `}
                            </p>
                        </div>
                        <div className={style.equipmentBox}>
                            <p className={style.title}>Wyposarzenie:</p>
                            <ul>
                                {equipment}
                            </ul>
                        </div>
                        <div className={style.descriptionBox}>
                            <p className={style.title}>Opis:</p>
                            <p className={style.text}>{fullCar.description}</p>
                        </div>
                    </div>
                </>
                : <Spinner/>
            }
        </div>
    );
};