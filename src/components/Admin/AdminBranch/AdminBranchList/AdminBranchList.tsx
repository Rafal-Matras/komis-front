import React from "react";

import {AdminBranchItem} from "./AdminBranchItem/AdminBranchItem";
import {branches} from "../../../../data/Data";

import style from './AdminBranchList.module.css';

export const AdminBranchList = () => {

    const branch = branches.map((el, index) => (
        <AdminBranchItem key={el.id} data={el} id={index + 1}/>
    ))

    return (
        <table className={style.table}>
            <thead>
            <tr>
                <th>Id</th>
                <th>Nazwa</th>
                <th>Miasto</th>
                <th>Kod pocztowy</th>
                <th>Adres</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>{branch}</tbody>

        </table>
    )
}