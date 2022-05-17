import React, {useEffect, useState} from "react";
import {UserShow} from "types";

import {AdminUser} from "./AdminUser/AdminUser";

import style from './AdminUserList.module.css';
import {Spinner} from "../../../../common/Spinner/Spinner";

interface Props {
    role: string;
    branchName: string;
}

interface List extends UserShow {
    branchName: string;
}

export const AdminUsersList = ({role, branchName}: Props) => {

    const [dataTable, setDataTable] = useState<List[]>([])

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3001/users/list`);
            const resData = await response.json();
            if (role === 'ADMIN') {
                setDataTable(resData)
            } else {
                setDataTable(resData.filter((el: { branchName: string; }) => el.branchName === branchName))
            }
        })();
    }, [branchName, role])


    const usersList = dataTable.map((el, index) => (
        <AdminUser
            key={el.login}
            data={el}
            branchName={el.branchName}
            id={index + 1}
        />
    ))

    return (
        <>
            {
                dataTable === []
                    ? <Spinner/>
                    : <table className={style.table}>
                        <thead>
                        <tr>
                            <th className={style.tableId}>Id</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th>Login</th>
                            <th>Oddział</th>
                            <th>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>{usersList}</tbody>
                    </table>
            }
        </>
    )
}