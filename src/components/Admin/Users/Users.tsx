import React, {useState} from "react";

import style from './Users.module.css'
import {UsersList} from "./UsersList/UsersList";
import {AddEditUser} from "./AddEditUser/AddEditUser";
import {ChangeUserContext} from "../../contexts/changeUserContext";

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
                <button
                    className='btnPrimaryBig'
                    onClick={() => setOpenAddUser(true)}
                >Dodaj nowego użytkownika
                </button>
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