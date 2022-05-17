import React from "react";
import {BsFillKeyFill, BsFillPencilFill, BsXLg} from "react-icons/bs";
import {UserShow} from "types";

import style from '../AdminUserList.module.css';

interface Props {
    data: UserShow;
    id: number;
    branchName: string;
}

export const AdminUser = ({data, id, branchName}: Props) => {
    const {name, lastName, email, login} = data;

    const handleSetPasswordUser = () => {

    }

    const handleEditUser = () => {

    }

    const handleDeleteUser = () => {

    }

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{login}</td>
            <td>{branchName}</td>
            <td className={style.tdAction}>
                <BsFillKeyFill className={style.iconPass} onClick={handleSetPasswordUser}/>
                <BsFillPencilFill className={style.iconEdit} onClick={handleEditUser}/>
                <BsXLg className={style.iconDelete} onClick={handleDeleteUser}/>
            </td>
        </tr>

    )
}