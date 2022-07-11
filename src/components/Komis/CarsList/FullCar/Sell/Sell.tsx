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

    const [printing, setPrinting] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
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

    const editConsumer = (name: string, value: string | number) => {
        setConsumer(consumer => ({
            ...consumer,
            [name]: value,
        }));
    };

    const validation = () => {
        if (consumer.name === '' || consumer.pesel === '' || consumer.address === '' || consumer.postCode === '' || consumer.city === '' || consumer.price === '' || consumer.priceInWords === '') {
            setAlert(true);
            setAlertText('Uzupełnij wszystkie pola');
            return true;
        }
    };

    const handlePrintDocument = () => {
        if (validation()) {
            return;
        }
        setPrinting(true);
    };

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
                        <form className={style.formContainer} onSubmit={handlePrintDocument}>
                            <div className={style.boxAlert}>
                                <p style={{color: alert ? '#ff0000' : 'transparent'}}>{alertText}</p>
                            </div>
                            <div className={style.formBox}>
                                <div className={style.boxItem}>
                                    <Input
                                        name="name"
                                        textName="Imię i Nazwisko"
                                        type="text"
                                        value={consumer.name}
                                        change={editConsumer}
                                    />
                                </div>
                                <div className={style.boxItem}>
                                    <Input
                                        name="pesel"
                                        textName="Pesel"
                                        type="text"
                                        value={consumer.pesel}
                                        change={editConsumer}
                                    />
                                </div>
                                <div className={style.boxItem}>
                                    <Input
                                        name="nip"
                                        textName="Nip"
                                        type="text"
                                        value={consumer.nip}
                                        change={editConsumer}
                                    />
                                </div>
                                <div className={style.boxItem}>
                                    <Select
                                        name="document"
                                        textName="Dokument"
                                        value={consumer.document}
                                        change={editConsumer}
                                        options={[{name: 'Dowód Osobisty'}, {name: 'Paszport'}]}
                                    />
                                </div>
                                <div className={style.boxItem}>
                                    <Input
                                        name="documentId"
                                        textName="Nr. dokumentu"
                                        type="text"
                                        value={consumer.documentId}
                                        change={editConsumer}
                                    />
                                </div>
                                <div className={style.boxItem}>
                                    <Input
                                        name="address"
                                        textName="Adres"
                                        type="text"
                                        value={consumer.address}
                                        change={editConsumer}
                                    />
                                </div>
                                <div className={style.boxItem}>
                                    <Input
                                        name="postCode"
                                        textName="Kod Pocztowy"
                                        type="text"
                                        value={consumer.postCode}
                                        change={editConsumer}
                                    />
                                </div>
                                <div className={style.boxItem}>
                                    <Input
                                        name="city"
                                        textName="Miasto"
                                        type="text"
                                        value={consumer.city}
                                        change={editConsumer}
                                    />
                                </div>
                                <div className={style.boxItem}>
                                    <Input
                                        name="price"
                                        textName="Cena"
                                        type="text"
                                        value={consumer.price}
                                        change={editConsumer}
                                    />
                                </div>
                                <div className={style.boxItem}>
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
                                    click={handlePrintDocument}
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
