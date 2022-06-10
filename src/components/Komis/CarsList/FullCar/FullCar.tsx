import React, {useContext, useEffect, useState} from "react";
import {Branch, Car, ConsumerReserved} from "types";

import {config} from "../../../../config/config";
import {Spinner} from "../../../common/Spinner/Spinner";
import {Sell} from "./Sell/Sell";
import {Reserve} from "./Reserve/Reserve";
import {Advance} from "./Advance/Advance";

import style from './FullCar.module.css';
import {CarsListContext} from "../../../contexts/carsListContext";

interface Props {
    carId: string
    showFullCar: (el: string) => void;
}

export const FullCar = ({carId, showFullCar}: Props) => {

    const {setCarsListC} = useContext(CarsListContext);
    const [openSell, setOpenSell] = useState(false);
    const [openReserve, setOpenReserve] = useState(false);
    const [openAdvance, setOpenAdvance] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [fullCar, setFullCar] = useState<Car>({
        id: '',
        mark: '',
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
        reserved: '',
        sold: '',
        location: '',
        transmission: '',
        pricePurchase: '',
        vin: '',
        dateOverview: '',
        dateOC: '',
        datePurchase: '',
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
    }, [carId, openReserve, openAdvance]);

    useEffect(() => {
        if (fullCar.reserved.length > 1) {
            const {
                firstName, surName, phone, email, dateFinishReservation, priceAdvance
            }: ConsumerReserved = JSON.parse(fullCar.reserved);
            const date = new Date(dateFinishReservation);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes()
            const fullDate = ` ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute} dnia ${day < 10 ? '0' + day : day},${month < 10 ? '0' +
                month : month}`;
            const emailText = email.length > 1 ? `e-mail: ${email}` : '';
            const text = `${priceAdvance.length > 1 ? 'Wpłacona zaliczka w kwocie ' + priceAdvance + 'zł' : ''} rezerwacja do godziny ${fullDate} przez ${firstName} ${surName} tel: ${phone} ${emailText}`;
            setAlertText(text);
            console.log('zmiana')
        }
    }, [fullCar.reserved]);

    const equipment = fullCar.equipment.split(';').map(el => <li className={style.text} key={el}>{el}</li>);

    const handleReturn = () => {
        setCarsListC(`${new Date()}`);
        showFullCar('');
    }

    // const handleChangeCarStatus = async () => {
    //     console.log('1---', fullCar)
    //     const res = await fetch(`${config.URL}cars/${fullCar.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'Application/json',
    //         },
    //         body: JSON.stringify(fullCar),
    //     });
    //     const data = await res.json()
    //     console.log('data-----', data)
    // }

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
                                <div className={style.textCarInfoBox}><p>Skrzynia biegów:</p>
                                    <span>{fullCar.transmission}</span>
                                </div>
                                <div className={style.textCarInfoBox}><p>VIN:</p> <span>{fullCar.vin}</span></div>
                            </div>
                            <div className={style.carInfoBox}>
                                <div className={style.textCarInfoBox}><p>Kolor:</p> <span>{fullCar.color}</span></div>
                                <div className={style.textCarInfoBox}><p>Przebieg:</p> <span>{fullCar.mileage} km</span>
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
                            <button
                                className='btnPrimarySmall'
                                style={{width: '200px'}}
                                onClick={() => setOpenSell(true)}
                            >Sprzedaj
                            </button>
                            {openSell && <Sell
                                closePopup={setOpenSell}
                                fullCar={fullCar}
                            />}
                            <button
                                className='btnPrimarySmall'
                                style={{width: '200px'}}
                                onClick={() => setOpenReserve(true)}
                            >{fullCar.reserved === 'N' ? 'Rezerwój' : 'Anuluj Rezerwację'}
                            </button>
                            {openReserve && <Reserve
                                closePopup={setOpenReserve}
                                fullCar={fullCar}
                                reserved={fullCar.reserved === 'N'}
                            />}
                            <button
                                className='btnPrimarySmall'
                                style={{width: '200px'}}
                                onClick={() => setOpenAdvance(true)}
                                disabled={fullCar.advance === 'T'}
                            >Zaliczka
                            </button>
                            {openAdvance && <Advance
                                closePopup={setOpenAdvance}
                                fullCar={fullCar}
                                reserved={fullCar.reserved === 'N'}
                            />}
                            <button
                                className='btnPrimarySmall'
                                style={{width: '200px'}}
                                onClick={handleReturn}
                            >Powrót
                            </button>
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