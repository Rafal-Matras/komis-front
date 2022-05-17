import React, {useEffect, useState} from "react";

import style from './AdminUsers.module.css'
import {AdminUsersList} from "./AdminUsersList/AdminUsersList";
import {AdminAddUser} from "./AdminAddUser/AdminAddUser";


interface Props {
    branchName: string;
    role: string;
}

export const AdminUsers = ({branchName, role}: Props) => {

    const [addUser, setAddUser] = useState(true)

    useEffect(() => {

    }, [addUser])

    return (
        <div className={style.container}>
            {addUser
                ? <button
                    className={style.btnAdd}
                    onClick={() => setAddUser(false)}
                >Dodaj nowego pracownika</button>
                : <AdminAddUser
                    role={role}
                    setAddUser={setAddUser}
                />
            }
            <AdminUsersList
                role={role}
                branchName={branchName}
            />
        </div>
    );
};