import React, {useContext, useEffect, useState} from "react";
import {List} from "types";

import {User} from "./User/User";
import {Spinner} from "../../../common/Spinner/Spinner";
import {ChangeUserContext} from "../../../contexts/changeUserContext";
import {config} from "../../../../config/config";

import style from './UserList.module.css';

interface Props {
    role: string;
    branch: string;
}

export const UsersList = ({role, branch}: Props) => {
    const {changeUser} = useContext(ChangeUserContext)
    const [dataTable, setDataTable] = useState<List[] | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${config.URL}users`);
            const resData = await response.json();
            if (role === 'ADMIN') {
                setDataTable(resData)
            } else {
                setDataTable(resData.filter((el: { branchName: string; }) => el.branchName === branch))
            }
        })();
    }, [branch, role, changeUser]);


    const usersList = dataTable?.map((el, index) => (
        <User
            key={el.login}
            data={el}
            id={index + 1}
            role={role}
            branch={branch}
        />
    ))

    return (
        <>
            {
                dataTable === null
                    ? <Spinner/>
                    : <table className={style.table}>
                        <thead>
                        <tr>
                            <th>Id</th>
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