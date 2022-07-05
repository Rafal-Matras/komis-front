import React, {useContext, useState} from 'react';

import {Consumer} from 'types';

import {Button} from '../../../common/Button/Button';

import style from './FullConsumer.module.css';
import {config} from '../../../../config/config';
import {ChangeConsumerContext} from '../../../contexts/changeConsumerContext';
import {AddEditBuySell} from '../AddEditBuySell/AddEditBuySell';

interface Props {
    consumer: Consumer;
    click: () => void;
    login: string;
    branchId: string;
}

export const FullConsumer = ({consumer, click, login, branchId}: Props) => {

    const {setChangeConsumerContext} = useContext(ChangeConsumerContext);
    const [openAddEdit, setOpenAddEdit] = useState(false);

    const handleDeleteConsumer = async () => {
        const res = await fetch(`${config.URL}consumers/${consumer.id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        setChangeConsumerContext(data);
        click();
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.boxConsumer}>
                    <div className={style.textCarInfoBox}><p>Imię Nazwisko / Nazwa:</p><span>{consumer.name}</span>
                    </div>
                    <div className={style.textCarInfoBox}><p>Telefon:</p> <span>{consumer.phone}</span></div>
                    <div className={style.textCarInfoBox}><p>E-mail:</p> <span>{consumer.email}</span></div>
                    <h2>Opis:</h2>
                    <p>{consumer.description}</p>
                </div>
                <div className={style.boxBtn}>
                    <Button
                        textName="Popraw"
                        type="button"
                        click={() => setOpenAddEdit(true)}
                    />
                    <Button
                        textName="Usuń"
                        type="button"
                        click={handleDeleteConsumer}
                    />
                    <Button
                        textName="Powrót"
                        type="button"
                        click={click}
                    />
                    {openAddEdit && <AddEditBuySell
                        closePopup={setOpenAddEdit}
                        login={login}
                        branchId={branchId}
                        consumerEdit={consumer}
                        click={click}
                    />}
                </div>
            </div>

        </div>
    );
};