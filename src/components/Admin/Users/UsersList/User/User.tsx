import React, {useState} from "react";
import {BsFillKeyFill, BsFillPencilFill, BsXLg} from "react-icons/bs";

import {List} from "types";
import {DeleteUser} from "./DeleteUser/DeleteUser";
import {SetPasswordUser} from "./SetPasswordUser/SetPasswordUser";
import {AddEditUser} from '../../AddEditUser/AddEditUser';

import style from './User.module.css';


interface Props {
    role: string;
    branch: string;
    data: List;
    id: number;
}

export const User = ({role, branch, data, id}: Props) => {
    const {name, lastName, email, login, branchName} = data;

    const [openSetPasswordUser, setOpenSetPasswordUser] = useState(false);
    const [openEditUser, setOpenEditUser] = useState(false);
    const [openPopupDeleteUser, setOpenPopupDeleteUs] = useState(false);


    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{login}</td>
                <td>{branchName}</td>
                <td className={style.tdAction}>
                    <BsFillKeyFill className={style.iconPass} onClick={() => setOpenSetPasswordUser(true)}/>
                    {login === 'admin' ? null :
                        <BsFillPencilFill className={style.iconEdit} onClick={() => setOpenEditUser(true)}/>}
                    {login === 'admin' ? null :
                        <BsXLg className={style.iconDelete} onClick={() => setOpenPopupDeleteUs(true)}/>}

                    {openSetPasswordUser && <SetPasswordUser
                        user={login}
                        closePopup={setOpenSetPasswordUser}
                    />}
                    {openEditUser && <AddEditUser
                        role={role}
                        branch={branch}
                        editUser={data}
                        closePopup={setOpenEditUser}
                    />}
                    {openPopupDeleteUser && <DeleteUser
                        user={`${name} ${lastName}`}
                        login={login}
                        closePopup={setOpenPopupDeleteUs}
                    />}
                </td>
            </tr>
        </>
    )
}