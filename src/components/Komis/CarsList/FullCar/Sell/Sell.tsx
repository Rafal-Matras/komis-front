import React, {SetStateAction, useState} from 'react';

import {Car, ConsumerArrangement} from 'types';

import {DocumentToPrint} from './Document/DocumentToPrint';
import {Select} from '../../../../common/Select/Select';
import {Input} from '../../../../common/Input/Input';
import {Button} from '../../../../common/Button/Button';

import style from './Sell.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    fullCar: Car;
}

export const Sell = ({closePopup, fullCar}: Props) => {

    const [printing, setPrinting] = useState(false)
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
    })

    const editConsumer = (name: string, value: string) => {
        setConsumer(consumer => ({
            ...consumer,
            [name]: value,
        }));
    };

    const handleGenerateArrangement = () => {
        setPrinting(true);
    }

    return (
        <>
            {printing
                ? <DocumentToPrint
                    fullCar={fullCar}
                    consumer={consumer}
                    setPrinting={setPrinting}
                    closePopup={closePopup}
                />
                : <div className={style.container}>
                    <div className={style.box}>
                        <form className={style.formContainer} onSubmit={handleGenerateArrangement}>
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
                                    textName="Potwierdz"
                                    type="button"
                                    click={() => setPrinting(true)}
                                />
                                <Button
                                    textName="Anuluj"
                                    type="reset"
                                    click={() => closePopup(false)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};
