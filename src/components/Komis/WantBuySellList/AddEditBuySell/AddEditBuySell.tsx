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
    consumerEdit?: Consumer | undefined;
    click?: () => void;
}

export const AddEditBuySell = ({closePopup, login, consumerEdit, click}: Props) => {

    const {changeConsumerContext, setChangeConsumerContext} = useContext(ChangeConsumerContext);
    const [fillIn, setFillIn] = useState(false);
    const [textError, setTextError] = useState('');
    const [consumer, setConsumer] = useState<Consumer>({
        name: '',
        phone: '',
        email: '',
        description: '',
        keeper: login,
        option: '',
    });

    useEffect(() => {
        if (consumerEdit) {
            setConsumer(consumerEdit);
        }
    }, [changeConsumerContext]);

    const editConsumer = (name: string, value: string | number) => {
        setConsumer(consumer => ({
            ...consumer,
            [name]: value,
        }));
    };

    const validation = () => {
        if (consumer.name === '' || consumer.name.length < 3) {
            setFillIn(true);
            setTextError('Wartość Nazwa nie może być pusta oraz powinna posiadać co najmniej 3 znaki');
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
                        <p style={{color: fillIn ? '#ff0000' : 'transparent'}}>{textError}</p>
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
                        />
                    </div>
                    <div className={style.boxInputs}>
                        <Input
                            name="email"
                            textName="E-mail"
                            type="text"
                            value={consumer.email}
                            change={editConsumer}
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