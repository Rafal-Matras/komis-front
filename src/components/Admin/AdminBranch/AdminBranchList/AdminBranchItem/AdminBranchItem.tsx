import React from "react";
import {Branch} from "types";

import {BsFillPencilFill, BsXLg} from "react-icons/bs";

import style from '../AdminBranchList.module.css';


interface Props {
    data: Branch;
    id: number;
}

export const AdminBranchItem = (props: Props) => {
    const {name, city, postCode, address} = props.data;


    return (
        <tr>
            <td>{props.id}</td>
            <td>{name}</td>
            <td>{city}</td>
            <td>{postCode}</td>
            <td>{address}</td>
            <td className={style.tdAction}>
                <BsFillPencilFill className={style.icon}/>
                <BsXLg className={style.iconDelete}/>
            </td>
        </tr>
    )
}