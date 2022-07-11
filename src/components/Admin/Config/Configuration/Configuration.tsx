import React, {SetStateAction, useEffect, useState} from 'react';

import {Company} from 'types';

import {config} from '../../../../config/config';
import {Button} from '../../../common/Button/Button';
import {Input} from '../../../common/Input/Input';

import style from './Configuration.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
}

export const Configuration = ({closePopup}: Props) => {

    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState('Text');
    const [companyData, setCompanyData] = useState<Company>({
        name: '',
        nip: '',
        regon: '',
        phone: '',
        address: '',
        postCode: '',
        city: '',
    });

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.URL}company`);
            const data = await res.json();
            setCompanyData(data);
        })();
    }, []);

    const updateForm = (key: string, value: string | number) => {
        setCompanyData(companyData => ({
            ...companyData,
            [key]: value,
        }));
    };

    const validation = () => {
        if (companyData.name === '' || companyData.nip === '' || companyData.regon === '' || companyData.phone === '' || companyData.address === '' || companyData.postCode === '' || companyData.city === '') {
            setAlertText('wypełnij wszystkie pola');
            setAlert(true);
            return true;
        }
    };

    const handleChangeCompanyData = async () => {
        if (validation()) {
            return;
        }
        await fetch(`${config.URL}company`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(companyData),
        });
        closePopup(false);
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                <h2>Zmień Dane Firmy</h2>
                <p
                    className={style.pError}
                    style={{color: alert ? '#fd5151' : 'transparent'}}
                >{alertText}
                </p>
                <div className={style.boxForm}>
                    <div className={style.boxInputName}>
                        <Input
                            type="text"
                            name="name"
                            textName="Nazwa firmy"
                            value={companyData.name}
                            change={updateForm}
                        />
                    </div>
                    <div className={style.boxInput}>
                        <Input
                            type="text"
                            name="nip"
                            textName="Nip"
                            value={companyData.nip}
                            change={updateForm}
                        />
                    </div>
                    <div className={style.boxInput}>
                        <Input
                            type="text"
                            name="regon"
                            textName="Regon"
                            value={companyData.regon}
                            change={updateForm}
                        />
                    </div>
                    <div className={style.boxInput}>
                        <Input
                            type="text"
                            name="phone"
                            textName="Telefon"
                            value={companyData.phone}
                            change={updateForm}
                        />
                    </div>
                    <div className={style.boxInput}>
                        <Input
                            type="text"
                            name="address"
                            textName="Adres"
                            value={companyData.address}
                            change={updateForm}
                        />
                    </div>
                    <div className={style.boxInput}>
                        <Input
                            type="text"
                            name="postCode"
                            textName="Kod pocztowy"
                            value={companyData.postCode}
                            change={updateForm}
                        />
                    </div>
                    <div className={style.boxInput}>
                        <Input
                            type="text"
                            name="city"
                            textName="Miasto"
                            value={companyData.city}
                            change={updateForm}
                        />
                    </div>
                </div>
                <div className={style.boxBtn}>
                    <Button
                        type="button"
                        textName="Zmień"
                        click={handleChangeCompanyData}
                    />
                    <Button
                        type="button"
                        textName="Anuluj"
                        click={() => closePopup(false)}
                    />
                </div>
            </div>
        </div>
    );
};