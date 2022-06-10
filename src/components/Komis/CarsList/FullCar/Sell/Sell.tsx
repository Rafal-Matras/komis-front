import React, {SetStateAction, useState} from "react";
import {Car, ConsumerArrangement} from "types";
import {DocumentToPrint} from "./Document/DocumentToPrint";

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
                                <label htmlFor="name">Imię i Nazwisko:
                                    <input
                                        id='name'
                                        type="text"
                                        value={consumer.name}
                                        onChange={e => editConsumer('name', e.target.value)}
                                    />
                                </label>
                                <label htmlFor="pesel">Pesel:
                                    <input
                                        id='pesel'
                                        type="text"
                                        value={consumer.pesel}
                                        onChange={e => editConsumer('pesel', e.target.value)}
                                    />
                                </label>
                                <label htmlFor="nip">Nip:
                                    <input
                                        id='nip'
                                        type="text"
                                        value={consumer.nip}
                                        onChange={e => editConsumer('nip', e.target.value)}
                                    />
                                </label>
                                <label htmlFor="document">Dokument:
                                    <select
                                        id='document'
                                        value={consumer.document}
                                        onChange={e => editConsumer('document', e.target.value)}
                                    >
                                        <option value="">Wybierz</option>
                                        <option value="Dowód Osobisty">Dowód osobisty</option>
                                        <option value="Paszport">Paszport</option>
                                    </select>
                                </label>
                                <label htmlFor="documentId">nr. dokumentu:
                                    <input
                                        id='documentId'
                                        type="text"
                                        value={consumer.documentId}
                                        onChange={e => editConsumer('documentId', e.target.value)}
                                    />
                                </label>
                                <label htmlFor="address">Adres:
                                    <input
                                        id='address'
                                        type="text"
                                        value={consumer.address}
                                        onChange={e => editConsumer('address', e.target.value)}
                                    />
                                </label>
                                <label htmlFor="postCode">Kod pocztowy:
                                    <input
                                        id='postCode'
                                        type="text"
                                        value={consumer.postCode}
                                        onChange={e => editConsumer('postCode', e.target.value)}
                                    />
                                </label>
                                <label htmlFor="city">Miasto:
                                    <input
                                        id='city'
                                        type="text"
                                        value={consumer.city}
                                        onChange={e => editConsumer('city', e.target.value)}
                                    />
                                </label>
                                <label htmlFor="price">Cena::
                                    <input
                                        id='price'
                                        type="text"
                                        value={consumer.price}
                                        onChange={e => editConsumer('price', e.target.value)}
                                    />
                                </label>
                                <label htmlFor="priceInWords">Cena słownie:
                                    <input
                                        id='priceInWords'
                                        type="text"
                                        value={consumer.priceInWords}
                                        onChange={e => editConsumer('priceInWords', e.target.value)}
                                    />
                                </label>

                            </div>
                            <div className={style.btnBox}>
                                <button
                                    className='btnPrimarySmall'
                                    onClick={() => setPrinting(true)}
                                >Potwierdz
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
            }
        </>
    );
};
