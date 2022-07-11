import React, {SetStateAction, useContext} from 'react';

import {config} from '../../../../../../config/config';
import {ChangeUserContext} from '../../../../../contexts/changeUserContext';
import {Button} from '../../../../../common/Button/Button';

import style from './DeleteUser.module.css';

interface Props {
    user: string;
    login: string;
    closePopup: React.Dispatch<SetStateAction<boolean>>;
}

export const DeleteUser = ({user, login, closePopup}: Props) => {

    const {setChangeUser} = useContext(ChangeUserContext);

    const handleDeleteUser = async () => {
        closePopup(false);
        const res = await fetch(`${config.URL}users/${login}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        });
        const data = await res.json();
        if (data) {
            setChangeUser(user);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.boxModal}>
                <h1>Czy na pewno chcesz usunąć użytkownika</h1>
                <h2>{user}</h2>
                <div className={style.boxBtn}>
                    <Button
                        type="button"
                        textName="tak"
                        click={handleDeleteUser}
                    />
                    <Button
                        type="button"
                        textName="Nie"
                        click={() => closePopup(false)}
                    />
                </div>
            </div>

        </div>
    );
};