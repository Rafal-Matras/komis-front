import React, {useState} from 'react';
import {CarBuy, ConsumerArrangement} from 'types';

import {Button} from '../../common/Button/Button';
import {Input} from '../../common/Input/Input';
import {Select} from '../../common/Select/Select';
import {DocumentToPrint} from './Document/DocumentToPrint';

import style from './Buy.module.css';

interface Props {
    branch: string;
}

export const Buy = ({branch}: Props) => {

    const [printing, setPrinting] = useState(false);
    const [car, setCar] = useState<CarBuy>({
        mark: '',
        model: '',
        yearProduction: '',
        vin: '',
        registration: '',
        mileage: '',
    });
    const [consumer, setConsumer] = useState<ConsumerArrangement>({
        name: '',
        pesel: '',
        nip: '',
        document: '',
        documentId: '',
        address: '',
        postCode: '',
        city: '',
        price: '',
        priceInWords: '',
    });

    const editCar = (name: string, value: string) => {
        setCar(consumer => ({
            ...consumer,
            [name]: value,
        }));
    };

    const editConsumer = (name: string, value: string) => {
        setConsumer(consumer => ({
            ...consumer,
            [name]: value,
        }));
    };

    const handleGenerateArrangement = () => {
        setPrinting(true);
    };

    return (
        <>
            {printing
                ? <DocumentToPrint
                    car={car}
                    consumer={consumer}
                    branch={branch}
                    setPrinting={setPrinting}
                />
                : <div className={style.container}>
                    <form className={style.formContainer}>
                        <div className={style.formBox}>
                            <div className={style.inputBox}>
                                <Input
                                    name="name"
                                    textName="Imię i Nazwisko"
                                    type="text"
                                    value={consumer.name}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="pesel"
                                    textName="Pesel"
                                    type="text"
                                    value={consumer.pesel}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="nip"
                                    textName="Nip"
                                    type="text"
                                    value={consumer.nip}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Select
                                    name="document"
                                    textName="Dokument"
                                    value={consumer.document}
                                    change={editConsumer}
                                    options={[{name: 'Dowód Osobisty'}, {name: 'Paszport'}]}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="documentId"
                                    textName="Nr. dokumentu"
                                    type="text"
                                    value={consumer.documentId}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="address"
                                    textName="Adres"
                                    type="text"
                                    value={consumer.address}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="postCode"
                                    textName="Kod Pocztowy"
                                    type="text"
                                    value={consumer.postCode}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="city"
                                    textName="Miasto"
                                    type="text"
                                    value={consumer.city}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="mark"
                                    textName="Marka"
                                    type="text"
                                    value={car.mark}
                                    change={editCar}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="model"
                                    textName="Model"
                                    type="text"
                                    value={car.model}
                                    change={editCar}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="yearProduction"
                                    textName="Rok produkcji"
                                    type="text"
                                    value={car.yearProduction}
                                    change={editCar}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="vin"
                                    textName="Vin"
                                    type="text"
                                    value={car.vin}
                                    change={editCar}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="registration"
                                    textName="Nr. rejestracyjny"
                                    type="text"
                                    value={car.registration}
                                    change={editCar}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="mileage"
                                    textName="Przebieg"
                                    type="text"
                                    value={car.mileage}
                                    change={editCar}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="price"
                                    textName="Cena"
                                    type="text"
                                    value={consumer.price}
                                    change={editConsumer}
                                />
                            </div>
                            <div className={style.inputBox}>
                                <Input
                                    name="priceInWords"
                                    textName="Cena słownie"
                                    type="text"
                                    value={consumer.priceInWords}
                                    change={editConsumer}
                                />
                            </div>
                        </div>
                        <div className={style.btnBox}>
                            <Button
                                type="button"
                                textName="Potwierdz"
                                click={() => setPrinting(true)}
                            />
                        </div>
                    </form>
                </div>
            }
        </>
    );
};
