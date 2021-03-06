import React, {SetStateAction, useContext, useEffect, useState} from 'react';

import {Consumer} from 'types';

import {config} from '../../../../config/config';
import {ChangeConsumerContext} from '../../../contexts/changeConsumerContext';
import {Input} from '../../../common/Input/Input';
import {Select} from '../../../common/Select/Select';
import {Button} from '../../../common/Button/Button';

import style from './AddEditBuySell.module.css';

interface Props {
    closePopup: React.Dispatch<SetStateAction<boolean>>;
    login: string;
    branchId: string;
    consumerEdit?: Consumer | undefined;
    click?: () => void;
}

export const AddEditBuySell = ({closePopup, login, branchId, consumerEdit, click}: Props) => {

    const {changeConsumerContext, setChangeConsumerContext} = useContext(ChangeConsumerContext);
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [consumer, setConsumer] = useState<Consumer>({
        name: '',
        phone: '',
        email: '',
        description: '',
        keeper: login,
        option: '',
        branch: branchId,
    });

    useEffect(() => {
        if (consumerEdit) {
            setConsumer(consumerEdit);
        }
    }, [consumerEdit, changeConsumerContext]);

    const editConsumer = (name: string, value: string | number) => {
        setConsumer(consumer => ({
            ...consumer,
            [name]: value,
        }));
    };

    const handleSetCorrectPhone = () => {
        const reg = /[0-9]{2,4}-[0-9]{2,4}-[0-9]{2,4}/;
        if (!reg.test(consumer.phone)) {
            setAlert(true);
            setAlertText('Niepoprawny nr. telefonu (np: 123-123-123, 12-123-1234 )');
        } else {
            setAlert(false);
        }
    };

    const handleSetCorrectEmail = () => {
        const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
        if (!reg.test(consumer.email) || consumer.email.length > 50) {
            setAlert(true);
            setAlertText('Niepoprawny E-mail lub nie powinie?? przekracza?? 50 znak??w');
        } else {
            setAlert(false);
        }
    };

    const validation = () => {
        if (consumer.name.length < 3 || consumer.name.length > 25) {
            setAlert(true);
            setAlertText('Nazwa nie powinna by?? krutrza niz 3 i d??????sza ni?? 25  ');
            return true;
        }
        if (consumer.phone === '' && consumer.email === '') {
            setAlert(true);
            setAlertText('Trzeba wype??ni?? pole telefon albo E-mail');
            return true;
        }
        if (consumer.option === '' || consumer.option === 'select') {
            setAlert(true);
            setAlertText('Wybierz Opcje');
            return true;
        }
        if (consumer.description === '' || consumer.description.length > 600) {
            setAlert(true);
            setAlertText('Opis nie mo??e by?? pusty i nie powinien przekracza?? 600 znak??w');
            return true;
        }
    };

    const handleAddItem = async () => {
        if (validation()) {
            return;
        }
        await fetch(`${config.URL}consumers`, {
            method: consumerEdit ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(consumer),
        });
        setChangeConsumerContext(`${new Date()}`);
        closePopup(false);
        if (consumerEdit && click) {
            click();
        }
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                <form className={style.boxForm}>
                    <div className={style.boxError}>
                        <p style={{color: alert ? '#ff0000' : 'transparent'}}>{alertText}</p>
                    </div>
                    <div className={style.boxInputs}>
                        <Input
                            name="name"
                            textName="Nazwa"
                            type="text"
                            value={consumer.name}
                            change={editConsumer}
                        />
                    </div>
                    <div className={style.boxInputs}>
                        <Input
                            name="phone"
                            textName="Telefon"
                            type="text"
                            value={consumer.phone}
                            change={editConsumer}
                            blur={handleSetCorrectPhone}
                        />
                    </div>
                    <div className={style.boxInputs}>
                        <Input
                            name="email"
                            textName="E-mail"
                            type="text"
                            value={consumer.email}
                            change={editConsumer}
                            blur={handleSetCorrectEmail}
                        />
                    </div>
                    <div className={style.boxInputs}>
                        <Select
                            name="option"
                            textName="Opcje"
                            options={[{name: 'BUY'}, {name: 'SELL'}]}
                            value={consumer.option}
                            change={editConsumer}
                        />
                    </div>
                    <div className={style.boxTextarea}>
                        <p>Opis:</p>
                        <textarea
                            rows={5}
                            cols={60}
                            onChange={(e) => editConsumer('description', e.target.value)}
                            value={consumer.description}
                        >
                        </textarea>
                    </div>
                </form>
                <div className={style.btnBox}>
                    <Button
                        type="button"
                        textName={consumerEdit ? 'Edytuj' : 'Dodaj'}
                        click={handleAddItem}
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