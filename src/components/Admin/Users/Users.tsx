import React, {useState} from 'react';

import {ChangeUserContext} from '../../contexts/changeUserContext';
import {UsersList} from './UsersList/UsersList';
import {AddEditUser} from './AddEditUser/AddEditUser';
import {Button} from '../../common/Button/Button';

import style from './Users.module.css';

interface Props {
    branch: string;
    role: string;
}

export const Users = ({branch, role}: Props) => {

    const [changeUser, setChangeUser] = useState('');
    const [openAddUser, setOpenAddUser] = useState(false);

    return (
        <ChangeUserContext.Provider value={{changeUser, setChangeUser}}>
            <div className={style.container}>
                <Button
                    type="button"
                    textName="Dodaj nowego użytkownika"
                    click={() => setOpenAddUser(true)}
                />
                {openAddUser && <AddEditUser
                    closePopup={setOpenAddUser}
                    role={role}
                    branch={branch}
                />}
                <UsersList
                    role={role}
                    branch={branch}
                />
            </div>
        </ChangeUserContext.Provider>
    );
};