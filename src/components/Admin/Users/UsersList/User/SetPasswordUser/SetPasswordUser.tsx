import React, {SetStateAction, useContext, useState} from 'react';

import {ChangeUserContext} from '../../../../../contexts/changeUserContext';
import {config} from '../../../../../../config/config';
import {Button} from '../../../../../common/Button/Button';

import style from './SetPasswordUser.module.css';

interface Props {
    user: string;
    closePopup: React.Dispatch<SetStateAction<boolean>>;
}

export const SetPasswordUser = ({user, closePopup}: Props) => {

    const {setChangeUser} = useContext(ChangeUserContext);
    const [value, setValue] = useState('');

    const handleSetPassword = async () => {
        const res = await fetch(`${config.URL}users/setpassword`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                login: user,
                password: value,
            }),
        });
        const data = await res.json();
        setChangeUser(data);
        closePopup(false);
    };

    return (
        <div className={style.container}>
            <div className={style.boxModal}>
                <h2>Ustaw nowe hasło</h2>
                <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
                <div className={style.boxBtn}>
                    <Button
                        type="button"
                        textName="Zmień"
                        click={handleSetPassword}
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